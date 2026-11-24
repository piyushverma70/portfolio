import React, { useState, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
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
      setCaptchaError('Please complete the verification check before submitting.');
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
          subject: `Portfolio Inquiry from ${formState.name}`,
          from_name: 'Piyush Verma Portfolio',
          replyto: formState.email,
          botcheck: '',
          name: formState.name,
          email: formState.email,
          message: formState.message,
          'h-captcha-response': captchaToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#C7F36B', '#FFFFFF', '#171717'],
        });
      } else {
        setCaptchaError(result.message || 'Submission failed. Please email directly.');
      }
    } catch {
      setCaptchaError('Network error. Please email directly to piyushverma5534@gmail.com.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Dark Container Box */}
        <div className="rounded-3xl bg-[#111113] text-[#F5F4F0] p-8 sm:p-12 lg:p-14 border border-white/10 text-left shadow-2xl relative overflow-hidden">
          {/* Section Header Bar */}
          <div className="text-xs font-mono font-bold text-[#737373] tracking-widest mb-1">
            05.
          </div>
          <div className="text-xs font-mono font-bold text-white tracking-widest mb-10 pb-4 border-b border-white/10">
            LET'S CONNECT
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Column: Bold Headline & Dark Wave Graphic */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] mb-4">
                  HAVE SOMETHING<br />
                  <span className="text-[#C7F36B]">INTERESTING</span><br />
                  IN MIND?
                </h2>

                <p className="text-sm text-[#999999] leading-relaxed max-w-md font-normal mb-8">
                  Let's turn an idea into something meaningful.
                </p>
              </div>

              {/* Fluid Dark Wave Graphic */}
              <div className="w-full max-w-xs mt-4 opacity-75">
                <img
                  src="/assets/contact-wave.png"
                  alt="Liquid Wave Graphic"
                  className="w-full h-auto object-contain pointer-events-none"
                />
              </div>
            </div>

            {/* Right Column: Minimal Functional Form */}
            <div className="lg:col-span-6">
              {submitted ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#C7F36B] text-[#171717] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    Message Delivered.
                  </h3>
                  <p className="text-xs text-[#999999] max-w-xs mb-6">
                    Thank you, {formState.name}. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                      setCaptchaToken(null);
                    }}
                    className="px-5 py-2 rounded-full font-display font-semibold text-xs bg-white text-[#171717]"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl bg-[#1D1D21] border border-white/10 focus:border-[#C7F36B] text-sm text-white placeholder-[#737373] outline-none transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-xl bg-[#1D1D21] border border-white/10 focus:border-[#C7F36B] text-sm text-white placeholder-[#737373] outline-none transition-colors"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Your Message"
                      className="w-full px-4 py-3 rounded-xl bg-[#1D1D21] border border-white/10 focus:border-[#C7F36B] text-sm text-white placeholder-[#737373] outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* hCaptcha Verification */}
                  <div className="pt-1">
                    <div className="flex justify-start overflow-hidden">
                      <HCaptcha
                        sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                        onVerify={onCaptchaVerify}
                        onExpire={onCaptchaExpire}
                        ref={captchaRef}
                        theme="dark"
                      />
                    </div>

                    {captchaError && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-[#EF4444] font-mono">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>{captchaError}</span>
                      </div>
                    )}
                  </div>

                  {/* Send Message Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-display font-bold text-xs sm:text-sm bg-[#C7F36B] text-[#171717] hover:bg-[#b8e85c] transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      <span>{loading ? 'Sending...' : 'Send Message'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
