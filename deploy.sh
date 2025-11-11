#!/bin/bash

# AI Instagram Reel Generator - Production Deployment Script

echo "🚀 Starting production deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create production build
echo "🔨 Creating production build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to create production build"
    exit 1
fi

echo "✅ Production build created successfully"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from example..."
    cp env.example .env
    echo "📝 Please edit .env file with your API keys"
fi

echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your API keys"
echo "2. Run 'npm run serve' to start the production server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "🌐 For production hosting:"
echo "- Upload the 'dist' folder to your web server"
echo "- Configure your server to serve index.html for all routes"
echo "- Set up environment variables on your hosting platform" 