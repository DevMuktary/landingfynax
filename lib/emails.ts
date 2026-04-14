// --- MASTER HTML WRAPPER ---
const wrapEmail = (content: string) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Fynax Bookkeeper</title>
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
              ${content}
              
              <p style="margin-top: 30px;">To your business growth,<br><br><strong style="color: #0f172a;">Ridwanullah</strong><br><span style="color: #64748b; font-size: 14px;">Fynax Bookkeeper</span></p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 20px 30px; background-color: #f8fafc; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} Fynax Bookkeeper. All rights reserved.</p>
              <p style="margin: 0;">You are receiving this because you registered for our free masterclass.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// --- EMAIL SEQUENCE ---
export const emailSequence = [
  {
    day: 2,
    subject: "The real reason most Nigerian businesses struggle 😟",
    generateBody: (name: string) => wrapEmail(`
      <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
      <p>Let me ask you something honest. At the end of last month, could you tell exactly:</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #f8fafc; border-left: 4px solid #185FA5;">
        <tr>
          <td style="padding: 15px 20px;">
            <ul style="margin: 0; padding-left: 20px; color: #334155; line-height: 1.7;">
              <li>How much money came into your business?</li>
              <li>How much went out?</li>
              <li>What your actual profit was?</li>
            </ul>
          </td>
        </tr>
      </table>

      <p>If you hesitated — you're not alone. Most Nigerian business owners cannot answer those three questions without guessing. And that's not laziness. It's a system problem.</p>
      <p>When you don't have a clear picture of your numbers, dangerous things happen: you spend money you don't have, tax season becomes a nightmare, and you can't access loans because you have no records.</p>
      <p>The good news? This is 100% fixable. It doesn't require an accountant or complicated software.</p>
      
      <p>Whether you've already started implementing the steps or just need a quick refresher, the masterclass is still available for you here:</p>
      
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 25px 0;">
        <tr>
          <td align="center">
            <a href="https://bookkeeper.fynaxtech.com/success" style="background-color: #185FA5; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 4px; display: inline-block;">Re-watch the Masterclass &rarr;</a>
          </td>
        </tr>
      </table>
      <p>Tomorrow I'll show you exactly how Fynax makes this problem disappear — in the simplest way possible.</p>
    `)
  },
  {
    day: 4,
    subject: "See how Fynax works on WhatsApp 👀",
    generateBody: (name: string) => wrapEmail(`
      <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
      <p>You already use WhatsApp every day to run your business — sending invoices, talking to customers, updating your team.</p>
      <p>What if your bookkeeping worked the same way?</p>
      <p>That's exactly what <strong>Fynax Bookkeeper</strong> does. No app to download. No complicated software to learn. No accountant needed.</p>
      
      <p>You simply open WhatsApp, tell Fynax what happened in your business today, and it records everything automatically. For example:</p>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #f0fdf4; border-left: 4px solid #22c55e;">
        <tr>
          <td style="padding: 15px 20px; font-family: monospace; font-size: 15px;">
            <p style="margin: 0 0 10px 0; color: #166534;">💬 "Sold 10 bags of rice for ₦45,000"</p>
            <p style="margin: 0 0 10px 0; color: #166534;">💬 "Paid ₦8,000 for market supplies"</p>
            <p style="margin: 0; color: #166534;">💬 "Received ₦20,000 from customer Bola"</p>
          </td>
        </tr>
      </table>

      <p>Fynax captures it, organizes it, and gives you a clean report whenever you need it. It's bookkeeping that speaks your language.</p>
      <p>As a quick reminder, you can review how this process works inside the masterclass here:</p>
      <p><a href="https://bookkeeper.fynaxtech.com/success" style="color: #185FA5; font-weight: bold; text-decoration: underline;">Access the Free Training →</a></p>
    `)
  },
  {
    day: 6,
    subject: "What business owners are saying about Fynax 🗣️",
    generateBody: (name: string) => wrapEmail(`
      <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
      <p>Before I say anything else — let me show you what other business owners like you are experiencing with Fynax Bookkeeper.</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #f8fafc; border-left: 4px solid #185FA5;">
        <tr>
          <td style="padding: 20px; font-style: italic; color: #334155;">
            "Before Fynax, I was guessing my profits every month. Now I just check my WhatsApp and the numbers are right there. My business has never been this organized."<br><br>
            <strong style="font-style: normal; color: #0f172a;">— Adaeze, Fashion Business Owner, Lagos</strong>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #f8fafc; border-left: 4px solid #185FA5;">
        <tr>
          <td style="padding: 20px; font-style: italic; color: #334155;">
            "I tried using Excel before but I would always abandon it after two weeks. Fynax is different because I'm already on WhatsApp all day. It just fits into how I work."<br><br>
            <strong style="font-style: normal; color: #0f172a;">— Emeka, Supermarket Owner, Abuja</strong>
          </td>
        </tr>
      </table>

      <p>These are real people who were exactly where you are right now — hardworking business owners with no clean system for their finances. Fynax changed that for them. It can do the same for you.</p>
      <p>Ready to try it?</p>
      
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 25px 0;">
        <tr>
          <td align="left">
            <a href="https://wa.me/2349161419514?text=Hi%2C%20I%20want%20to%20start%20my%20free%20trial%20of%20Fynax" style="background-color: #22c55e; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 4px; display: inline-block;">Start Your Free Trial on WhatsApp &rarr;</a>
          </td>
        </tr>
      </table>
    `)
  },
  {
    day: 8,
    subject: "Your questions about Fynax — answered honestly ✅",
    generateBody: (name: string) => wrapEmail(`
      <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
      <p>I've been speaking with business owners like you and a few questions keep coming up. Let me answer them honestly.</p>
      
      <p>❓ <strong style="color: #042C53;">Is it difficult to use?</strong><br>
      Not at all. If you can send a WhatsApp message, you can use Fynax. There's no training required.</p>
      
      <p>❓ <strong style="color: #042C53;">What if I make a mistake in my records?</strong><br>
      Fynax allows you to correct entries easily. Your records stay clean without stress.</p>
      
      <p>❓ <strong style="color: #042C53;">Is my business data safe?</strong><br>
      Yes. Fynax is built with data security as a priority. Your business information is private and protected.</p>
      
      <p>❓ <strong style="color: #042C53;">I'm not very tech-savvy. Will I cope?</strong><br>
      Absolutely. Fynax was specifically designed for Nigerian business owners — not accountants or tech people.</p>
      
      <p>Still have a question not covered here? Simply reply directly to this email and I'll respond personally.</p>
    `)
  },
  {
    day: 10,
    subject: "Where do you want your business to be in 12 months? 🚀",
    generateBody: (name: string) => wrapEmail(`
      <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
      <p>I want to ask you a different kind of question today. Not about records or software. About your vision.</p>
      <p><strong>Where do you want your business to be 12 months from now?</strong></p>
      <p>More sales? A second location? Hiring staff? Accessing a loan to expand?</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #f8fafc; border-left: 4px solid #185FA5;">
        <tr>
          <td style="padding: 20px; color: #334155; font-weight: bold;">
            Whatever your answer is — here's what almost every successful business owner will tell you: None of those things happen without knowing your numbers.
          </td>
        </tr>
      </table>

      <p>You can't grow what you can't measure. You can't access funding without financial records. You can't make smart decisions without clean data.</p>
      <p>That's the real purpose of Fynax Bookkeeper. Not just record-keeping — but giving you the financial clarity to build the business you actually want. And it all happens simply on WhatsApp.</p>
      
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 25px 0;">
        <tr>
          <td align="left">
            <a href="https://wa.me/2349161419514?text=Hi%2C%20I%20am%20ready%20to%20get%20started%20with%20Fynax" style="background-color: #185FA5; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 4px; display: inline-block;">Get Started with Fynax Today &rarr;</a>
          </td>
        </tr>
      </table>
    `)
  },
  {
    day: 12,
    subject: "A special offer — just for you 🎁",
    generateBody: (name: string) => wrapEmail(`
      <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
      <p>Because you took time to attend the free record-keeping training, I want to give you something special.</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
        <tr>
          <td style="padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #16a34a;">✅ Free Nigerian New Tax Law Consultation</p>
          </td>
        </tr>
      </table>

      <p>This offer is not available anywhere else. It's our way of saying thank you for taking your business finances seriously.</p>
      <p>Here's what you get when you start with Fynax today:</p>
      
      <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #334155; line-height: 1.7;">
        <li>📲 WhatsApp-based bookkeeping — no app needed</li>
        <li>📊 Automatic income and expense tracking</li>
        <li>🧾 Clean financial reports at your fingertips</li>
        <li>🔒 Safe and secure business data</li>
      </ul>

      <p><strong>This offer expires in 72 hours.</strong></p>
      
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 25px 0;">
        <tr>
          <td align="center">
            <a href="https://wa.me/2349161419514?text=Hi%2C%20I%20want%20to%20claim%20my%20special%20tax%20consultation%20offer" style="background-color: #ef4444; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 4px; display: inline-block;">Claim Your Special Access Now &rarr;</a>
          </td>
        </tr>
      </table>
    `)
  },
  {
    day: 14,
    subject: "How Emeka found ₦180,000 he didn't know his business had 💡",
    generateBody: (name: string) => wrapEmail(`
      <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
      <p>Let me tell you Emeka's story. He runs a small supermarket in Abuja. Always busy, always selling.</p>
      <p>But every month, he would look at his account balance and wonder — "Where is the money going?" He had no records. Just memory and rough guesses.</p>
      <p>When Emeka started using Fynax Bookkeeper, something surprising happened. Within the first 30 days, he realized he had 3 suppliers he was overpaying, and a staff member who had been recording sales incorrectly.</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #f8fafc; border-left: 4px solid #185FA5;">
        <tr>
          <td style="padding: 20px; color: #0f172a; font-weight: bold; font-size: 18px;">
            Total financial leakage discovered: over ₦180,000.
          </td>
        </tr>
      </table>

      <p>That money was always there. He just couldn't see it without clean records.</p>
      <p>${name}, how much could be hiding in your business right now? You won't know until you start tracking. And Fynax makes it as easy as sending a WhatsApp message.</p>
      <p><a href="https://wa.me/2349161419514?text=Hi%2C%20I%20am%20ready%20to%20find%20my%20numbers%20with%20Fynax" style="color: #185FA5; font-weight: bold; text-decoration: underline;">Start with Fynax and Find Your Numbers →</a></p>
    `)
  },
  {
    day: 16,
    subject: "This closes tomorrow — don't miss it ⏳",
    generateBody: (name: string) => wrapEmail(`
      <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
      <p>I'll keep this short because time is almost up.</p>
      <p>The special tax consultation offer I shared with you expires tomorrow. After that, it's gone.</p>
      <p>You signed up for the free training because something told you that your business finances needed attention. That instinct was right.</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #f8fafc; border-left: 4px solid #185FA5;">
        <tr>
          <td style="padding: 20px; color: #334155;">
            Fynax Bookkeeper is the simplest, most affordable way for a Nigerian business owner to keep clean records, understand their numbers, and grow with confidence.
          </td>
        </tr>
      </table>

      <p>If you're still on the fence — I understand. But inaction is also a decision. The cost of not knowing your numbers will always be greater than the cost of fixing it today.</p>
      
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 25px 0;">
        <tr>
          <td align="center">
            <a href="https://wa.me/2349161419514?text=Hi%2C%20I%20want%20to%20claim%20the%20offer%20before%20it%20expires" style="background-color: #ef4444; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 4px; display: inline-block;">Get Started Before It Expires &rarr;</a>
          </td>
        </tr>
      </table>
    `)
  },
  {
    day: 19,
    subject: "Should I stop sending you emails? 🤔",
    generateBody: (name: string) => wrapEmail(`
      <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
      <p>I'll be completely honest with you.</p>
      <p>You signed up for the free training a few weeks ago, and I've been sharing resources to help your business. But I haven't heard from you.</p>
      <p>That's okay. I understand. Business is demanding. But before I stop reaching out, I want to ask you one last question:</p>
      <p><strong>What's holding you back?</strong></p>
      
      <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #334155; line-height: 1.7;">
        <li>Is it the price? I can help with that.</li>
        <li>Is it a question about how Fynax works? I can answer that.</li>
        <li>Is it just not the right time? That's completely valid.</li>
      </ul>

      <p>Whatever it is — just hit reply to this email and tell me. I read every response personally and I'd love to help if I can.</p>
      <p>If you're no longer interested, no hard feelings at all. Just ignore this email and you won't hear from me again. But if there's even a small part of you that still wants clean records and financial clarity for your business — reply to this email. Let's figure it out together.</p>
    `)
  }
];
