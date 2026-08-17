import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, FileText, Lock, ArrowLeft, BookOpen } from "lucide-react";

export default function TermsPage() {
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
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              Terms of Service
            </h1>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              BookBazaar Digital Rights & Content Agreement
            </p>
          </div>

          {/* Main Terms Content */}
          <div className="bg-white rounded-xs p-6 md:p-8 border border-neutral-200 shadow-xs space-y-8 text-neutral-700 text-sm leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2 border-b border-neutral-200 pb-2.5">
                <BookOpen className="w-4 h-4 text-[#0C4A60]" /> 1. Digital Copyright & Ownership
              </h2>
              <p>
                All digital books, EPUB files, cover art, and editorial literature available on <strong>BookBazaar</strong> are protected by international copyright laws. All titles remain the intellectual property of their respective authors and publishing houses.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2 border-b border-neutral-200 pb-2.5">
                <Lock className="w-4 h-4 text-[#0C4A60]" /> 2. Personal Non-Transferable License
              </h2>
              <p>
                Upon purchasing a book from BookBazaar, you are granted a single-user, non-exclusive, DRM-free personal license to download, read, and store the digital file on your personal devices (e-Readers, tablets, laptops, phones).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2 border-b border-neutral-200 pb-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0C4A60]" /> 3. Instant Digital Delivery
              </h2>
              <p>
                Purchases are confirmed immediately via our Stripe payment gateway with direct EPUB access delivered to your screen and email inbox.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2 border-b border-neutral-200 pb-2.5">
                4. Customer Assistance
              </h2>
              <p>
                If you have questions regarding these terms, please contact our support desk at <a href="mailto:support@bookbazaar.com" className="text-[#0C4A60] font-bold hover:underline">support@bookbazaar.com</a>.
              </p>
            </section>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

