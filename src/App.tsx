import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Download, Play, Settings, Quote, Heart, Brain, Sun, Moon, Zap, Key } from 'lucide-react'
import QuoteSelector from './components/QuoteSelector'
import ReelGenerator from './components/ReelGenerator'
import ProgressBar from './components/ProgressBar'
import SettingsModal from './components/Settings'
import AIService, { AIQuoteResponse } from './services/AIService'

export type QuoteType = 'famous' | 'attitude' | 'life' | 'stoicism' | 'motivation' | 'wisdom'

export interface QuoteConfig {
  type: QuoteType
  count: number
  duration: number
  fontSize: number
  fontFamily: string
}

function App() {
  const [config, setConfig] = useState<QuoteConfig>({
    type: 'famous',
    count: 5,
    duration: 10,
    fontSize: 48,
    fontFamily: 'Poppins'
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedReels, setGeneratedReels] = useState<string[]>([])

  const quoteTypes = [
    { id: 'famous', label: 'Famous Quotes', icon: Quote, color: 'from-blue-500 to-purple-600' },
    { id: 'attitude', label: 'Attitude Quotes', icon: Heart, color: 'from-red-500 to-pink-600' },
    { id: 'life', label: 'Life Quotes', icon: Sun, color: 'from-yellow-500 to-orange-600' },
    { id: 'stoicism', label: 'Stoicism', icon: Brain, color: 'from-gray-500 to-slate-600' },
    { id: 'motivation', label: 'Motivation', icon: Zap, color: 'from-green-500 to-emerald-600' },
    { id: 'wisdom', label: 'Wisdom', icon: Sparkles, color: 'from-indigo-500 to-blue-600' }
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    setProgress(0)
    setGeneratedReels([])
    
    try {
      const reels = await ReelGenerator.generateReels(config, setProgress)
      setGeneratedReels(reels)
    } catch (error) {
      console.error('Error generating reels:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-8"
      >
        <div className="text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            AI Reel Generator
          </motion.h1>
          <motion.p 
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Create stunning Instagram reels with AI-powered quotes. Generate up to 50 reels with beautiful animations and modern design.
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="card sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-semibold">Configuration</h2>
              </div>

              {/* Quote Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Quote Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {quoteTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <motion.button
                        key={type.id}
                        onClick={() => setConfig(prev => ({ ...prev, type: type.id as QuoteType }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          config.type === type.id
                            ? 'border-primary-500 bg-gradient-to-r ' + type.color
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5 mb-2 mx-auto" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Number of Reels */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Number of Reels (1-50)
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={config.count}
                  onChange={(e) => setConfig(prev => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
                  className="input-field w-full"
                />
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  min="5"
                  max="30"
                  value={config.duration}
                  onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) || 10 }))}
                  className="input-field w-full"
                />
              </div>

              {/* Font Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Font Size
                </label>
                <input
                  type="range"
                  min="24"
                  max="72"
                  value={config.fontSize}
                  onChange={(e) => setConfig(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-sm text-white/60 mt-2">
                  {config.fontSize}px
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isGenerating ? { scale: 1.02 } : {}}
                whileTap={!isGenerating ? { scale: 0.98 } : {}}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Generate Reels
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Preview and Results */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            {/* Progress Bar */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card mb-6"
                >
                  <ProgressBar progress={progress} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generated Reels */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <Download className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-semibold">Generated Reels</h2>
              </div>

              {generatedReels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedReels.map((reel, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group"
                    >
                      <video
                        src={reel}
                        className="w-full rounded-xl shadow-lg"
                        controls
                        loop
                      />
                      <motion.button
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          const link = document.createElement('a')
                          link.href = reel
                          link.download = `reel-${index + 1}.mp4`
                          link.click()
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sparkles className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60 text-lg">
                    {isGenerating 
                      ? 'Generating your reels...' 
                      : 'Configure your settings and click "Generate Reels" to get started'
                    }
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default App 