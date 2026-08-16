'use client'

import { useState } from 'react'
import { Mail, Send, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="max-w-[1440px] mx-auto min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <Mail size={64} className="mx-auto text-primary mb-6" />
            <h1 className="text-[8rem] font-black leading-[0.8] tracking-tighter uppercase mb-4">The Wireframe</h1>
            <p className="text-2xl font-serif opacity-70">
              A weekly dissection of the tech industry&apos;s moves, delivered straight to your inbox.
            </p>
          </div>

          <div className="mb-12 p-8 bg-surface-container border border-white/10">
            <h3 className="font-display text-2xl font-bold mb-6">What You Get</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { title: 'Deep Dives', desc: 'In-depth analysis of the week\'s biggest tech stories' },
                { title: 'AI Insights', desc: 'Exclusive coverage of artificial intelligence developments' },
                { title: 'Market Watch', desc: 'Financial trends and their implications for the industry' },
              ].map((item, i) => (
                <div key={i} className="p-4 border border-white/10">
                  <h4 className="font-display text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-sm opacity-60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-center gap-3 bg-green-500/20 text-green-500 p-8"
              >
                <Check size={24} />
                <span className="font-display text-2xl font-bold">You&apos;re subscribed!</span>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-surface-container border border-white/10 p-6 font-mono text-lg focus:border-primary outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-primary text-on-primary px-10 py-6 font-display font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <Send size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="label-mono mt-8 opacity-60">
            Delivered every Thursday. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  )
}