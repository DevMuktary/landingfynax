import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendZeptoMail } from "@/lib/zeptomail";
import { emailSequence } from "@/lib/emails";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  // Security check: Ensure only your cron service can trigger this
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get all active leads
    const leads = await prisma.lead.findMany({
      where: { isActive: true }
    });

    let emailsSent = 0;

    for (const lead of leads) {
      // Calculate days since registration
      const msPassed = Date.now() - lead.createdAt.getTime();
      const daysPassed = Math.floor(msPassed / (1000 * 60 * 60 * 24));

      // Find the email that matches the current day, AND ensure we haven't sent it yet
      const emailToSend = emailSequence.find(
        (email) => daysPassed >= email.day && lead.lastEmailDay < email.day
      );

      if (emailToSend) {
        // Send the email
        const success = await sendZeptoMail(
          lead.email,
          lead.firstName,
          emailToSend.subject,
          emailToSend.generateBody(lead.firstName)
        );

        if (success) {
          // Update PostgreSQL so they don't receive it again
          await prisma.lead.update({
            where: { id: lead.id },
            data: { lastEmailDay: emailToSend.day }
          });
          emailsSent++;
        }
      }
    }

    return NextResponse.json({ success: true, emailsSent });
  } catch (error) {
    console.error("Cron Execution Error:", error);
    return NextResponse.json({ error: "Cron execution failed" }, { status: 500 });
  }
}
