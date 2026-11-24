import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Mail, MessageSquare, ShieldAlert } from 'lucide-react';
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
    'Full-Stack Web App',
    'Landing Page',
    '3D Interactive Feature',
    'Custom eCommerce',
    'Website Redesign',
    'Frontend & UI Design',
  ];

  const budgetOptions = [
    '$1,000 - $3,000',
    '$3,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000+',
  ];

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      setSelectedServices(selectedServices.filter((s) => s !== svc));
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

    // Verify hCaptcha first
    if (!captchaToken) {
      setCaptchaError('Please complete the hCaptcha check before sending your message.');
      return;
    }

    setLoading(true);
    setCaptchaError(null);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '1306ed5e-2fb7-41a0-99bf-58eed56de7d2';

    try {
      if (accessKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Client Inquiry from ${formState.name}`,
            from_name: 'Portfolio Contact Form',
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
        if (!result.success) {
          console.warn('Web3Forms returned an error:', result);
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setLoading(false);
      setSubmitted(true);

      // Confetti celebration
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#C86A4B', '#2D5A3C', '#EADCC9'],
      });
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setLoading(false);
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormState({ name: '', email: '', message: '' });
    setCaptchaToken(null);
    setCaptchaError(null);
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
    }
  };

  const siteKey = import.meta.env.VITE_HCAPTCHA_SITEKEY || '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 overflow-hidden border-t border-black/5">
      {/* Background soft ambient warm radial */}
      <div className="absolute right-1/4 top-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-[#FCE8DD]/40 via-[#E2ECE4]/30 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 45, damping: 16 }}
            className="lg:col-span-5 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1ECE4] border border-black/5 text-xs font-mono text-[#52525B] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86A4B]" />
              <span>GET IN TOUCH</span>
            </div>

            <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight leading-tight mb-5 sm:mb-6">
              Let's Build Something Great Together.
            </h2>

            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed mb-6 sm:mb-8">
              Got an idea for a website, an ecommerce store to launch, or need a redesign that loads faster? Drop me a message and let's discuss how we can make it happen.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-comfort-card flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E2ECE4] text-[#2D5A3C] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] sm:text-xs font-mono text-[#71717A] uppercase">Direct Email</div>
                  <a
                    href="mailto:piyushverma5534@gmail.com"
                    className="text-xs sm:text-sm font-semibold text-[#18181B] hover:text-[#C86A4B] transition-colors break-all"
                  >
                    piyushverma5534@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-3xl bg-comfort-card flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FCE8DD] text-[#8C4A32] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-mono text-[#71717A] uppercase">Response Time</div>
                  <div className="text-xs sm:text-sm font-semibold text-[#18181B]">Usually within a few hours (IST)</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 45, damping: 16 }}
            className="lg:col-span-7 p-6 sm:p-8 lg:p-10 rounded-3xl bg-comfort-card text-left overflow-hidden"
          >
            {submitted ? (
              <div className="py-12 sm:py-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#E2ECE4] border border-[#D5E3D8] flex items-center justify-center mb-6 text-[#2D5A3C]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-['Syne'] font-extrabold text-2xl text-[#18181B] mb-2">
                  Thanks for reaching out!
                </h3>
                <p className="text-[#71717A] text-sm max-w-md">
                  Hey <span className="text-[#18181B] font-semibold">{formState.name}</span>, I received your note about <span className="text-[#18181B] font-medium">{selectedServices.join(', ')}</span>. I'll read through your requirements and reply directly to <span className="text-[#18181B]">{formState.email}</span> within a few hours.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-8 px-6 py-2.5 rounded-full text-xs font-mono uppercase bg-[#F1ECE4] hover:bg-[#E8E1D5] text-[#18181B] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* 1. Services selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#71717A] mb-3">
                    1. What can I build for you?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {servicesList.map((svc) => {
                      const active = selectedServices.includes(svc);
                      return (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => toggleService(svc)}
                          className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl text-xs font-mono transition-all cursor-pointer ${
                            active
                              ? 'bg-[#18181B] text-[#FAF8F5] font-semibold shadow-sm'
                              : 'bg-[#FAF8F5] border border-black/5 text-[#52525B] hover:border-black/15'
                          }`}
                        >
                          {active ? '✓ ' : '+ '}
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget Scope */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#71717A] mb-3">
                    2. Target Scope
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setSelectedBudget(b)}
                        className={`px-3 py-2.5 rounded-2xl text-xs font-mono transition-all cursor-pointer text-center ${
                          selectedBudget === b
                            ? 'bg-[#18181B] text-[#FAF8F5] font-semibold shadow-sm'
                            : 'bg-[#FAF8F5] border border-black/5 text-[#52525B] hover:border-black/15'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#71717A] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Piyush / Rahul / Sarah"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-black/10 text-[#18181B] text-sm placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#71717A] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-black/10 text-[#18181B] text-sm placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#71717A] mb-2">
                    Project Vision &amp; Goals
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me a bit about what you want to build, what you like, or your target timeline..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-black/10 text-[#18181B] text-sm placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-all resize-none"
                  />
                </div>

                {/* 4. hCaptcha Security Widget */}
                <div className="pt-2 pb-1">
                  <div className="flex flex-col items-center sm:items-start w-full">
                    <div className="overflow-x-auto max-w-full rounded-2xl border border-black/5 p-1 bg-[#FAF8F5]/80 flex justify-center">
                      <HCaptcha
                        sitekey={siteKey}
                        onVerify={onCaptchaVerify}
                        onExpire={onCaptchaExpire}
                        ref={captchaRef}
                        theme="light"
                      />
                    </div>

                    {captchaError && (
                      <div className="flex items-center gap-2 mt-2.5 text-xs text-[#C86A4B] font-medium text-center sm:text-left">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>{captchaError}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm bg-[#18181B] text-[#FAF8F5] hover:bg-[#3F3F46] shadow-[0_12px_28px_-6px_rgba(24,24,27,0.25)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Project Note</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
