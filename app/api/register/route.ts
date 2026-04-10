import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { SendMailClient } from "zeptomail";

const prisma = new PrismaClient();

// Configuration
const SENDER_EMAIL = "noreply@fynaxtech.com"; 
const SENDER_NAME = "Ridwanullah | Fynax Bookkeeper";
const YOUTUBE_LINK = "https://youtu.be/krVjVaNmAEY?si=Bi8I9DXanFkYVkdD";

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
      return NextResponse.json({ success: true, lead }); // Still let user through to success page
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
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Your Free Training is Ready</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F0F4FA; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F0F4FA; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); max-width: 600px; width: 100%; margin: 0 auto;">
          
          <tr>
            <td style="background-color: #042C53; padding: 35px 40px; text-align: center;">
              <span style="color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Fynax Bookkeeper</span>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #0f172a; font-weight: 600; letter-spacing: -0.5px;">Your Free Masterclass is Ready</h1>
              
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #475569; line-height: 1.6;">Hi <strong>${firstName}</strong>,</p>
              
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #475569; line-height: 1.6;">Welcome! You just made a brilliant decision for your business. A lot of Nigerian business owners work incredibly hard every day, but still can't tell you exactly how much they made, what they spent, or whether their business is actually growing.</p>
              
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #475569; line-height: 1.6;">This 30-minute training was created to change that forever.</p>
              
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding: 10px 0 35px 0;">
                    <a href="${YOUTUBE_LINK}" style="background-color: #185FA5; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 36px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 6px rgba(24, 95, 165, 0.2);">Watch the Masterclass Now &rarr;</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #475569; line-height: 1.6;">In this training, you will discover the 6 essential records every business needs, the silent profit killers draining your accounts, and the simple 15-minute daily routine to fix it.</p>
              
              <p style="margin: 0 0 0 0; font-size: 16px; color: #475569; line-height: 1.6;">To your business growth,<br><strong style="color: #0f172a; display: block; margin-top: 5px;">Ridwanullah</strong><span style="font-size: 14px; color: #64748b;">Fynax Bookkeeper</span></p>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #F8FAFC; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; font-size: 13px; color: #64748b; font-weight: 500;">© ${new Date().getFullYear()} Fynax Bookkeeper. All rights reserved.</p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">You are receiving this because you registered for our free masterclass.<br>If you no longer wish to receive these emails, you can <a href="#" style="color: #185FA5; text-decoration: underline;">unsubscribe here</a>.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    console.log("✅ [SUCCESS] Email Sent Successfully:", response.message);
    return NextResponse.json({ success: true, lead });

  } catch (error: any) {
    console.error("❌ [CRITICAL ERROR] ZeptoMail failed to send:");
    console.error(JSON.stringify(error, null, 2));
    
    // We return success so the user still goes to the video page
    // Scope error fixed: removed 'lead' from this return
    return NextResponse.json({ success: true });
  }
}
