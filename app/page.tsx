"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderOpen, Clock, AlertTriangle, Lightbulb, Star } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <div className="bg-[#0A192F] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Free Training for Nigerian Business Owners
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            How to Keep Clean Business Records and Never Lose Track of Your Money Again
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            A free 30-minute practical training that shows you exactly how to protect your business finances — starting today.
          </p>
        </div>
      </div>

      {/* Content & Form Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: What You Will Learn */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold border-b pb-2 border-slate-200">What You Will Discover:</h2>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <FolderOpen className="text-blue-600 flex-shrink-0 w-8 h-8" />
              <div>
                <strong className="block text-lg">The 6 Essential Records</strong>
                <span className="text-slate-600">Every business owner must keep to survive.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock className="text-blue-600 flex-shrink-0 w-8 h-8" />
              <div>
                <strong className="block text-lg">A Simple 15-Minute Daily Routine</strong>
                <span className="text-slate-600">To stay completely on top of your finances.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <AlertTriangle className="text-blue-600 flex-shrink-0 w-8 h-8" />
              <div>
                <strong className="block text-lg">Costly Profit Mistakes</strong>
                <span className="text-slate-600">That are silently draining your business accounts.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <Lightbulb className="text-blue-600 flex-shrink-0 w-8 h-8" />
              <div>
                <strong className="block text-lg">The Smart Solution</strong>
                <span className="text-slate-600">That makes record-keeping 100% effortless.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Column: Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <h3 className="text-2xl font-bold mb-6 text-center">Get Instant Access Now</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                placeholder="Enter your best email"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 text-lg"
            >
              {loading ? "Processing..." : "🎓 Send Me the Free Training →"}
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">
              Your details are safe. No spam. Unsubscribe anytime.
            </p>
          </form>

          {/* Social Proof */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <div className="flex justify-center gap-1 mb-2 text-yellow-400">
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
            </div>
            <p className="text-sm italic text-slate-600 mb-2">
              "This training opened my eyes. I had no idea how much money I was losing."
            </p>
            <p className="text-xs font-bold text-slate-900">— Adaeze, Fashion Business Owner, Lagos</p>
          </div>
        </div>
      </div>
      
      <footer className="text-center pb-8 text-sm text-slate-500">
        Brought to you by Fynax Bookkeeper
      </footer>
    </div>
  );
}
