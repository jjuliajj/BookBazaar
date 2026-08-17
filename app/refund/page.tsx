import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { RefreshCw, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function RefundPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-[#1A1A1A] font-jakarta">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-4xl text-left">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-[#0C4A60] transition-colors mb-6 uppercase tracking-wider gap-1.5 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header Card */}
          <div className="bg-[#F8F8F7] rounded-xs p-6 md:p-8 border border-neutral-200 shadow-xs mb-8 space-y-3">
            <div className="w-10 h-10 rounded-xs bg-[#0C4A60] text-white flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              Refund & Returns Policy
            </h1>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              14-Day Money-Back Guarantee for Digital Editions
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xs p-6 md:p-8 border border-neutral-200 shadow-xs space-y-8 text-neutral-700 text-sm leading-relaxed">
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-xs p-5 text-emerald-950 space-y-2">
              <h3 className="font-serif text-base font-bold flex items-center gap-2 text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Customer Satisfaction Guarantee
              </h3>
              <p className="text-xs leading-relaxed text-emerald-800">
                At BookBazaar, we ensure all digital EPUB files are tested for readability and formatting integrity. If you encounter any technical issues, our 14-Day Guarantee ensures your purchase is protected.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-neutral-200 pb-2.5">
                1. Eligible Refund Scenarios
              </h2>
              <p>You are eligible for a full refund within <strong>14 days of purchase</strong> if:</p>
              
              <div className="grid md:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#F8F8F7] p-4 rounded-xs border border-neutral-200 space-y-1.5">
                  <div className="font-bold text-[#1A1A1A] text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-[#0C4A60]" /> File Error
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    The EPUB file cannot be rendered or opened on standard e-Readers.
                  </p>
                </div>

                <div className="bg-[#F8F8F7] p-4 rounded-xs border border-neutral-200 space-y-1.5">
                  <div className="font-bold text-[#1A1A1A] text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-[#0C4A60]" /> Formatting Defect
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    The content suffers from severe layout defects or missing chapters.
                  </p>
                </div>

                <div className="bg-[#F8F8F7] p-4 rounded-xs border border-neutral-200 space-y-1.5">
                  <div className="font-bold text-[#1A1A1A] text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-[#0C4A60]" /> Duplicate Order
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    You accidentally completed a duplicate purchase for the same book title.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-neutral-200 pb-2.5">
                2. How to Request a Refund
              </h2>
              <p>To request a refund, simply email our customer desk:</p>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-neutral-600">
                <li>Send an email to <a href="mailto:support@bookbazaar.com" className="text-[#0C4A60] font-bold hover:underline">support@bookbazaar.com</a>.</li>
                <li>Include your <strong>Order Email Address</strong> or <strong>Stripe Transaction ID</strong>.</li>
                <li>Briefly describe the issue.</li>
              </ol>
              <p className="pt-2 text-xs text-neutral-500">
                Refunds are processed within 24 hours back to your original payment card via Stripe.
              </p>
            </section>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

