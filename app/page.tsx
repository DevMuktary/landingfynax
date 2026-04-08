"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderOpen, Clock, AlertTriangle, Lightbulb, Star, CheckCircle, XCircle, TrendingDown, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      {/* 1. HERO SECTION */}
      <section className="bg-brandBlue text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 text-blue-300 font-semibold tracking-wider uppercase text-xs md:text-sm mb-6 border border-blue-700/50">
            Free Masterclass For Nigerian Business Owners
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            How to Keep Clean Business Records and <span className="text-blue-400">Never Lose Track of Your Money</span> Again
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            A free 30-minute practical training that shows you exactly how to protect your business finances, stop profit leaks, and grow with confidence — starting today.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Clock size={18} className="text-blue-400"/> 30 Minutes</span>
            <span className="hidden md:block">•</span>
            <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-blue-400"/> 100% Free Access</span>
            <span className="hidden md:block">•</span>
            <span className="flex items-center gap-2"><TrendingDown size={18} className="text-blue-400"/> Stop Financial Leaks</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start -mt-10">
        
        {/* LEFT COLUMN: Deep Detail & Copy */}
        <div className="lg:col-span-7 space-y-16">
          
          {/* The Problem */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800">The Hard Truth About Running a Business in Nigeria...</h2>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              You work incredibly hard. You are making sales, dealing with suppliers, and keeping customers happy. But at the end of the month, when you check your account balance, you find yourself asking: <strong>"Where did all the money go?"</strong>
            </p>
            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <XCircle className="text-red-500 shrink-0 mt-1" />
                <p className="text-slate-700">You mix personal and business money, making it impossible to know your true profit.</p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="text-red-500 shrink-0 mt-1" />
                <p className="text-slate-700">You write things down in notebooks that get lost, or use Excel sheets you abandon after two weeks.</p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="text-red-500 shrink-0 mt-1" />
                <p className="text-slate-700">You can't access loans or grants because you have zero clean financial records to show.</p>
              </div>
            </div>
          </div>

          {/* What You Will Learn */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-slate-800">What You Will Discover Inside:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <FolderOpen className="text-brandAccent w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">The 6 Essential Records</h3>
                <p className="text-slate-600 text-sm">Discover the absolute non-negotiable records every serious business owner must keep to survive and thrive.</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <Clock className="text-brandAccent w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">The 15-Minute Rule</h3>
                <p className="text-slate-600 text-sm">Learn a simple daily routine that puts you in total control of your finances without taking up your whole day.</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <AlertTriangle className="text-brandAccent w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Silent Profit Killers</h3>
                <p className="text-slate-600 text-sm">Identify the costly mistakes that are secretly draining your business accounts while you sleep.</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <Lightbulb className="text-brandAccent w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">The WhatsApp Solution</h3>
                <p className="text-slate-600 text-sm">See how modern Nigerian business owners are keeping 100% accurate records simply by sending a WhatsApp message.</p>
              </div>
            </div>
          </div>

          {/* Who is this for? */}
          <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold mb-6">Is This Training For You?</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="text-green-600 shrink-0" /> Fashion designers, boutique owners, and retailers.
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="text-green-600 shrink-0" /> Service providers, consultants, and freelancers.
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="text-green-600 shrink-0" /> Supermarket and pharmacy owners.
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="text-green-600 shrink-0" /> Anyone tired of guessing their monthly profits!
              </li>
            </ul>
          </div>

        </div>

        {/* RIGHT COLUMN: The Registration Form (Sticky) */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100 sticky top-10 z-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800">Get Instant Access</h3>
              <p className="text-slate-500 mt-2 text-sm">Enter your details below to watch the training immediately.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brandAccent focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                  placeholder="e.g. Adaeze"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Best Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brandAccent focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                  placeholder="Where should we send the link?"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brandAccent hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 text-lg transform hover:-translate-y-0.5"
              >
                {loading ? "Processing Securely..." : "🎓 Watch the Free Training →"}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4">
                <ShieldCheck size={14} className="text-green-600"/>
                <span>Your details are safe. No spam. Unsubscribe anytime.</span>
              </div>
            </form>

            {/* Social Proof inside form card */}
            <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 -mx-8 -mb-8 p-8 rounded-b-2xl">
              <div className="flex justify-center gap-1 mb-3 text-yellow-400">
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
              </div>
              <p className="text-sm italic text-slate-700 mb-3 text-center leading-relaxed">
                "This training opened my eyes. I had no idea how much money I was losing. Highly recommended for every Nigerian seller."
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                  A
                </div>
                <p className="text-xs font-bold text-slate-900">Adaeze, Fashion Business Owner, Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="border-t border-slate-200 bg-white py-10 mt-10">
        <div className="max-w-5xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p className="font-semibold text-slate-700 mb-2">Brought to you by Fynax Bookkeeper</p>
          <p>© {new Date().getFullYear()} Fynax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
