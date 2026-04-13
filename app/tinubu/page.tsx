
import { PrismaClient } from '@prisma/client';
import { 
  Users, 
  Eye, 
  PlayCircle, 
  MailOpen, 
  Mail, 
  Percent,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

// This forces Next.js to always fetch fresh data when you refresh the page
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  // 1. Fetch raw data from the database
  const landingVisits = await prisma.pageVisit.count({ where: { path: '/' } });
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });

  // 2. Calculate aggregations
  const totalLeads = leads.length;
  const totalVideoViews = leads.filter(l => l.videoWatched).length;
  const totalEmailsSent = leads.reduce((sum, l) => sum + l.emailsSent, 0);
  const totalEmailsOpened = leads.reduce((sum, l) => sum + l.emailsOpened, 0);

  // 3. Calculate conversion rates
  const conversionRate = landingVisits > 0 ? Math.round((totalLeads / landingVisits) * 100) : 0;
  const videoWatchRate = totalLeads > 0 ? Math.round((totalVideoViews / totalLeads) * 100) : 0;
  const openRate = totalEmailsSent > 0 ? Math.round((totalEmailsOpened / totalEmailsSent) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F0F4FA] font-sans text-slate-900 pb-20">
      
      {/* --- TOP NAV --- */}
      <nav className="bg-[#042C53] px-8 py-5 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#3b82f6] rounded flex items-center justify-center">
            <TrendingUp size={18} className="text-white" />
          </div>
          <span className="text-lg font-medium text-white tracking-tight">Fynax Analytics</span>
        </div>
        <div className="text-sm text-blue-200">
          Live Database Connection
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">Funnel Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time metrics from your landing page and email sequence.</p>
        </div>

        {/* --- KPI STAT CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* Card 1: Visitors */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Eye size={20} className="text-slate-600" />
              </div>
            </div>
            <h3 className="text-3xl font-semibold text-slate-900 mb-1">{landingVisits}</h3>
            <p className="text-sm text-slate-500 font-medium">Total Landing Page Visits</p>
          </div>

          {/* Card 2: Leads */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-blue-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <Percent size={12} /> {conversionRate}% conv.
              </div>
            </div>
            <h3 className="text-3xl font-semibold text-slate-900 mb-1">{totalLeads}</h3>
            <p className="text-sm text-slate-500 font-medium">Total Form Submits</p>
          </div>

          {/* Card 3: Video Views */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <PlayCircle size={20} className="text-red-500" />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                {videoWatchRate}% watched
              </div>
            </div>
            <h3 className="text-3xl font-semibold text-slate-900 mb-1">{totalVideoViews}</h3>
            <p className="text-sm text-slate-500 font-medium">Video Plays</p>
          </div>

          {/* Card 4: Email Opens */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <MailOpen size={20} className="text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                {openRate}% open rate
              </div>
            </div>
            <h3 className="text-3xl font-semibold text-slate-900 mb-1">{totalEmailsOpened} <span className="text-lg text-slate-400 font-normal">/ {totalEmailsSent}</span></h3>
            <p className="text-sm text-slate-500 font-medium">Emails Opened vs Sent</p>
          </div>

        </div>

        {/* --- DETAILED LEADS TABLE --- */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-900">Recent Registrations</h2>
            <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
              Showing all {totalLeads} leads
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 bg-white">
                  <th className="px-6 py-4 font-semibold">User Details</th>
                  <th className="px-6 py-4 font-semibold text-center">Video Watched</th>
                  <th className="px-6 py-4 font-semibold text-center">Emails Sent</th>
                  <th className="px-6 py-4 font-semibold text-center">Emails Opened</th>
                  <th className="px-6 py-4 font-semibold text-right">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No registrations yet. Send some traffic to your landing page!
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{lead.firstName}</div>
                        <div className="text-sm text-slate-500">{lead.email}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {lead.videoWatched ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                            <CheckCircle2 size={12} /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                            Waiting
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-medium text-slate-700">{lead.emailsSent}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-medium text-slate-700">{lead.emailsOpened}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-sm text-slate-600">
                          {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
