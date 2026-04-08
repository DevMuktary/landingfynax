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

    // 2. Send Immediate Email 1 via ZeptoMail
    const zeptoMailUrl = "https://api.zeptomail.com/v1.1/email";
    const zeptoMailToken = process.env.ZEPTOMAIL_TOKEN; 

    if (!zeptoMailToken) {
      console.error("[ERROR] ZEPTOMAIL_TOKEN is completely missing from Railway environment variables!");
      // We still return success so the user goes to the success page, but we log the error.
      return NextResponse.json({ success: true, lead });
    }

    console.log("[INFO] Attempting to send welcome email via ZeptoMail...");
    
    const zeptoRes = await fetch(zeptoMailUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Zoho-enczapikey ${zeptoMailToken}`
      },
      body: JSON.stringify({
        from: { address: "hello@fynaxbookkeeper.com", name: "Ridwanullah | Fynax Bookkeeper" },
        to: [{ email_address: { address: email, name: firstName } }],
        subject: "Here's your free record-keeping training 🎓",
        htmlbody: `
          <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
            <p>Hi ${firstName},</p>
            <p>Welcome! You just made a great decision for your business.</p>
            <p>A lot of Nigerian business owners work hard every day but still can't tell you exactly how much they made, what they spent, or whether their business is actually growing. This training was made to change that.</p>
            <p>👇 Click below to watch your free training now:</p>
            <p><a href="https://www.youtube.com/watch?v=krVjVaNmAEY" style="background-color: #2563EB; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Watch the Free Training →</a></p>
            <p>To your business growth,<br>Ridwanullah<br>Fynax Bookkeeper</p>
          </div>
        `
      })
    });

    // Capture exactly what ZeptoMail tells us
    const zeptoResponseText = await zeptoRes.text();
    
    if (!zeptoRes.ok) {
      console.error(`[ZEPTOMAIL FAILED] Status: ${zeptoRes.status}`);
      console.error(`[ZEPTOMAIL RESPONSE ERROR]: ${zeptoResponseText}`);
    } else {
      console.log(`[ZEPTOMAIL SUCCESS] Email sent to ${email}`);
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("[CRITICAL ERROR] during registration process:", error);
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
  }
}
