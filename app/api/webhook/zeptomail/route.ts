import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // DEBUG: This will show us exactly what ZeptoMail is sending
    console.log("📥 [WEBHOOK RAW DATA]:", JSON.stringify(body).substring(0, 500));

    // Support both array-based and object-based payloads from ZeptoMail
    const eventName = body.event_name?.[0] || body.event;
    const eventMessage = body.event_message?.[0] || body;

    const eventType = eventName || eventMessage?.event;
    
    // Robust email extraction
    const toArray = eventMessage?.email_info?.to || [];
    const recipientEmail = eventMessage?.recipient || eventMessage?.email_address || toArray[0]?.email_address?.address;

    if (!recipientEmail || recipientEmail === "undefined") {
      console.log("⚠️ [WEBHOOK] No valid recipient email found. Skipping update.");
      return NextResponse.json({ success: true });
    }

    if (eventType === 'email_open' || eventType === 'email_link_click' || eventType === 'open' || eventType === 'click') {
      await prisma.lead.updateMany({
        where: { email: recipientEmail },
        data: { emailsOpened: { increment: 1 } }
      });
      console.log(`✅ [ANALYTICS] Success: ${eventType} recorded for ${recipientEmail}`);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("❌ [WEBHOOK CRITICAL ERROR]:", error.message);
    return NextResponse.json({ success: true }); // Always return 200
  }
}
