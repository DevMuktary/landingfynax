"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MessageSquare, ShieldCheck, Play } from "lucide-react";

// 1. We move the actual content into a child component
function SuccessContent() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email'); // Get the email passed from the landing page
  
  const whatsappNumber = "2349161419514";
  const message = encodeURIComponent("Hi, I just watched the training and I am ready to start using Fynax Bookkeeper!");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  // Track the Page Visit
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'visit', path: '/success' })
    }).catch(() => {});
  }, []);

  // Track the Video Play
  const handleVideoPlay = () => {
    setIsVideoLoaded(true);
    
    if (userEmail) {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'video_play', email: userEmail })
      }).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4FA] font-sans text-slate-900 selection:bg-[#3b82f6] selection:text-white pb-20">
      
      {/* --- NAVIGATION --- */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 bg-[#042C53] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#3b82f6] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="text-lg font-medium text-white tracking-tight">Fynax Bookkeeper</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-medium text-slate-900 mb-4 tracking-tight">
            You're In! Your Free Training is Ready
          </h1>
          <p className="text-slate-500 text-lg">
            Watch it now — these 30 minutes could change how you run your business forever.
          </p>
        </div>

        {/* FAST-LOADING TRACKED VIDEO CONTAINER */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-12">
          <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden group">
            {!isVideoLoaded ? (
              <button 
                onClick={handleVideoPlay}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center cursor-pointer"
              >
                <img 
                  src="https://img.youtube.com/vi/krVjVaNmAEY/maxresdefault.jpg" 
                  alt="Training Thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative z-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-700 transition-all duration-300">
                  <Play size={36} className="text-white ml-2 fill-white" />
                </div>
              </button>
            ) : (
              <iframe 
                src="https://www.youtube.com/embed/krVjVaNmAEY?autoplay=1" 
                title="Fynax Free Training"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              ></iframe>
            )}
          </div>
        </div>

        {/* CALL TO ACTION CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm text-center">
          <h2 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">
            Ready to put what you just learned into action?
          </h2>
          <p className="text-[15px] text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Meet <strong>Fynax Bookkeeper</strong> — the simplest way to keep clean business records on WhatsApp. No app. No spreadsheet. No accountant needed. Just open WhatsApp, tell Fynax what happened in your business today, and it handles the rest.
          </p>

          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center gap-3 w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.98] text-white font-medium py-4 px-10 rounded-xl transition-all text-[16px] shadow-sm mb-4"
          >
            <MessageSquare size={20} className="fill-white" />
            Start Chatting with Fynax on WhatsApp
          </a>
          
          <p className="text-[13px] text-slate-500 mb-8">
            (It's free to start — no payment required)
          </p>

          <div className="pt-8 border-t border-slate-100 flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-1.5 text-[13px] text-slate-600 font-medium">
              <ShieldCheck size={16} className="text-[#185FA5]" />
              Join hundreds of Nigerian business owners already using Fynax.
            </div>
            <p className="text-[12px] text-slate-400 mt-2">Brought to you by Fynax Bookkeeper</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// 2. We export the main page wrapped in Suspense so Next.js doesn't crash during build
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F0F4FA] flex items-center justify-center text-slate-500 font-medium">
        Loading your training...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
