import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, path, email } = body;

    // Track a raw page visit (Landing Page or Success Page)
    if (action === 'visit' && path) {
      await prisma.pageVisit.create({
        data: { path }
      });
      return NextResponse.json({ success: true });
    }

    // Track when a user clicks 'Play' on the video (Requires their email to link it)
    if (action === 'video_play' && email) {
      await prisma.lead.update({
        where: { email },
        data: { videoWatched: true }
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("[TRACKING ERROR]:", error);
    // Always return 200 so frontend never crashes if tracking fails
    return NextResponse.json({ success: false }); 
  }
}
