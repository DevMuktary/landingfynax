export async function sendZeptoMail(toEmail: string, toName: string, subject: string, htmlBody: string) {
  const url = "https://api.zeptomail.com/v1.1/email";
  const token = process.env.ZEPTOMAIL_TOKEN;

  if (!token) {
    console.error("Missing ZEPTOMAIL_TOKEN environment variable");
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Zoho-enczapikey ${token}`
      },
      body: JSON.stringify({
        from: { address: "hello@fynaxtech.com", name: "Ridwanullah | Fynax Bookkeeper" },
        to: [{ email_address: { address: toEmail, name: toName } }],
        subject: subject,
        htmlbody: htmlBody
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("ZeptoMail Error:", errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
