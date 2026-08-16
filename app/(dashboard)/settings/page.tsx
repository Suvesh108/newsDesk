'use client'

import { useState } from 'react'
import { Save, User, Key, Bell, Globe, Database } from 'lucide-react'

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Key },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'site', label: 'Site Settings', icon: Globe },
  { id: 'api', label: 'API Keys', icon: Database },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <div className="space-y-6 lg:space-y-10">
      <div>
        <h1 className="text-4xl lg:text-6xl font-black mb-2">Settings</h1>
        <p className="label-mono opacity-100">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {settingsSections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 font-mono text-sm uppercase tracking-wider transition-colors ${
                activeSection === section.id
                  ? 'bg-primary text-on-primary'
                  : 'brutalist-border hover:bg-surface-container'
              }`}
            >
              <section.icon size={16} />
              {section.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 brutalist-border p-8">
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black">Profile Settings</h2>
              <div>
                <label className="label-mono mb-2 block">Display Name</label>
                <input
                  type="text"
                  defaultValue="Eleanor Vance"
                  className="w-full bg-surface-container border border-white/10 p-4 font-display text-xl focus:border-primary outline-none transition-colors"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block">Username</label>
                <input
                  type="text"
                  defaultValue="eleanor"
                  className="w-full bg-surface-container border border-white/10 p-4 font-mono focus:border-primary outline-none transition-colors"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block">Bio</label>
                <textarea
                  defaultValue="Senior technology correspondent covering AI and ethics."
                  className="w-full bg-surface-container border border-white/10 p-4 font-sans focus:border-primary outline-none transition-colors resize-none h-32"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block">Avatar URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full bg-surface-container border border-white/10 p-4 font-mono text-sm focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black">Security Settings</h2>
              <div>
                <label className="label-mono mb-2 block">Current Password</label>
                <input
                  type="password"
                  className="w-full bg-surface-container border border-white/10 p-4 font-mono focus:border-primary outline-none transition-colors"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block">New Password</label>
                <input
                  type="password"
                  className="w-full bg-surface-container border border-white/10 p-4 font-mono focus:border-primary outline-none transition-colors"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full bg-surface-container border border-white/10 p-4 font-mono focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="pt-4">
                <h3 className="font-display text-xl mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-surface-container border border-white/10">
                  <span className="font-mono text-sm">2FA is not enabled</span>
                  <button className="bg-primary text-on-primary px-4 py-2 font-mono text-sm uppercase">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black">Notification Preferences</h2>
              {[
                { label: 'Email notifications for new comments', enabled: true },
                { label: 'Weekly analytics digest', enabled: true },
                { label: 'Article publish confirmations', enabled: false },
                { label: 'SEO improvement suggestions', enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface-container border border-white/10">
                  <span className="font-mono text-sm">{item.label}</span>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      item.enabled ? 'bg-primary' : 'bg-surface-bright'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      item.enabled ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'site' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black">Site Settings</h2>
              <div>
                <label className="label-mono mb-2 block">Site Name</label>
                <input
                  type="text"
                  defaultValue="NewsDesk"
                  className="w-full bg-surface-container border border-white/10 p-4 font-display text-xl focus:border-primary outline-none transition-colors"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block">Site URL</label>
                <input
                  type="text"
                  defaultValue="https://newsdesk.com"
                  className="w-full bg-surface-container border border-white/10 p-4 font-mono focus:border-primary outline-none transition-colors"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block">Default Category</label>
                <select className="w-full bg-surface-container border border-white/10 p-4 font-mono focus:border-primary outline-none transition-colors">
                  <option>Tech</option>
                  <option>Business</option>
                  <option>Politics</option>
                  <option>Science</option>
                  <option>Culture</option>
                  <option>Opinion</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black">API Keys</h2>
              <div className="p-4 bg-surface-container border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="label-mono opacity-100">Anthropic API Key</span>
                  <button className="font-mono text-xs text-primary hover:underline">Regenerate</button>
                </div>
                <div className="font-mono text-sm text-on-surface-variant">sk-ant-****-****-****-****</div>
              </div>
              <div className="p-4 bg-surface-container border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="label-mono opacity-100">Meilisearch Key</span>
                  <button className="font-mono text-xs text-primary hover:underline">Regenerate</button>
                </div>
                <div className="font-mono text-sm text-on-surface-variant">mstr-****-****-****-****</div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-white/10">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-primary text-on-primary px-8 py-4 font-display font-bold uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}