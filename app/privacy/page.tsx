import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, Eye, Database, Mail } from "lucide-react";

export default function PrivacyPage() {
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
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              Privacy & Security Policy
            </h1>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              UK & International Data Protection Standards • GDPR Compliant
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xs p-6 md:p-8 border border-neutral-200 shadow-xs space-y-8 text-neutral-700 text-sm leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2 border-b border-neutral-200 pb-2.5">
                <Database className="w-4 h-4 text-[#0C4A60]" /> 1. Information We Collect
              </h2>
              <p>
                At <strong>BookBazaar Ltd</strong>, we collect only the essential personal information required to process your bookstore orders and deliver your purchased digital EPUB files:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
                <li><strong>Customer Contact Details:</strong> Email address (used strictly for order confirmation and EPUB download link delivery).</li>
                <li><strong>Billing Information:</strong> Name, billing address (used for secure credit card fraud prevention verification).</li>
                <li><strong>Transaction History:</strong> Details of purchased titles, order timestamps, and payment transaction IDs.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2 border-b border-neutral-200 pb-2.5">
                <Lock className="w-4 h-4 text-[#0C4A60]" /> 2. Payment Card Security (PCI-DSS Level 1)
              </h2>
              <p>
                We prioritize your financial security. All credit card, debit card, Apple Pay, and Google Pay transactions are encrypted and processed through <strong>Stripe Payment Gateway</strong>. 
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xs p-4 text-xs text-emerald-900 font-medium">
                <strong>Zero Card Storage Guarantee:</strong> BookBazaar does not store, transmit, or have access to your full credit card numbers. All payment data is tokenized securely via Stripe.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2 border-b border-neutral-200 pb-2.5">
                <Eye className="w-4 h-4 text-[#0C4A60]" /> 3. Zero Data Sale Commitment
              </h2>
              <p>
                We maintain a strict privacy policy. We <strong>never sell, rent, trade, or share</strong> your email address or personal details with third-party marketers or advertisers under any circumstances.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2 border-b border-neutral-200 pb-2.5">
                <Mail className="w-4 h-4 text-[#0C4A60]" /> 4. Customer Support
              </h2>
              <p>
                To exercise any data privacy rights or request order assistance, simply reach out to our team at <a href="mailto:support@bookbazaar.com" className="text-[#0C4A60] font-bold hover:underline">support@bookbazaar.com</a>.
              </p>
            </section>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

