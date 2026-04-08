import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { firstName, email } = await req.json();

    // 1. Save to PostgreSQL
    const lead = await prisma.lead.upsert({
      where: { email },
      update: { firstName },
      create: { firstName, email },
    });

    // 2. Send Immediate Email 1 via ZeptoMail
    const zeptoMailUrl = "https://api.zeptomail.com/v1.1/email";
    const zeptoMailToken = process.env.ZEPTOMAIL_TOKEN; // Add to Railway Variables

    await fetch(zeptoMailUrl, {
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
            <p><a href="https://yourdomain.com/success" style="background-color: #2563EB; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Watch the Free Training →</a></p>
            <p>To your business growth,<br>Ridwanullah<br>Fynax Bookkeeper</p>
          </div>
        `
      })
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
  }
}
