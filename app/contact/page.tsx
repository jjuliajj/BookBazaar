"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Clock, ShieldCheck, ArrowLeft, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#1A1A1A] font-jakarta">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-5xl text-left">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-[#0C4A60] transition-colors mb-6 uppercase tracking-wider gap-1.5 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header Card */}
          <div className="bg-[#F8F8F7] rounded-xs p-6 md:p-8 border border-neutral-200 shadow-xs mb-8 space-y-3">
            <div className="w-10 h-10 rounded-xs bg-[#0C4A60] text-white flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              Customer Service & Book Desk
            </h1>
            <p className="text-xs text-neutral-600">
              Have questions about your EPUB download, book orders, or digital catalog editions? Our team is here to assist you promptly.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Information Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#F8F8F7] rounded-xs p-6 border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xs bg-[#0C4A60] text-white flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Direct Support Desk</div>
                    <a href="mailto:support@bookbazaar.com" className="text-xs font-bold text-[#0C4A60] hover:underline">
                      support@bookbazaar.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-neutral-200">
                  <div className="w-9 h-9 rounded-xs bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Response Window</div>
                    <div className="text-xs font-bold text-[#1A1A1A]">Within 24 Hours (7 Days a Week)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-neutral-200">
                  <div className="w-9 h-9 rounded-xs bg-neutral-200 text-neutral-700 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">SSL Security</div>
                    <div className="text-xs font-bold text-[#1A1A1A]">256-Bit Encrypted Communications</div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Card */}
              <div className="bg-[#1A1A1A] text-white rounded-xs p-5 shadow-xs border border-neutral-800 space-y-2">
                <h3 className="font-serif text-base font-bold flex items-center gap-2 text-white">
                  <MessageSquare className="w-4 h-4 text-emerald-400" /> Fast Order Assistance
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Need a replacement download link? Please include your order email address or transaction ID for expedited processing within 24 hours.
                </p>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xs p-6 md:p-8 border border-neutral-200 shadow-xs">
                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">Message Sent Successfully</h3>
                    <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting BookBazaar. Our support desk has received your request and will reply to <strong>{formData.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#0C4A60] hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-neutral-200 pb-2.5">
                      Send a Message to our Editorial Desk
                    </h2>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-600 mb-1">Your Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Arthur Conan Doyle"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-neutral-300 rounded-xs px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0C4A60] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-600 mb-1">Your Email</label>
                        <input
                          required
                          type="email"
                          placeholder="arthur@bazaar.co.uk"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-neutral-300 rounded-xs px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0C4A60] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">Subject</label>
                      <input
                        required
                        type="text"
                        placeholder="Order Inquiry / EPUB Download Assistance"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white border border-neutral-300 rounded-xs px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0C4A60] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1">Message</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="How can we assist you today? Please include order details if applicable..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-neutral-300 rounded-xs px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0C4A60] transition-colors resize-y leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0C4A60] hover:bg-[#083344] text-white py-3 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message to Support</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

