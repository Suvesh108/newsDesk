import { Twitter, Github, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-[1440px] mx-auto flex flex-col">
        <div className="p-6 lg:p-10 grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 border-b border-white/10">
          <div className="col-span-2 md:col-span-4 flex flex-col lg:justify-between gap-6 lg:gap-8">
            <span className="font-display text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none">NewsDesk</span>
            <p className="font-mono text-xs opacity-50 max-w-xs leading-relaxed">
              AI-powered news publishing platform for journalists and solo publishers.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/20 flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all" aria-label="Twitter">
                <Twitter size={14} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/20 flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all" aria-label="GitHub">
                <Github size={14} />
              </a>
              <a href="mailto:hello@newsdesk.com" className="w-8 h-8 border border-white/20 flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all" aria-label="Email">
                <Mail size={14} />
              </a>
            </div>
          </div>
          <div className="md:col-span-2 md:col-start-7 flex flex-col gap-3 lg:gap-4">
            <span className="label-mono">System</span>
            <a href="/search" className="font-display font-bold uppercase text-base lg:text-lg hover:text-primary transition-colors">Search</a>
            <a href="/newsletter" className="font-display font-bold uppercase text-base lg:text-lg hover:text-primary transition-colors">Newsletter</a>
            <a href="/dashboard" className="font-display font-bold uppercase text-base lg:text-lg hover:text-primary transition-colors">Dashboard</a>
          </div>
          <div className="md:col-span-3 flex flex-col gap-3 lg:gap-4">
            <span className="label-mono">Legal</span>
            <a href="/privacy" className="font-display font-bold uppercase text-base lg:text-lg hover:text-primary transition-colors">Privacy</a>
            <a href="/terms" className="font-display font-bold uppercase text-base lg:text-lg hover:text-primary transition-colors">Terms</a>
            <span className="font-display font-bold uppercase text-base lg:text-lg opacity-30">Manifesto</span>
          </div>
        </div>
        <div className="bg-primary text-black px-6 lg:px-10 py-4 lg:py-6 flex flex-col lg:flex-row justify-between items-center gap-2 text-[10px] font-mono uppercase font-black tracking-widest">
          <span>© 2024 NewsDesk editorial group</span>
          <span>Visual Logic v4.0</span>
        </div>
      </div>
    </footer>
  )
}
