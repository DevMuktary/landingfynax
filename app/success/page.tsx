import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const whatsappNumber = "2349161419514";
  const message = encodeURIComponent("Hi, I just watched the training and I am ready to start using Fynax Bookkeeper!");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0A192F] text-center py-10 px-6">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-400 w-16 h-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            🎉 You're In! Your Free Training is Ready
          </h1>
          <p className="text-slate-300 text-lg">
            Watch it now — it's only 30 minutes and it could change how you run your business forever.
          </p>
        </div>

        {/* Video Embed */}
        <div className="aspect-w-16 aspect-h-9 w-full bg-black">
          <iframe 
            src="https://www.youtube.com/embed/krVjVaNmAEY?si=Bi8I9DXanFkYVkdD" 
            title="Fynax Free Training"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-[300px] md:h-[500px]"
          ></iframe>
        </div>

        {/* Call to Action */}
        <div className="p-8 md:p-12 text-center bg-blue-50/50">
          <h2 className="text-2xl font-bold mb-4">
            👇 Ready to Put What You Just Learned Into Action?
          </h2>
          <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
            Meet <strong>Fynax Bookkeeper</strong> — the simplest way to keep clean business records on WhatsApp.
            <br/><br/>
            No app. No spreadsheet. No accountant needed. Just open WhatsApp, tell Fynax what happened in your business today, and it handles the rest.
          </p>

          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center gap-2 w-full md:w-auto bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all text-lg mb-4"
          >
            💬 Start Chatting Fynax on WhatsApp Now →
          </a>
          
          <p className="text-sm text-slate-500 italic block mt-2">
            (It's free to start — no payment required)
          </p>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm font-medium text-slate-600">
              Join hundreds of Nigerian business owners already using Fynax to track their finances with confidence.
            </p>
            <p className="text-xs text-slate-400 mt-4">
              Brought to you by Fynax Bookkeeper
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
