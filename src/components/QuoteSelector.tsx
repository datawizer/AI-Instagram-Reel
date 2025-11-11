import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Quote, RefreshCw } from 'lucide-react'
import { QuoteType } from '../App'

interface QuoteSelectorProps {
  type: QuoteType
  onQuoteSelect: (quote: string) => void
}

const QuoteSelector: React.FC<QuoteSelectorProps> = ({ type, onQuoteSelect }) => {
  const [quotes, setQuotes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<string>('')

  // Sample quotes for each type (in a real app, these would come from an AI API)
  const sampleQuotes = {
    famous: [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Life is what happens when you're busy making other plans. - John Lennon",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
      "The best way to predict the future is to create it. - Peter Drucker"
    ],
    attitude: [
      "I don't care what you think about me. I don't think about you at all. - Coco Chanel",
      "I am not what happened to me, I am what I choose to become. - Carl Jung",
      "The only person you should try to be better than is the person you were yesterday. - Unknown",
      "I am enough. I have enough. I do enough. - Unknown",
      "My attitude is based on how you treat me. - Unknown"
    ],
    life: [
      "Life is not about waiting for the storm to pass but learning to dance in the rain. - Vivian Greene",
      "The purpose of our lives is to be happy. - Dalai Lama",
      "Life is really simple, but we insist on making it complicated. - Confucius",
      "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
      "Life is either a daring adventure or nothing at all. - Helen Keller"
    ],
    stoicism: [
      "The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius",
      "Waste no more time arguing about what a good man should be. Be one. - Marcus Aurelius",
      "It's not what happens to you, but how you react to it that matters. - Epictetus",
      "The best revenge is not to be like your enemy. - Marcus Aurelius",
      "Choose not to be harmed — and you won't feel harmed. Don't feel harmed — and you haven't been. - Marcus Aurelius"
    ],
    motivation: [
      "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
      "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
      "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
      "The way to get started is to quit talking and begin doing. - Walt Disney",
      "It does not matter how slowly you go as long as you do not stop. - Confucius"
    ],
    wisdom: [
      "The only true wisdom is in knowing you know nothing. - Socrates",
      "Knowledge speaks, but wisdom listens. - Jimi Hendrix",
      "Wisdom comes from experience, and experience comes from mistakes. - Unknown",
      "The fool doth think he is wise, but the wise man knows himself to be a fool. - William Shakespeare",
      "Wisdom is not a product of schooling but of the lifelong attempt to acquire it. - Albert Einstein"
    ]
  }

  const generateQuotes = async () => {
    setLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const typeQuotes = sampleQuotes[type] || []
    const shuffled = [...typeQuotes].sort(() => Math.random() - 0.5)
    setQuotes(shuffled.slice(0, 10))
    setLoading(false)
  }

  useEffect(() => {
    generateQuotes()
  }, [type])

  const handleQuoteSelect = (quote: string) => {
    setSelectedQuote(quote)
    onQuoteSelect(quote)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Quote Options</h3>
        <motion.button
          onClick={generateQuotes}
          disabled={loading}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-white/60">Generating quotes...</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleQuoteSelect(quote)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedQuote === quote
                  ? 'border-primary-500 bg-primary-500/20'
                  : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <p className="text-white/90 text-sm leading-relaxed">{quote}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default QuoteSelector 