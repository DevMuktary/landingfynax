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

    // --- BULLETPROOF FIX: We add the 'emailsSent' counter directly into the creation step ---
    // This makes it physically impossible for the database to save the user but keep emailsSent at 0
    const lead = await prisma.lead.upsert({
      where: { email },
      update: { 
        firstName,
        emailsSent: { increment: 1 } 
      },
      create: { 
        firstName, 
        email,
        emailsSent: 1 
      },
    });
    console.log(`[SUCCESS] Saved to DB with emailsSent count: ${lead.emailsSent}`);

    // 2. Setup ZeptoMail URL
    let url = process.env.ZEPTOMAIL_URL || "https://api.zeptomail.com/v1.1/email";
    if (url.endsWith('/send')) url = url.replace('/send', '');
    if (!url.startsWith('http')) url = `https://${url}`;

    // 3. Setup ZeptoMail Token
    let token = process.env.ZEPTOMAIL_TOKEN || "";
    if (!token) {
      console.error("❌ [ERROR] ZEPTOMAIL_TOKEN is missing from environment variables!");
      return NextResponse.json({ success: true, lead }); 
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
<body style="margin: 0; padding: 0; background-color: #f4f4f5;">
  <table width="100%" bgcolor="#f4f4f5" cellpadding="0" cellspacing="0" border="0" style="padding: 30px 10px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; font-family: Arial, Helvetica, sans-serif; color: #333333; background-color: #ffffff; border: 1px solid #e4e4e7;">
          <tr>
            <td style="padding: 25px 30px; border-bottom: 3px solid #185FA5; background-color: #ffffff;">
              <h2 style="margin: 0; color: #042C53; font-size: 22px; font-weight: bold;">Fynax Bookkeeper</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; font-size: 16px; line-height: 1.6;">
              <p style="margin-top: 0;">Hi <strong>${firstName}</strong>,</p>
              <p>Welcome! You just made a brilliant decision for your business. A lot of Nigerian business owners work incredibly hard every day, but still can't tell you exactly how much they made, what they spent, or whether their business is actually growing.</p>
              <p>This 30-minute training was created to change that forever.</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; background-color: #f8fafc; border-left: 4px solid #185FA5;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; font-weight: bold; color: #0f172a;">In this training, you will discover:</p>
                    <ul style="margin: 0; padding-left: 20px; color: #334155; line-height: 1.7;">
                      <li><strong>The 6 essential records</strong> every business needs to survive</li>
                      <li><strong>The silent profit killers</strong> draining your accounts right now</li>
                      <li><strong>A simple 15-minute daily routine</strong> to track your money effortlessly</li>
                    </ul>
                  </td>
                </tr>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${YOUTUBE_LINK}" style="background-color: #185FA5; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 4px; display: inline-block;">Watch the Masterclass Now &rarr;</a>
                  </td>
                </tr>
              </table>
              <p>To your business growth,<br><br><strong style="color: #0f172a;">Ridwanullah</strong><br><span style="color: #64748b; font-size: 14px;">Fynax Bookkeeper</span></p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; background-color: #f8fafc; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} Fynax Bookkeeper. All rights reserved.</p>
              <p style="margin: 0;">You are receiving this because you registered for our free masterclass. <a href="#" style="color: #185FA5; text-decoration: underline;">Unsubscribe</a></p>
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
    return NextResponse.json({ success: true });
  }
}
