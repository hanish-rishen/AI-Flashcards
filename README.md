# AI Flashcards Project

This project is an AI-powered flashcard application designed to automatically generate flashcards from text using advanced language models like LLaMA 3. The app provides a user-friendly interface for viewing interactive flashcards.

## Features

- **Automatic Flashcard Generation**: Leverage LLaMA 3 through OpenRouter API to generate flashcards from input text.
- **User Authentication**: Secure user authentication using Firebase.
- **Modern UI**: Built with Next.js and styled with Aceternity UI for a sleek and responsive design.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Aeternity UI
- **Backend**: Firebase for user authentication and data storage
- **AI Integration**: OpenRouter API to connect with LLaMA 3
- **Hosting**: Vercel for deploying the frontend

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Firebase Account
- OpenRouter Account for LLaMA 3 API (Free) access
- Vercel Account

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/hanish-rishen/AI-Flashcards.git
    cd AI-Flashcards
    ```

2. **Install frontend dependencies:**

    ```bash
    npm install
    ```

3. **Set up Firebase:**

   - Go to the [Firebase console](https://console.firebase.google.com/).
   - Create a new project and set up authentication.
   - Create a `.env.local` file in the root directory and add your Firebase configuration:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    ```

4. **Set up OpenRouter API for LLaMA 3:**

   - Sign up for an account at [OpenRouter](https://openrouter.ai).
   - Obtain an API key and add it to your `.env.local` file:

    ```env
    NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key
    ```

5. **Run the development server:**

    ```bash
    npm run dev
    ```

6. **Deploy on Vercel:**

   - Follow the [Vercel deployment guide](https://vercel.com/docs) to deploy your Next.js application.

## Usage

1. **Sign In/Up**: Use Firebase authentication to create an account or sign in.
2. **Upload Documents**: Upload text documents (PDF, DOCX, etc.) via the dashboard.
3. **Generate Flashcards**: The application will use LLaMA 3 through OpenRouter to generate flashcards.
4. **Review and Customize**: Edit the flashcards as needed.
5. **Study**: Use the study mode with spaced repetition features.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenAI](https://www.openai.com) and [OpenRouter](https://openrouter.ai) for providing AI tools and APIs.
- [Firebase](https://firebase.google.com) for backend services.
- [Vercel](https://vercel.com) for hosting the frontend application.

---

Feel free to modify this README further if you have additional details or specific instructions you want to include!
