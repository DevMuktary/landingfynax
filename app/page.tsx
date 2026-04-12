"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  PlayCircle, 
  ShieldCheck, 
  CheckCircle2, 
  X,
  ArrowRight,
  TrendingDown,
  Clock,
  FolderOpen,
  MessageSquare
} from "lucide-react";

export default function LandingPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email }),
    });

    if (res.ok) {
      router.push("/success");
    } else {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4FA] font-sans text-slate-900 selection:bg-[#3b82f6] selection:text-white pb-10">
      
      {/* --- NAVIGATION --- */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 bg-[#042C53] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#3b82f6] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="text-lg font-medium text-white tracking-tight">Fynax Bookkeeper</span>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="bg-[#042C53] pt-16 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3b82f6]"></span>
            </span>
            <span className="text-[13px] text-blue-200 font-medium tracking-wide">Free Masterclass For Nigerian Business Owners</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight mb-6">
            Keep Clean Records.<br />
            <em className="text-[#3b82f6] not-italic">Stop Losing Money.</em>
          </h1>

          <p className="text-blue-100/80 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            A highly practical 30-minute breakdown of exactly how to protect your business finances, plug silent profit leaks, and scale with confidence.
          </p>

          {/* PRIMARY CTA BUTTON (Triggers Modal) */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3b82f6] hover:bg-blue-600 active:scale-95 text-white font-medium text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 mx-auto"
          >
            Watch the Masterclass Now <PlayCircle size={20} />
          </button>
          
          <p className="text-sm text-blue-200/60 mt-4 flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-green-400" /> 100% Free. Instant Access.
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION (Short & Condensed) --- */}
      <section className="max-w-3xl mx-auto px-6 -mt-12 relative z-20">
        
        {/* Single Sleek Bullet Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-slate-200/50 mb-8">
          <h2 className="text-2xl font-medium text-slate-900 mb-6 tracking-tight text-center">What you will discover inside:</h2>
          
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-100">
                <FolderOpen size={20} className="text-[#3b82f6]" />
              </div>
              <div>
                <strong className="text-slate-900 block text-[16px] mb-1">The 6 Essential Records</strong>
                <span className="text-slate-500 text-[14px] leading-relaxed">The absolute non-negotiable records every serious business owner must keep to survive and thrive.</span>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-100">
                <Clock size={20} className="text-[#3b82f6]" />
              </div>
              <div>
                <strong className="text-slate-900 block text-[16px] mb-1">The 15-Minute Daily Routine</strong>
                <span className="text-slate-500 text-[14px] leading-relaxed">How to stay completely on top of your finances without spending hours on confusing spreadsheets.</span>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-100">
                <TrendingDown size={20} className="text-[#3b82f6]" />
              </div>
              <div>
                <strong className="text-slate-900 block text-[16px] mb-1">Silent Profit Killers</strong>
                <span className="text-slate-500 text-[14px] leading-relaxed">Identify the costly mistakes that are secretly draining your business accounts while you sleep.</span>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-100">
                <MessageSquare size={20} className="text-[#3b82f6]" />
              </div>
              <div>
                <strong className="text-slate-900 block text-[16px] mb-1">The WhatsApp Solution</strong>
                <span className="text-slate-500 text-[14px] leading-relaxed">See how smart business owners make record-keeping 100% effortless right from their phones.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Compact Testimonial */}
        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-medium text-xl shadow-inner border-2 border-slate-800">A</div>
          </div>
          <div>
            <div className="flex gap-1 text-yellow-400 mb-2">
              <CheckCircle2 size={16} className="fill-yellow-400 text-yellow-400" />
              <CheckCircle2 size={16} className="fill-yellow-400 text-yellow-400" />
              <CheckCircle2 size={16} className="fill-yellow-400 text-yellow-400" />
              <CheckCircle2 size={16} className="fill-yellow-400 text-yellow-400" />
              <CheckCircle2 size={16} className="fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-[15px] text-slate-300 italic mb-2 leading-relaxed">"This training opened my eyes. I had no idea how much money I was losing. Every Nigerian business owner needs this."</p>
            <p className="text-[13px] font-medium text-white">Adaeze O. <span className="text-slate-500 font-normal">— Fashion Business Owner, Lagos</span></p>
          </div>
        </div>

      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="max-w-3xl mx-auto px-6 mt-16 text-center">
        <h2 className="text-2xl font-medium text-slate-900 mb-6">Ready to stop guessing your profits?</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#042C53] hover:bg-slate-800 active:scale-95 text-white font-medium px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 mx-auto"
        >
          Get Free Instant Access <ArrowRight size={18} />
        </button>
      </section>

      {/* --- REGISTRATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-medium text-lg text-slate-900">Where should we send the video?</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-900 mb-1.5">First name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3.5 text-[14px] bg-white border border-slate-300 rounded-xl focus:border-[#3b82f6] focus:ring-[3px] focus:ring-[#3b82f6]/20 outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. Ridwanullah"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-medium text-slate-900 mb-1.5">Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 text-[14px] bg-white border border-slate-300 rounded-xl focus:border-[#3b82f6] focus:ring-[3px] focus:ring-[#3b82f6]/20 outline-none transition-all placeholder:text-slate-400"
                    placeholder="name@company.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-[#3b82f6] hover:bg-blue-600 active:scale-[0.98] text-white font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-[15px] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Securing your spot..." : "Send Me The Masterclass"}
                </button>
              </form>

              <div className="mt-5 text-center flex items-center justify-center gap-1.5 text-[12px] text-slate-500">
                <ShieldCheck size={14} className="text-green-500" />
                100% Secure. No spam, unsubscribe anytime.
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
