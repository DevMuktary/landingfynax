"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  BarChart3, 
  Clock, 
  Wallet, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  PlayCircle 
} from "lucide-react";

export default function LandingPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      
      {/* =========================================
          HERO SECTION (Premium Dark SaaS Aesthetic) 
          ========================================= */}
      <section className="relative bg-[#020817] text-white pt-24 pb-40 px-6 overflow-hidden border-b border-slate-800">
        {/* Background Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-md mb-8 shadow-2xl">
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-200 tracking-wide">Free Masterclass for Nigerian Business Owners</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Keep Clean Records. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300">
              Stop Losing Money.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed mb-10">
            A highly practical, 30-minute breakdown of exactly how to protect your business finances, plug silent profit leaks, and scale with absolute confidence.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2"><PlayCircle size={18} className="text-blue-500" /> 30-Min Video</span>
            <span className="hidden md:block text-slate-700">|</span>
            <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-blue-500" /> 100% Free</span>
            <span className="hidden md:block text-slate-700">|</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-blue-500" /> Instant Access</span>
          </div>
        </div>
      </section>

      {/* =========================================
          MAIN CONTENT (Bento Grid & Glass Form) 
          ========================================= */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-24 pb-32 relative z-20">
        
        {/* LEFT COLUMN: The Bento Grid Value Props */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">What you will learn inside:</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                  <BarChart3 size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">The 6 Essential Records</h3>
                <p className="text-slate-600 text-sm leading-relaxed">The absolute non-negotiable records every serious business owner must keep to survive and thrive.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                  <Clock size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">15-Minute Daily Routine</h3>
                <p className="text-slate-600 text-sm leading-relaxed">How to stay completely on top of your finances without spending hours on confusing Excel sheets.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                  <Wallet size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Silent Profit Killers</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Identify the costly mistakes that are secretly draining your business accounts while you sleep.</p>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                  <MessageSquare size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">The WhatsApp Solution</h3>
                <p className="text-slate-600 text-sm leading-relaxed">See how smart business owners make record-keeping 100% effortless right from their phones.</p>
              </div>
            </div>
          </div>

          {/* Elite Social Proof Banner */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0 relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-inner">A</div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                <div className="bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <div>
              <div className="flex gap-1 text-yellow-400 mb-2">
                {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-slate-700 italic mb-2">"This training opened my eyes. I had no idea how much money I was losing. Highly recommended."</p>
              <p className="text-sm font-bold text-slate-900">Adaeze <span className="text-slate-400 font-normal">| Fashion Business Owner, Lagos</span></p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Registration Form */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-white p-8 sticky top-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Get Instant Access</h2>
              <p className="text-slate-500 text-sm">Where should we send your private video link?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
                  placeholder="e.g. Ridwanullah"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
                  placeholder="name@company.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative group mt-4"
              >
                {/* Button Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
                <div className="relative flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Securing your spot...
                    </span>
                  ) : (
                    <>
                      Watch the Masterclass <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Micro-copy Trust Signals */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                <ShieldCheck size={18} className="text-emerald-500" />
                Bank-grade data protection
              </div>
              <p className="text-xs text-slate-400">100% Free. No credit card required. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FOOTER 
          ========================================= */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Fynax Bookkeeper</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Fynax. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
