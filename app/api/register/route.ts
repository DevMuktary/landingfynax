import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { firstName, email } = await req.json();
    console.log(`[START] Registration initiated for: ${email}`);

    // 1. Save to PostgreSQL
    const lead = await prisma.lead.upsert({
      where: { email },
      update: { firstName },
      create: { firstName, email },
    });
    console.log(`[SUCCESS] Saved to database: ${lead.email}`);

    // 2. Setup Variables
    // CHANGE THIS URL IF YOUR DASHBOARD SAYS .eu OR .in
    const zeptoMailUrl = process.env.ZEPTOMAIL_URL || "https://api.zeptomail.com/v1.1/email"; 
    const zeptoMailToken = process.env.ZEPTOMAIL_TOKEN;
    const senderEmail = "hello@fynaxbookkeeper.com"; // MUST BE VERIFIED IN ZOHO

    if (!zeptoMailToken) {
      console.error("[ERROR] ZEPTOMAIL_TOKEN is missing!");
      return NextResponse.json({ success: true, lead });
    }

    // Ensure token has the required prefix
    const formattedToken = zeptoMailToken.startsWith("Zoho-enczapikey") 
      ? zeptoMailToken 
      : `Zoho-enczapikey ${zeptoMailToken}`;

    // --- AGGRESSIVE DEBUG LOGS ---
    console.log(`[DEBUG] Sending to URL: ${zeptoMailUrl}`);
    console.log(`[DEBUG] Token starts with: ${formattedToken.substring(0, 25)}...`);
    console.log(`[DEBUG] Sender Email: ${senderEmail}`);

    const zeptoRes = await fetch(zeptoMailUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": formattedToken
      },
      body: JSON.stringify({
        from: { address: senderEmail, name: "Ridwanullah | Fynax Bookkeeper" },
        to: [{ email_address: { address: email, name: firstName } }],
        subject: "Here's your free record-keeping training 🎓",
        htmlbody: `
          <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
            <p>Hi ${firstName},</p>
            <p>Welcome! You just made a great decision for your business.</p>
            <p>👇 Click below to watch your free training now:</p>
            <p><a href="https://yourdomain.com/success">Watch the Free Training →</a></p>
          </div>
        `
      })
    });

    const zeptoResponseText = await zeptoRes.text();
    
    if (!zeptoRes.ok) {
      console.error(`[ZEPTOMAIL FAILED] Status: ${zeptoRes.status}`);
      console.error(`[ZEPTOMAIL RESPONSE ERROR]: ${zeptoResponseText}`);
    } else {
      console.log(`[ZEPTOMAIL SUCCESS] Email sent to ${email}`);
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("[CRITICAL ERROR]:", error);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
