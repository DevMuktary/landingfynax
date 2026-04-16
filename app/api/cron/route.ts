let emailsSent = 0;

    for (const lead of leads) {
      // --- CALENDAR DAY MATH FIX ---
      const today = new Date();
      const createdDate = new Date(lead.createdAt);

      // Strip the time (hours, minutes, seconds) so we only compare midnight to midnight
      const todayMidnight = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      const createdMidnight = Date.UTC(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate());

      // Now calculate the difference in pure calendar days
      const msPassed = todayMidnight - createdMidnight;
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
