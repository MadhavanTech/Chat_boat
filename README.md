# Chat Boat 🚀

A React-based chatbot application powered by Google's Gemini AI API with support for text-to-speech and speech-to-text capabilities.

## Features

- 💬 Chat with AI powered by Google Gemini
- 🎤 Speech-to-Text (STT) - Speak your questions
- 🔊 Text-to-Speech (TTS) - Hear AI responses
- 🔄 Automatic retry logic for API failures
- ⚡ Fast builds with Vite
- 🎨 Styled with Tailwind CSS

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MadhavanTech/Chat_boat.git
   cd Chat_boat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Add your API Key**
   Open `.env` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Deployment

This project is automatically deployed to GitHub Pages when you push to the `main` branch.

**Live URL:** https://madhavantech.github.io/Chat_boat/

## Project Structure

```
src/
├── pages/
│   ├── chat_boat.jsx      # Main chat component
│   ├── stt.jsx            # Speech-to-Text
│   ├── tts.jsx            # Text-to-Speech
│   └── Chat_Hry.jsx       # Chat history
├── Context/
│   └── Context.jsx        # Global state management
├── Chat_boat_Responce.jsx # API integration
├── App.jsx                # Root component
└── main.jsx               # Entry point
```

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Google Generative AI** - AI API
- **HuggingFace Transformers** - ML utilities

## License

MIT
