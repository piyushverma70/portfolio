import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Full-Stack Web App']);
  const [selectedBudget, setSelectedBudget] = useState<string>('$3,000 - $5,000');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const captchaRef = useRef<HCaptcha>(null);

  const servicesList = [
    'Interface Design',
    'Full-Stack Web App',
    '3D Interactive Feature',
    'E-Commerce Store',
    'Complete Redesign',
  ];

  const budgetOptions = [
    '$1,500 - $3,000',
    '$3,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000+',
  ];

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const onCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setCaptchaError(null);
  };

  const onCaptchaExpire = () => {
    setCaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setCaptchaError('Please complete the verification check below before submitting.');
      return;
    }

    setLoading(true);
    setCaptchaError(null);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '1306ed5e-2fb7-41a0-99bf-58eed56de7d2';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Digital Atelier Inquiry from ${formState.name}`,
          from_name: 'Piyush Verma Atelier Form',
          replyto: formState.email,
          botcheck: '',
          name: formState.name,
          email: formState.email,
          services: selectedServices.join(', '),
          budget: selectedBudget,
          message: formState.message,
          'h-captcha-response': captchaToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C7F36B', '#171717', '#FFFFFF'],
        });
      } else {
        setCaptchaError(result.message || 'Submission failed. Please email directly.');
      }
    } catch {
      setCaptchaError('Network communication error. Please email directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-10 border-t border-black/8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          {/* Left Column: Memorable Editorial Closing Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 text-[11px] font-mono text-[#171717] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]" />
                <span>05 / INITIATE CONTACT</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#171717] tracking-tight leading-[1.05] mb-6">
                HAVE SOMETHING <br />
                <span className="font-serif-editorial italic font-normal text-[#171717]">
                  INTERESTING
                </span> <br />
                IN MIND?
              </h2>

              <p className="text-base text-[#737373] leading-relaxed mb-8 max-w-md font-normal">
                Let's turn an idea into something meaningful. Tell me about your product, project timeline, and vision.
              </p>

              {/* Direct Communication Channels */}
              <div className="space-y-4 pt-6 border-t border-black/8 mb-8">
                <div>
                  <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                    DIRECT EMAIL
                  </div>
                  <a
                    href="mailto:piyushverma5534@gmail.com"
                    className="font-display font-medium text-base sm:text-lg text-[#171717] hover:text-[#737373] transition-colors flex items-center gap-2"
                  >
                    <span>piyushverma5534@gmail.com</span>
                    <ArrowUpRight className="w-4 h-4 text-[#737373]" />
                  </a>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                    CODE REPOSITORY
                  </div>
                  <a
                    href="https://github.com/piyushverma70"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-medium text-base sm:text-lg text-[#171717] hover:text-[#737373] transition-colors flex items-center gap-2"
                  >
                    <span>github.com/piyushverma70</span>
                    <ArrowUpRight className="w-4 h-4 text-[#737373]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/8 text-xs font-mono text-[#737373]">
              <div className="flex items-center gap-2 text-[#171717] font-semibold mb-1">
                <span className="w-2 h-2 rounded-full bg-[#C7F36B] animate-pulse" />
                <span>Response Time Commitment</span>
              </div>
              <div>I typically review and reply to inquiries within 24 business hours.</div>
            </div>
          </motion.div>

          {/* Right Column: High-Craft Functional Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="atelier-card rounded-3xl p-6 sm:p-10 bg-white">
              {submitted ? (
                <div className="py-12 sm:py-16 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#C7F36B] text-[#171717] flex items-center justify-center mb-6 shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#171717] mb-2">
                    Inquiry Received.
                  </h3>
                  <p className="text-sm text-[#737373] max-w-sm mb-8 leading-relaxed">
                    Thank you, {formState.name}. Your details have reached my inbox. I will review your requirements and follow up with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                      setCaptchaToken(null);
                    }}
                    className="px-6 py-2.5 rounded-xl font-display font-semibold text-xs bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-3">
                      I'M LOOKING FOR ASSISTANCE WITH:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {servicesList.map((svc) => {
                        const isSelected = selectedServices.includes(svc);
                        return (
                          <button
                            type="button"
                            key={svc}
                            onClick={() => toggleService(svc)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#171717] text-[#C7F36B] font-semibold'
                                : 'bg-[#F5F4F0] text-[#737373] hover:text-[#171717] hover:bg-[#EBE9E4]'
                            }`}
                          >
                            {svc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-3">
                      ANTICIPATED PROJECT BUDGET:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setSelectedBudget(b)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                            selectedBudget === b
                              ? 'bg-[#171717] text-[#C7F36B] font-semibold'
                              : 'bg-[#F5F4F0] text-[#737373] hover:text-[#171717] hover:bg-[#EBE9E4]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-2">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F4F0] border border-black/8 focus:border-[#171717] focus:bg-white text-sm text-[#171717] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-2">
                        YOUR EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F4F0] border border-black/8 focus:border-[#171717] focus:bg-white text-sm text-[#171717] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-2">
                      PROJECT OVERVIEW &amp; TIMELINE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about what you're building, target launch dates, or links to references..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F4F0] border border-black/8 focus:border-[#171717] focus:bg-white text-sm text-[#171717] outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* hCaptcha Container */}
                  <div className="pt-2">
                    <div className="flex justify-start overflow-hidden">
                      <HCaptcha
                        sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                        onVerify={onCaptchaVerify}
                        onExpire={onCaptchaExpire}
                        ref={captchaRef}
                      />
                    </div>

                    {captchaError && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-[#DC2626] font-mono">
                        <ShieldAlert className="w-4 h-4" />
                        <span>{captchaError}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-display font-semibold text-sm bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Sending Encrypted Message...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
