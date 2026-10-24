import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { COLLEGE_NAME } from '../data/collegeData';
import { validateContactForm } from '../utils/quiz';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'CS',
    message: '',
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData.name, formData.email, formData.message);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        department: 'CS',
        message: '',
      });
    }, 700);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMUNICATION PORTAL // REACH OUT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Contact & Inquiries
          </h2>
          <p className="text-base text-slate-300">
            Have questions regarding the Department of Computer Science or Department of Computer Applications? Connect with our digital desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left 5 Cols: College Info & Verification */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 border-cyan-500/20 space-y-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2 text-cyan-400 font-mono text-xs">
                <Building2 className="w-4 h-4" />
                <span>OFFICIAL COLLEGE IDENTITY</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Madha Arts and Science College (MASC)
              </h3>
              <p className="text-xs text-cyan-400 font-mono">
                Kundrathur, Chennai - 600 128, Tamil Nadu
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-1">Official College Address</span>
                  <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                    Madha Nagar, Somangalam Road,<br />
                    Erandamkattalai, Sadhanandhapuram,<br />
                    Thandalam Post (Near Kovur / Kundrathur),<br />
                    Chennai - 600 128, Tamil Nadu, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-1">Departments Hosted</span>
                  <span className="text-[11px] text-slate-300">
                    • Department of Computer Science (B.Sc CS)<br />
                    • Department of Computer Applications (BCA)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="text-emerald-400 block font-semibold mb-0.5">TRANSIT LANDMARKS</span>
                ~7.7 km from Chennai International Airport • Near Kovur Church & Anakaputhur Bus Stop
              </div>
            </div>

            {/* Demo Notice Badge */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
              <strong className="block text-cyan-300 mb-1 font-mono uppercase">
                C² Tech Interactive Desk
              </strong>
              This web contact console operates in client-side demonstration mode. All form validations run in real time, and inquiries are recorded locally in state.
            </div>
          </div>

          {/* Right 7 Cols: Contact Form */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border-purple-500/20 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-10 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Dispatched!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto mb-6">
                  Thank you for testing the C² Tech contact portal. Your simulated transmission has been successfully validated and recorded.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sreejith R."
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-400'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-400 font-mono mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 font-mono mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-department" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Department of Interest
                  </label>
                  <select
                    id="contact-department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="CS">Department of Computer Science (B.Sc CS)</option>
                    <option value="CA">Department of Computer Applications (BCA)</option>
                    <option value="Both">General / Both Computing Departments</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Message / Inquiry *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Inquire about curriculum, laboratory facilities, or computing workshops..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-400'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 font-mono mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Inquiries...' : 'Transmit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
