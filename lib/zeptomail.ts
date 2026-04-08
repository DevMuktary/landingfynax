import { SendMailClient } from "zeptomail";

// IMPORTANT: Ensure this matches your verified ZeptoMail domain
const SENDER_EMAIL = "hello@fynaxtech.com"; 
const SENDER_NAME = "Ridwanullah | Fynax Bookkeeper";

export async function sendZeptoMail(toEmail: string, toName: string, subject: string, htmlBody: string) {
  try {
    // 1. Setup URL (handles missing protocol or accidental /send at the end)
    let url = process.env.ZEPTOMAIL_URL || "https://api.zeptomail.com/v1.1/email";
    if (url.endsWith('/send')) url = url.replace('/send', '');
    if (!url.startsWith('http')) url = `https://${url}`;

    // 2. Setup Token (ensures Zoho-enczapikey prefix is present)
    let token = process.env.ZEPTOMAIL_TOKEN || "";
    if (!token) {
      console.error("❌ [ERROR] ZEPTOMAIL_TOKEN is missing from environment variables!");
      return false;
    }
    if (!token.startsWith("Zoho-enczapikey")) {
      token = `Zoho-enczapikey ${token}`;
    }

    // 3. Initialize Client
    const client = new SendMailClient({ url, token });
    console.log(`🚀 [CRON] Sending ZeptoMail to: ${toEmail}`);

    // 4. Send Email
    await client.sendMail({
      from: {
        address: SENDER_EMAIL,
        name: SENDER_NAME,
      },
      to: [
        {
          email_address: {
            address: toEmail,
            name: toName,
          },
        },
      ],
      subject: subject,
      htmlbody: htmlBody,
    });

    return true;
  } catch (error: any) {
    console.error(`❌ [CRON ERROR] ZeptoMail failed to send to ${toEmail}:`);
    console.error(JSON.stringify(error, null, 2));
    return false;
  }
}
