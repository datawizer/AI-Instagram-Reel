import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings as SettingsIcon, Key, Eye, EyeOff, Save, X } from 'lucide-react'
import AIService from '../services/AIService'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [useAI, setUseAI] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    if (isOpen) {
      const aiService = AIService.getInstance()
      const savedApiKey = aiService.getAPIKey()
      if (savedApiKey) {
        setApiKey(savedApiKey)
      }
    }
  }, [isOpen])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      const aiService = AIService.getInstance()
      
      if (apiKey.trim()) {
        aiService.setAPIKey(apiKey.trim())
        setSaveMessage('API key saved successfully!')
      } else {
        // Clear API key
        localStorage.removeItem('openai_api_key')
        setSaveMessage('API key cleared. Will use local quotes.')
      }

      // Test API key if provided
      if (apiKey.trim()) {
        try {
          await aiService.generateQuotes('famous', 1, true)
          setSaveMessage('API key saved and tested successfully!')
        } catch (error) {
          setSaveMessage('API key saved but test failed. Will use local quotes as fallback.')
        }
      }
    } catch (error) {
      setSaveMessage('Error saving settings. Please try again.')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handleClose = () => {
    setApiKey('')
    setSaveMessage('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dark-800 border border-white/20 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <SettingsIcon className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-semibold">Settings</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Settings */}
            <div className="space-y-6">
              {/* AI Toggle */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useAI}
                    onChange={(e) => setUseAI(e.target.checked)}
                    className="w-4 h-4 text-primary-500 bg-white/10 border-white/20 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium">Use AI for quote generation</span>
                </label>
                <p className="text-xs text-white/60 mt-1 ml-7">
                  When enabled, will use OpenAI API for dynamic quote generation
                </p>
              </div>

              {/* API Key Input */}
              {useAI && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white/80">
                    OpenAI API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="input-field w-full pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-white/60">
                    Get your API key from{' '}
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:underline"
                    >
                      OpenAI Platform
                    </a>
                  </p>
                </div>
              )}

              {/* Save Message */}
              {saveMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-sm ${
                    saveMessage.includes('Error') 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}
                >
                  {saveMessage}
                </motion.div>
              )}

              {/* Save Button */}
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Settings
                    </>
                  )}
                </button>
                <button
                  onClick={handleClose}
                  className="btn-secondary px-6"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <h3 className="text-sm font-medium text-white/80 mb-2">How it works:</h3>
              <ul className="text-xs text-white/60 space-y-1">
                <li>• With AI: Uses OpenAI to generate unique quotes</li>
                <li>• Without AI: Uses curated local quote database</li>
                <li>• API key is stored locally in your browser</li>
                <li>• Free tier: ~3 requests/minute with OpenAI</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Settings 