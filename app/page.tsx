"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  PlayCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown,
  LayoutGrid,
  Clock,
  TrendingDown,
  MessageSquare
} from "lucide-react";

export default function LandingPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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

  const faqs = [
    {
      question: "Is this masterclass really 100% free?",
      answer: "Yes, absolutely. There are no hidden fees and no credit card required to watch. We are providing this free value to show you how easy record-keeping can actually be."
    },
    {
      question: "Do I need accounting knowledge to understand this?",
      answer: "Not at all. This training was specifically designed for Nigerian business owners who have zero finance background. We strip away the confusing jargon and give you simple, practical steps."
    },
    {
      question: "Will this work for my type of business?",
      answer: "Yes. Whether you sell physical products, run a boutique, provide a service, or operate a pharmacy, the principles of tracking income, expenses, and profit apply exactly the same."
    },
    {
      question: "How do I access the training?",
      answer: "Once you enter your name and email in the form, you will be instantly redirected to the private masterclass video. You can watch it immediately on your phone or laptop."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F0F4FA] font-sans text-slate-900 selection:bg-[#378ADD] selection:text-white">
      
      {/* --- NAVIGATION --- */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 bg-[#042C53] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#378ADD] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="text-lg font-medium text-white tracking-tight">Fynax Bookkeeper</span>
        </div>
        <div className="text-xs md:text-sm bg-[#378ADD]/20 border border-[#378ADD]/40 text-[#85B7EB] px-4 py-1.5 rounded-full font-medium hidden sm:block">
          Free Masterclass
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="bg-[#042C53] pt-16 pb-36 px-6 text-center relative overflow-hidden">
        {/* Radial subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(55,138,221,0.18)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Animated Pill */}
          <div className="inline-flex items-center gap-2.5 bg-[#378ADD]/15 border border-[#378ADD]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#378ADD] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#378ADD]"></span>
            </span>
            <span className="text-[13px] text-[#85B7EB] font-medium">Now open — limited spots available</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight mb-6">
            Keep Clean Records.<br />
            <em className="text-[#378ADD] not-italic">Stop Losing Money.</em>
          </h1>

          <p className="text-[#85B7EB] text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            A highly practical 30-minute breakdown of exactly how to protect your business finances, plug silent profit leaks, and scale with confidence.
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[14px] text-[#85B7EB] font-medium">
            <span className="flex items-center gap-2"><PlayCircle size={18} className="text-[#378ADD]"/> 30-minute video</span>
            <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-[#378ADD]"/> 100% free</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#378ADD]"/> Instant access</span>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 -mt-20 relative z-20 pb-16">
        
        {/* LEFT COLUMN: Bento & Testimonial */}
        <div className="flex flex-col gap-6">
          
          {/* Bento Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-medium text-slate-900 mb-6 tracking-tight">What you will learn inside</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-[#F7F8FA] border border-slate-200/60 rounded-xl p-5 hover:border-[#378ADD]/50 transition-colors">
                <div className="w-10 h-10 bg-[#E6F1FB] rounded-lg flex items-center justify-center mb-3 text-[#185FA5]">
                  <LayoutGrid size={20} />
                </div>
                <h3 className="text-[15px] font-medium text-slate-900 mb-1.5">The 6 essential records</h3>
                <p className="text-[13.5px] text-slate-500 leading-relaxed">Non-negotiable records every serious business owner must keep to survive and thrive.</p>
              </div>

              <div className="bg-[#F7F8FA] border border-slate-200/60 rounded-xl p-5 hover:border-[#378ADD]/50 transition-colors">
                <div className="w-10 h-10 bg-[#E6F1FB] rounded-lg flex items-center justify-center mb-3 text-[#185FA5]">
                  <Clock size={20} />
                </div>
                <h3 className="text-[15px] font-medium text-slate-900 mb-1.5">15-minute daily routine</h3>
                <p className="text-[13.5px] text-slate-500 leading-relaxed">Stay completely on top of your finances without spending hours on confusing spreadsheets.</p>
              </div>

              <div className="bg-[#F7F8FA] border border-slate-200/60 rounded-xl p-5 hover:border-[#378ADD]/50 transition-colors">
                <div className="w-10 h-10 bg-[#E6F1FB] rounded-lg flex items-center justify-center mb-3 text-[#185FA5]">
                  <TrendingDown size={20} />
                </div>
                <h3 className="text-[15px] font-medium text-slate-900 mb-1.5">Silent profit killers</h3>
                <p className="text-[13.5px] text-slate-500 leading-relaxed">Identify the costly mistakes that secretly drain your business accounts while you sleep.</p>
              </div>

              <div className="bg-[#F7F8FA] border border-slate-200/60 rounded-xl p-5 hover:border-[#378ADD]/50 transition-colors">
                <div className="w-10 h-10 bg-[#E6F1FB] rounded-lg flex items-center justify-center mb-3 text-[#185FA5]">
                  <MessageSquare size={20} />
                </div>
                <h3 className="text-[15px] font-medium text-slate-900 mb-1.5">The WhatsApp solution</h3>
                <p className="text-[13.5px] text-slate-500 leading-relaxed">How smart business owners make record-keeping 100% effortless directly from their phones.</p>
              </div>

            </div>
          </div>

          {/* Testimonial Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#185FA5] flex items-center justify-center text-white font-medium text-lg">A</div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="flex gap-0.5 text-yellow-400 mb-2.5">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="text-[14.5px] text-slate-800 leading-relaxed italic mb-2">"This training opened my eyes. I had no idea how much money I was losing. Every business owner in Nigeria needs to watch this."</p>
                <div className="flex items-center flex-wrap gap-1.5 text-sm">
                  <span className="font-medium text-slate-900">Adaeze O.</span>
                  <span className="text-slate-500">— Fashion business owner, Lagos</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Form Card (Sticky) */}
        <div className="relative">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/50 sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-medium text-slate-900 mb-1.5 tracking-tight">Get instant access</h2>
              <p className="text-[14px] text-slate-500">Where should we send your private video link?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-slate-900 mb-2">First name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 text-[14px] bg-[#F7F8FA] border border-slate-200 rounded-xl focus:bg-white focus:border-[#378ADD] focus:ring-[3px] focus:ring-[#378ADD]/10 outline-none transition-all placeholder:text-slate-400"
                  placeholder="e.g. Ridwanullah"
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-medium text-slate-900 mb-2">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-[14px] bg-[#F7F8FA] border border-slate-200 rounded-xl focus:bg-white focus:border-[#378ADD] focus:ring-[3px] focus:ring-[#378ADD]/10 outline-none transition-all placeholder:text-slate-400"
                  placeholder="name@company.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-[#185FA5] hover:bg-[#0C447C] active:scale-[0.98] text-white font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-[15px] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Securing your spot..." : (
                  <>Watch the masterclass <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-1.5 text-[13px] text-slate-600">
                <ShieldCheck size={16} className="text-green-500" />
                Bank-grade data protection
              </div>
              <p className="text-[12px] text-slate-400">100% free · No credit card needed · Unsubscribe anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF STRIP --- */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white border border-slate-200 rounded-2xl py-8 px-6 md:px-12 flex flex-wrap justify-center gap-8 md:gap-16 shadow-sm">
          <div className="text-center">
            <div className="text-3xl font-medium text-[#185FA5] tracking-tight">4,200+</div>
            <div className="text-[13px] text-slate-500 mt-1">Business owners enrolled</div>
          </div>
          <div className="hidden md:block w-px bg-slate-200"></div>
          <div className="text-center">
            <div className="text-3xl font-medium text-[#185FA5] tracking-tight">30 min</div>
            <div className="text-[13px] text-slate-500 mt-1">Practical, zero fluff</div>
          </div>
          <div className="hidden md:block w-px bg-slate-200"></div>
          <div className="text-center">
            <div className="text-3xl font-medium text-[#185FA5] tracking-tight">4.9 / 5</div>
            <div className="text-[13px] text-slate-500 mt-1">Average attendee rating</div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${openFaq === index ? 'border-[#378ADD] shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className="font-medium text-slate-900 text-[15px]">{faq.question}</span>
                <ChevronDown 
                  size={18} 
                  className={`text-slate-400 transition-transform duration-200 ${openFaq === index ? 'rotate-180 text-[#378ADD]' : ''}`} 
                />
              </button>
              
              <div 
                className={`px-6 text-[14.5px] text-slate-600 leading-relaxed transition-all duration-300 ease-in-out ${openFaq === index ? 'pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#185FA5] rounded-md flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="text-[15px] font-medium text-slate-900">Fynax Bookkeeper</span>
        </div>
        <span className="text-[13px] text-slate-500">© {new Date().getFullYear()} Fynax. All rights reserved.</span>
      </footer>

    </div>
  );
}
