import { QuoteConfig } from '../App'

class ReelGenerator {
  private static quotes = {
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

  static async generateReels(config: QuoteConfig, onProgress: (progress: number) => void): Promise<string[]> {
    const { type, count, duration, fontSize, fontFamily } = config
    const quotes = this.quotes[type] || this.quotes.famous
    const generatedReels: string[] = []

    for (let i = 0; i < count; i++) {
      const quote = quotes[i % quotes.length]
      const reelUrl = await this.generateSingleReel(quote, duration, fontSize, fontFamily)
      generatedReels.push(reelUrl)
      
      // Update progress
      const progress = ((i + 1) / count) * 100
      onProgress(progress)
      
      // Small delay to prevent browser freezing
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    return generatedReels
  }

  private static async generateSingleReel(
    quote: string, 
    duration: number, 
    fontSize: number, 
    fontFamily: string
  ): Promise<string> {
    // Create canvas for video generation
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      throw new Error('Could not get canvas context')
    }

    // Set canvas size (Instagram reel dimensions: 1080x1920)
    canvas.width = 1080
    canvas.height = 1920

    // Create video frames
    const fps = 30
    const totalFrames = duration * fps
    const frames: ImageData[] = []

    for (let frame = 0; frame < totalFrames; frame++) {
      // Clear canvas with black background
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate fade-in effect
      const fadeInDuration = 1.5 // seconds
      const fadeInFrames = fadeInDuration * fps
      const opacity = frame < fadeInFrames ? frame / fadeInFrames : 1

      // Set text properties
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.font = `${fontSize}px ${fontFamily}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Add text shadow for better readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2

      // Split quote into lines for better formatting
      const words = quote.split(' ')
      const lines: string[] = []
      let currentLine = ''

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word
        const metrics = ctx.measureText(testLine)
        
        if (metrics.width > canvas.width * 0.8) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      if (currentLine) {
        lines.push(currentLine)
      }

      // Draw text lines
      const lineHeight = fontSize * 1.5
      const totalHeight = lines.length * lineHeight
      const startY = (canvas.height - totalHeight) / 2

      lines.forEach((line, index) => {
        const y = startY + index * lineHeight
        ctx.fillText(line, canvas.width / 2, y)
      })

      // Reset shadow
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Capture frame
      const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      frames.push(frameData)
    }

    // Convert frames to video (simplified - in a real app, you'd use FFmpeg.wasm)
    return this.framesToVideo(frames, fps)
  }

  private static async framesToVideo(frames: ImageData[], fps: number): Promise<string> {
    // For this demo, we'll create a simple video using canvas animation
    // In a production app, you'd use FFmpeg.wasm to create actual MP4 files
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      throw new Error('Could not get canvas context')
    }

    canvas.width = 1080
    canvas.height = 1920

    // Create a blob URL for the video
    const stream = canvas.captureStream(fps)
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    })

    const chunks: Blob[] = []
    
    return new Promise((resolve) => {
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        resolve(url)
      }

      mediaRecorder.start()

      // Play frames
      let frameIndex = 0
      const playFrames = () => {
        if (frameIndex < frames.length) {
          ctx.putImageData(frames[frameIndex], 0, 0)
          frameIndex++
          setTimeout(playFrames, 1000 / fps)
        } else {
          mediaRecorder.stop()
        }
      }

      playFrames()
    })
  }

  // Alternative method using a simpler approach for demo purposes
  static async generateDemoReel(quote: string, duration: number): Promise<string> {
    // Create a simple animated canvas that can be recorded
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      throw new Error('Could not get canvas context')
    }

    canvas.width = 1080
    canvas.height = 1920

    // Set up recording
    const stream = canvas.captureStream(30)
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    })

    const chunks: Blob[] = []
    
    return new Promise((resolve) => {
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        resolve(url)
      }

      mediaRecorder.start()

      // Animate the quote
      let startTime = Date.now()
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000
        const progress = Math.min(elapsed / duration, 1)

        // Clear canvas
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Calculate fade-in effect
        const fadeInDuration = 1.5
        const opacity = elapsed < fadeInDuration ? elapsed / fadeInDuration : 1

        // Draw text
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.font = '48px Poppins'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
        ctx.shadowBlur = 10
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2

        // Split quote into lines
        const words = quote.split(' ')
        const lines: string[] = []
        let currentLine = ''

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word
          const metrics = ctx.measureText(testLine)
          
          if (metrics.width > canvas.width * 0.8) {
            lines.push(currentLine)
            currentLine = word
          } else {
            currentLine = testLine
          }
        }
        if (currentLine) {
          lines.push(currentLine)
        }

        // Draw text lines
        const lineHeight = 72
        const totalHeight = lines.length * lineHeight
        const startY = (canvas.height - totalHeight) / 2

        lines.forEach((line, index) => {
          const y = startY + index * lineHeight
          ctx.fillText(line, canvas.width / 2, y)
        })

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          mediaRecorder.stop()
        }
      }

      animate()
    })
  }
}

export default ReelGenerator 