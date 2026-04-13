import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Extract the event type from the ZeptoMail array
    const eventType = body.event_name?.[0]; // e.g., "email_open", "email_link_click", "email_delivered"

    if (!eventType) {
      console.log("[WEBHOOK WARNING] No event_name found in payload.");
      return NextResponse.json({ success: true });
    }

    // 2. Extract the recipients array from the deeply nested payload
    const toArray = body.event_message?.[0]?.email_info?.to || [];
    
    // Map through the array to get the actual email strings
    const recipientEmails = toArray.map((recipient: any) => recipient.email_address?.address);

    if (recipientEmails.length === 0) {
      console.log("[WEBHOOK WARNING] Ignored payload: No recipient email found.");
      return NextResponse.json({ success: true });
    }

    // 3. Process the tracking for each recipient
    for (const email of recipientEmails) {
      
      // Track Opens AND Clicks (If they click a link, it counts as an open)
      if (eventType === 'email_open' || eventType === 'email_link_click') {
        // We use updateMany so it doesn't crash if ZeptoMail sends a fake test email
        await prisma.lead.updateMany({
          where: { email: email },
          data: { emailsOpened: { increment: 1 } }
        });
        console.log(`📊 [ANALYTICS] Email ${eventType.toUpperCase()} by: ${email}`);
      }

      // Track Deliveries
      if (eventType === 'email_delivered' || eventType === 'delivered') {
        await prisma.lead.updateMany({
          where: { email: email },
          data: { emailsSent: { increment: 1 } }
        });
        console.log(`📊 [ANALYTICS] Email DELIVERED to: ${email}`);
      }
    }

    // Always return 200 OK so ZeptoMail knows we received it
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ [WEBHOOK ERROR]:", error);
    // Return 200 even on error so ZeptoMail doesn't spam us with retries
    return NextResponse.json({ success: true }); 
  }
}
