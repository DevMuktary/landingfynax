import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ZeptoMail webhook payloads can sometimes vary slightly based on settings.
    // This robustly extracts the event type and the email address.
    const eventType = body.event || body[0]?.event;
    
    // Extract the email address (ZeptoMail uses different keys depending on the event type)
    const recipientEmail = 
      body.recipient || 
      body.email_address || 
      body.send_to || 
      body.data?.send_to || 
      body[0]?.recipient || 
      body[0]?.email_address;

    if (!recipientEmail) {
      console.log("[WEBHOOK WARNING] Ignored payload: No recipient email found.");
      return NextResponse.json({ success: true }); // Return 200 so ZeptoMail doesn't retry
    }

    // 1. Track Email Opens
    if (eventType === 'open' || eventType === 'email_opened') {
      await prisma.lead.update({
        where: { email: recipientEmail },
        data: { emailsOpened: { increment: 1 } }
      });
      console.log(`📊 [ANALYTICS] Email OPENED by: ${recipientEmail}`);
    }

    // 2. Track Email Deliveries
    if (eventType === 'delivered' || eventType === 'email_delivered') {
      await prisma.lead.update({
        where: { email: recipientEmail },
        data: { emailsSent: { increment: 1 } }
      });
      console.log(`📊 [ANALYTICS] Email DELIVERED to: ${recipientEmail}`);
    }

    // Always return a fast 200 OK so ZeptoMail knows we received it
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ [WEBHOOK ERROR]:", error);
    // Even on error, return 200 so ZeptoMail doesn't spam the server with retries
    return NextResponse.json({ success: true }); 
  }
}
