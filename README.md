# AI Instagram Reel Generator 🎬

A **production-ready** Instagram reel generator with **AI-powered quotes**. Create up to 50 stunning reels at once with fade-in animations and minimalist design. Perfect for content creators, social media managers, and anyone looking to create engaging Instagram content.

## ✨ Features

- 🤖 **AI-Powered Quotes** - Uses OpenAI GPT-3.5 for dynamic quote generation
- 🎨 **Beautiful Modern UI** - Clean, minimalist interface with smooth animations
- 📝 **6 Quote Categories** - Famous, Attitude, Life, Stoicism, Motivation, and Wisdom
- 🎬 **Professional Video Generation** - Creates reels with fade-in text effects on black backgrounds
- ⚙️ **Customizable Settings** - Adjust duration, font size, and number of reels
- 📱 **Instagram Optimized** - Perfect 1080x1920 dimensions for Instagram reels
- 🚀 **Batch Generation** - Generate up to 50 reels simultaneously
- 💾 **Easy Download** - One-click download for all generated reels
- 🔧 **Production Ready** - Environment variables, error handling, and deployment scripts

## Features

- 🎨 **Beautiful Modern UI** - Clean, minimalist interface with smooth animations
- 📝 **Multiple Quote Types** - Famous quotes, attitude quotes, life quotes, stoicism, motivation, and wisdom
- 🎬 **Video Generation** - Create reels with fade-in text effects on black backgrounds
- ⚙️ **Customizable Settings** - Adjust duration, font size, and number of reels
- 📱 **Instagram Optimized** - Perfect 1080x1920 dimensions for Instagram reels
- 🚀 **Batch Generation** - Generate up to 50 reels simultaneously
- 💾 **Easy Download** - One-click download for all generated reels

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Video Generation**: Canvas API + MediaRecorder
- **AI Integration**: OpenAI GPT-3.5 + Hugging Face (fallback)
- **HTTP Client**: Axios
- **Environment**: Dotenv

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- OpenAI API key (optional, for AI quote generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-instagram-reel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional)**
   ```bash
   cp env.example .env
   # Edit .env with your OpenAI API key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Usage

1. **Configure AI Settings (Optional)**
   - Click the settings icon to open AI configuration
   - Enter your OpenAI API key for dynamic quote generation
   - Or use local quotes if no API key is provided

2. **Select Quote Type**
   - Choose from 6 different quote categories
   - Each type has its own curated collection or AI-generated quotes

3. **Configure Settings**
   - Set the number of reels (1-50)
   - Adjust duration (5-30 seconds)
   - Customize font size (24-72px)

4. **Generate Reels**
   - Click "Generate Reels" to start the process
   - Watch the progress bar as reels are created
   - Each reel will have a beautiful fade-in animation

5. **Download**
   - Preview generated reels in the browser
   - Click the download button on any reel to save it
   - All reels are optimized for Instagram

## 📝 Quote Categories

- **Famous Quotes** - Inspirational quotes from well-known figures (AI-generated or curated)
- **Attitude Quotes** - Bold, confident statements with attitude
- **Life Quotes** - Wisdom about living life to the fullest
- **Stoicism** - Ancient wisdom from Stoic philosophers
- **Motivation** - Encouraging quotes to push you forward
- **Wisdom** - Deep insights and philosophical thoughts

## 🤖 AI Integration

The app supports multiple AI providers for quote generation:

### OpenAI GPT-3.5 (Recommended)
- **Cost**: ~$0.002 per 1K tokens
- **Quality**: High-quality, contextual quotes
- **Setup**: Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### Hugging Face (Free Alternative)
- **Cost**: Free (with rate limits)
- **Quality**: Good for basic quote generation
- **Setup**: Get API key from [Hugging Face](https://huggingface.co/settings/tokens)

### Local Fallback
- **Cost**: Free
- **Quality**: Curated collection of 50+ quotes
- **Setup**: No setup required, works offline

## Customization

### Adding New Quotes

Edit the `quotes` object in `src/components/ReelGenerator.tsx`:

```typescript
private static quotes = {
  famous: [
    "Your new quote here - Author Name",
    // Add more quotes...
  ],
  // Add new categories...
}
```

### Styling

The app uses Tailwind CSS with custom components. Main styles are in:
- `src/index.css` - Global styles and custom components
- `tailwind.config.js` - Tailwind configuration

### Video Settings

Adjust video generation settings in `src/components/ReelGenerator.tsx`:
- Canvas dimensions (currently 1080x1920)
- FPS (currently 30)
- Fade-in duration (currently 1.5 seconds)

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run serve` - Serve production build
- `bash deploy.sh` - Run production deployment script

### Project Structure

```
src/
├── components/
│   ├── ProgressBar.tsx      # Progress indicator
│   ├── QuoteSelector.tsx    # Quote selection interface
│   ├── ReelGenerator.tsx    # Video generation logic
│   └── Settings.tsx         # AI settings modal
├── services/
│   └── AIService.ts         # AI quote generation service
├── App.tsx                  # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## 🚀 Production Deployment

### Quick Deployment
```bash
# Run the deployment script
bash deploy.sh
```

### Manual Deployment
```bash
# Install dependencies
npm install

# Create production build
npm run build

# Serve production build
npm run serve
```

### Environment Variables
Create a `.env` file with your configuration:
```env
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

### Hosting Options
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload `dist` folder to S3 bucket
- **Traditional Hosting**: Upload `dist` folder to your web server

## 🔮 Future Enhancements

- [x] Integration with AI APIs for dynamic quote generation
- [ ] Background music selection
- [ ] Custom background images/colors
- [ ] Text animation variations
- [ ] Social media sharing integration
- [ ] User accounts and saved reels
- [ ] Advanced video effects
- [ ] Multi-language support
- [ ] Quote history and favorites

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Note**: This is a demo application. For production use, consider integrating with actual AI APIs for quote generation and implementing proper video encoding with FFmpeg.wasm for better performance and file formats. 