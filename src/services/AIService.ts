import axios from 'axios'
import { QuoteType } from '../App'

export interface AIQuoteResponse {
  quote: string
  author?: string
  category: QuoteType
}

class AIService {
  private static instance: AIService
  private apiKey: string | null = null
  private useLocalFallback: boolean = true

  private constructor() {
    // Try to get API key from environment or localStorage
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || 
                  localStorage.getItem('openai_api_key') || 
                  null
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  setAPIKey(apiKey: string): void {
    this.apiKey = apiKey
    localStorage.setItem('openai_api_key', apiKey)
  }

  getAPIKey(): string | null {
    return this.apiKey
  }

  // Generate quotes using OpenAI API
  async generateQuotesWithOpenAI(type: QuoteType, count: number = 5): Promise<AIQuoteResponse[]> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not found. Please set your API key in settings.')
    }

    try {
      const prompt = this.getPromptForType(type)
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a quote generator. Generate inspiring, meaningful quotes that are perfect for Instagram reels. Each quote should be concise, impactful, and include the author name at the end.'
            },
            {
              role: 'user',
              content: `${prompt} Generate exactly ${count} quotes. Format each quote as: "Quote text - Author Name"`
            }
          ],
          max_tokens: 500,
          temperature: 0.8
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const content = response.data.choices[0].message.content
      const quotes = this.parseQuotesFromResponse(content, type)
      return quotes.slice(0, count)
    } catch (error) {
      console.error('OpenAI API error:', error)
      if (this.useLocalFallback) {
        return this.generateLocalQuotes(type, count)
      }
      throw error
    }
  }

  // Generate quotes using Hugging Face (free alternative)
  async generateQuotesWithHuggingFace(type: QuoteType, count: number = 5): Promise<AIQuoteResponse[]> {
    try {
      const prompt = this.getPromptForType(type)
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/gpt2',
        {
          inputs: `${prompt} Generate ${count} quotes:`,
          parameters: {
            max_length: 200,
            temperature: 0.8,
            num_return_sequences: count
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY || 'hf_demo'}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const quotes = response.data.map((item: any) => ({
        quote: item.generated_text,
        author: 'AI Generated',
        category: type
      }))

      return quotes.slice(0, count)
    } catch (error) {
      console.error('Hugging Face API error:', error)
      if (this.useLocalFallback) {
        return this.generateLocalQuotes(type, count)
      }
      throw error
    }
  }

  // Local quote generation (fallback)
  generateLocalQuotes(type: QuoteType, count: number = 5): AIQuoteResponse[] {
    const localQuotes = {
      famous: [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Life is what happens when you're busy making other plans. - John Lennon",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
        "The best way to predict the future is to create it. - Peter Drucker",
        "Be the change you wish to see in the world. - Mahatma Gandhi",
        "The journey of a thousand miles begins with one step. - Lao Tzu",
        "Everything you've ever wanted is on the other side of fear. - George Addair",
        "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt"
      ],
      attitude: [
        "I don't care what you think about me. I don't think about you at all. - Coco Chanel",
        "I am not what happened to me, I am what I choose to become. - Carl Jung",
        "The only person you should try to be better than is the person you were yesterday. - Unknown",
        "I am enough. I have enough. I do enough. - Unknown",
        "My attitude is based on how you treat me. - Unknown",
        "I'm not perfect, but I'm limited edition. - Unknown",
        "I don't need your approval to be me. - Unknown",
        "I'm not arrogant, I'm confident. There's a difference. - Unknown",
        "I'm not lazy, I'm conserving energy. - Unknown",
        "I'm not bossy, I'm the boss. - Unknown"
      ],
      life: [
        "Life is not about waiting for the storm to pass but learning to dance in the rain. - Vivian Greene",
        "The purpose of our lives is to be happy. - Dalai Lama",
        "Life is really simple, but we insist on making it complicated. - Confucius",
        "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
        "Life is either a daring adventure or nothing at all. - Helen Keller",
        "The good life is one inspired by love and guided by knowledge. - Bertrand Russell",
        "Life is what we make it, always has been, always will be. - Grandma Moses",
        "Life is a succession of lessons which must be lived to be understood. - Helen Keller",
        "Life is a beautiful struggle. - Unknown",
        "Life is short, make it sweet. - Unknown"
      ],
      stoicism: [
        "The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius",
        "Waste no more time arguing about what a good man should be. Be one. - Marcus Aurelius",
        "It's not what happens to you, but how you react to it that matters. - Epictetus",
        "The best revenge is not to be like your enemy. - Marcus Aurelius",
        "Choose not to be harmed — and you won't feel harmed. Don't feel harmed — and you haven't been. - Marcus Aurelius",
        "The mind adapts and converts to its own purposes the obstacle to our acting. - Marcus Aurelius",
        "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment. - Marcus Aurelius",
        "The first wealth is health. - Ralph Waldo Emerson",
        "He who has a why to live can bear almost any how. - Friedrich Nietzsche",
        "The obstacle is the way. - Marcus Aurelius"
      ],
      motivation: [
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
        "The way to get started is to quit talking and begin doing. - Walt Disney",
        "It does not matter how slowly you go as long as you do not stop. - Confucius",
        "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
        "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
        "Don't limit your challenges. Challenge your limits. - Unknown",
        "The harder you work for something, the greater you'll feel when you achieve it. - Unknown",
        "Dream big and dare to fail. - Norman Vaughan"
      ],
      wisdom: [
        "The only true wisdom is in knowing you know nothing. - Socrates",
        "Knowledge speaks, but wisdom listens. - Jimi Hendrix",
        "Wisdom comes from experience, and experience comes from mistakes. - Unknown",
        "The fool doth think he is wise, but the wise man knows himself to be a fool. - William Shakespeare",
        "Wisdom is not a product of schooling but of the lifelong attempt to acquire it. - Albert Einstein",
        "The more you know, the more you realize you don't know. - Aristotle",
        "Wisdom begins in wonder. - Socrates",
        "The wise man learns more from his enemies than the fool from his friends. - Baltasar Gracian",
        "Wisdom is the reward you get for a lifetime of listening when you'd have preferred to talk. - Doug Larson",
        "The greatest wisdom is in simplicity. - Unknown"
      ]
    }

    const quotes = localQuotes[type] || localQuotes.famous
    const shuffled = [...quotes].sort(() => Math.random() - 0.5)
    
    return shuffled.slice(0, count).map(quote => ({
      quote,
      author: quote.split(' - ')[1] || 'Unknown',
      category: type
    }))
  }

  // Main method to generate quotes (tries AI first, falls back to local)
  async generateQuotes(type: QuoteType, count: number = 5, useAI: boolean = true): Promise<AIQuoteResponse[]> {
    if (useAI && this.apiKey) {
      try {
        return await this.generateQuotesWithOpenAI(type, count)
      } catch (error) {
        console.warn('AI generation failed, falling back to local quotes:', error)
        return this.generateLocalQuotes(type, count)
      }
    } else if (useAI) {
      try {
        return await this.generateQuotesWithHuggingFace(type, count)
      } catch (error) {
        console.warn('Hugging Face generation failed, falling back to local quotes:', error)
        return this.generateLocalQuotes(type, count)
      }
    }
    
    return this.generateLocalQuotes(type, count)
  }

  private getPromptForType(type: QuoteType): string {
    const prompts = {
      famous: "Generate famous inspirational quotes from well-known historical figures, celebrities, and thought leaders.",
      attitude: "Generate bold, confident attitude quotes that show self-assurance and independence.",
      life: "Generate wisdom quotes about living life to the fullest, finding happiness, and making the most of every moment.",
      stoicism: "Generate stoic philosophy quotes about resilience, inner peace, and controlling what you can control.",
      motivation: "Generate motivational quotes that inspire action, perseverance, and personal growth.",
      wisdom: "Generate deep philosophical wisdom quotes that provide insight into human nature and existence."
    }
    return prompts[type] || prompts.famous
  }

  private parseQuotesFromResponse(content: string, type: QuoteType): AIQuoteResponse[] {
    const lines = content.split('\n').filter(line => line.trim())
    return lines.map(line => {
      const cleanLine = line.replace(/^\d+\.\s*/, '').trim()
      const parts = cleanLine.split(' - ')
      return {
        quote: cleanLine,
        author: parts.length > 1 ? parts[1] : 'Unknown',
        category: type
      }
    })
  }
}

export default AIService 