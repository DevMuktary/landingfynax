import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { SendMailClient } from "zeptomail";

const prisma = new PrismaClient();

// IMPORTANT: This MUST match the domain you verified in ZeptoMail!
const SENDER_EMAIL = "hello@fynaxtech.com"; 
const SENDER_NAME = "Ridwanullah | Fynax Bookkeeper";

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

    // 2. Setup ZeptoMail URL
    let url = process.env.ZEPTOMAIL_URL || "https://api.zeptomail.com/v1.1/email";
    if (url.endsWith('/send')) url = url.replace('/send', '');
    if (!url.startsWith('http')) url = `https://${url}`;

    // 3. Setup ZeptoMail Token
    let token = process.env.ZEPTOMAIL_TOKEN || "";
    if (!token) {
      console.error("❌ [ERROR] ZEPTOMAIL_TOKEN is missing from environment variables!");
      return NextResponse.json({ success: true, lead }); // Still let user through
    }
    if (!token.startsWith("Zoho-enczapikey")) {
      token = `Zoho-enczapikey ${token}`;
    }

    // 4. Initialize Client
    const client = new SendMailClient({ url, token });
    console.log(`🚀 Sending ZeptoMail to: ${email}`);

    // 5. Send Email
    const response = await client.sendMail({
      from: {
        address: SENDER_EMAIL,
        name: SENDER_NAME,
      },
      to: [
        {
          email_address: {
            address: email,
            name: firstName,
          },
        },
      ],
      subject: "Here's your free record-keeping training 🎓",
      htmlbody: `
        <div style="font-family: sans-serif; color: #333; line-height: 1.6; max-w: 600px; margin: 0 auto;">
          <p>Hi ${firstName},</p>
          <p>Welcome! You just made a great decision for your business.</p>
          <p>A lot of Nigerian business owners work hard every day but still can't tell you exactly how much they made, what they spent, or whether their business is actually growing. This training was made to change that.</p>
          <p>👇 Click below to watch your free training now:</p>
          <p><a href="https://youtu.be/krVjVaNmAEY?si=l5VHFDTFS9FAvsJ5" style="background-color: #185FA5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin: 10px 0;">Watch the Free Training →</a></p>
          <p>To your business growth,<br><strong>Ridwanullah</strong><br>Fynax Bookkeeper</p>
        </div>
      `,
    });

    console.log("✅ [SUCCESS] Email Sent Successfully:", response.message);
    return NextResponse.json({ success: true, lead });

  } catch (error: any) {
    console.error("❌ [CRITICAL ERROR] ZeptoMail failed to send:");
    console.error(JSON.stringify(error, null, 2));
    
    // We return success so the user still gets redirected to the video, 
    // even if the email system hiccups.
    return NextResponse.json({ success: true, lead });
  }
}
