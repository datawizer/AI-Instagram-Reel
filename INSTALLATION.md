# 🚀 Installation Guide - AI Instagram Reel Generator

## Prerequisites

Before installing the application, you need to have Node.js installed on your system.

### Installing Node.js

#### Windows
1. **Download Node.js**: Visit [nodejs.org](https://nodejs.org/)
2. **Choose LTS version**: Download the "LTS" (Long Term Support) version
3. **Run installer**: Double-click the downloaded `.msi` file
4. **Follow installation wizard**: Accept defaults and complete installation
5. **Restart terminal**: Close and reopen your terminal/PowerShell

#### Alternative Windows Installation
```powershell
# Using Chocolatey (if installed)
choco install nodejs

# Using Scoop (if installed)
scoop install nodejs
```

#### macOS
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

#### Linux (Ubuntu/Debian)
```bash
# Using apt
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using snap
sudo snap install node --classic
```

### Verify Installation
After installation, verify that Node.js and npm are installed:
```bash
node --version
npm --version
```

## Application Installation

### 1. Clone or Download
```bash
# If using git
git clone <repository-url>
cd ai-instagram-reel

# Or download and extract the ZIP file
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables (Optional)
```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your API keys
# REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open in Browser
Navigate to `http://localhost:3000`

## Production Deployment

### Quick Deployment
```bash
# Run the deployment script
bash deploy.sh
```

### Manual Production Build
```bash
# Install dependencies
npm install

# Create production build
npm run build

# Serve production build
npm run serve
```

## AI API Setup

### OpenAI API (Recommended)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Navigate to "API Keys" section
4. Click "Create new secret key"
5. Copy the key and add it to your `.env` file:
   ```
   REACT_APP_OPENAI_API_KEY=sk-your-key-here
   ```

### Hugging Face API (Free Alternative)
1. Visit [Hugging Face](https://huggingface.co/settings/tokens)
2. Create an account or sign in
3. Go to "Access Tokens"
4. Create a new token
5. Add it to your `.env` file:
   ```
   REACT_APP_HUGGINGFACE_API_KEY=hf-your-token-here
   ```

## Troubleshooting

### Node.js/npm not found
- **Windows**: Restart your terminal after installing Node.js
- **macOS/Linux**: Make sure Node.js is in your PATH
- **Verify installation**: Run `node --version` and `npm --version`

### Installation errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

### API key issues
- Make sure your API key is correct
- Check if you have sufficient credits (OpenAI)
- Verify the key is properly formatted in `.env` file

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the main README.md file
3. Open an issue on GitHub
4. Check the browser console for error messages

## Next Steps

After successful installation:
1. Configure your AI API keys in settings
2. Test quote generation with different categories
3. Generate your first Instagram reel
4. Customize the application for your needs
5. Deploy to production if needed 