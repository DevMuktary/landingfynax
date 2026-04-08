"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderOpen, Clock, AlertTriangle, Lightbulb, Star, CheckCircle2, Shield, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-blue-600 text-white pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/50 text-blue-50 font-medium text-sm mb-8 border border-blue-400">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            Free Training for Nigerian Business Owners
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            How to Keep Clean Records & <br className="hidden md:block"/>
            <span className="text-blue-200">Never Lose Track of Your Money</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
            A free 30-minute practical masterclass that shows you exactly how to protect your business finances, stop profit leaks, and grow with confidence.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT & FORM --- */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-20 pb-24">
        
        {/* Left Side: Copy & Benefits */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">In this free training, you will discover:</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <FolderOpen className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">The 6 Essential Records</h3>
                  <p className="text-slate-600 leading-relaxed">The absolute non-negotiable records every serious business owner must keep to survive and thrive in Nigeria.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <Clock className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">A Simple 15-Minute Daily Routine</h3>
                  <p className="text-slate-600 leading-relaxed">How to stay completely on top of your finances without spending hours on confusing spreadsheets.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <AlertTriangle className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">The Silent Profit Killers</h3>
                  <p className="text-slate-600 leading-relaxed">Costly mistakes that are secretly draining your business accounts right now without you even knowing.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <Lightbulb className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">The Smart WhatsApp Solution</h3>
                  <p className="text-slate-600 leading-relaxed">See how modern business owners are making record-keeping 100% effortless right from their phones.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Banner */}
          <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex gap-1 mb-4 text-yellow-400">
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
            </div>
            <p className="text-lg italic text-slate-300 mb-6 leading-relaxed">
              "This training completely opened my eyes. I had no idea how much money I was losing every month due to poor records. If you sell anything in Nigeria, you need to watch this."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">A</div>
              <div>
                <p className="font-bold text-white">Adaeze</p>
                <p className="text-sm text-slate-400">Fashion Business Owner, Lagos</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: The Form Card */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 sticky top-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Watch it Free Now</h2>
              <p className="text-slate-500">Enter your details to get instant access to the masterclass.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
                  placeholder="Where should we send the video?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all flex justify-center items-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Registering..." : (
                  <>
                    Send Me the Free Training <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <Shield size={16} className="text-green-500" />
                Your information is 100% secure.
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 size={14} /> No spam.
                <span className="mx-1">•</span>
                <CheckCircle2 size={14} /> Unsubscribe anytime.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Brought to you by <span className="text-white font-bold">Fynax Bookkeeper</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
