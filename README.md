# AI Chat Application

A modern AI chat application built with **React**, **TypeScript**, and **Express** as part of the **Fivetran Front-End Engineer technical assignment**.

The application allows users to create and manage multiple conversations, interact with OpenAI's GPT-5 Mini model, and persist chat history locally while keeping the API key securely on the backend.

---

## Features

- 💬 Multiple chat sessions
- 🤖 OpenAI GPT-5 Mini integration
- 📝 Conversation history
- 💾 LocalStorage persistence
- 📄 Markdown rendering
- 💻 Syntax-highlighted code blocks
- 🌙 Light / Dark theme
- ⏳ Loading and error states
- 📱 Responsive layout
- 🔒 Secure Express backend proxy
- ✅ Unit and integration tests

---

## Highlights

This project demonstrates:

- Component-based React architecture
- Type-safe development with TypeScript
- Secure client-server communication
- Modern frontend testing with Vitest and React Testing Library
- Clean separation between frontend and backend responsibilities
- Responsive UI built with Sass

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Sass (SCSS)
- React Markdown
- React Syntax Highlighter

### Backend

- Express
- OpenAI API
- dotenv
- cors

### Testing

- Vitest
- React Testing Library
- jsdom

---

## Design Decisions

### Express Backend

Instead of calling the OpenAI API directly from the client, all requests are routed through an Express backend. This keeps the API key secure and prevents exposing sensitive credentials in the browser.

### LocalStorage Persistence

Chat sessions are stored in LocalStorage so conversations remain available after refreshing or reopening the application.

### Component-Based Architecture

The application is organized into reusable React components with clear separation of responsibilities, making the codebase easier to maintain and extend.

### Markdown Support

AI responses are rendered as Markdown, allowing formatted text, lists, tables and syntax-highlighted code blocks for a better reading experience.

---

## Project Structure

```text
.
├── server
│   ├── src
│   └── package.json
│
├── src
│   ├── components
│   ├── layouts
│   ├── services
│   ├── types
│   ├── hooks
│   ├── utils
│   ├── styles
│   └── test
│
├── public
└── README.md
```

---

## Getting Started

### Prerequisites

Before running the project, make sure you have installed:

- Node.js (v20 or later recommended)
- npm
- An OpenAI API key

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory.

```env
OPENAI_API_KEY=your_openai_api_key
```

### 5. Start the backend

```bash
cd server
npm run dev
```

The backend will run on:

```
http://localhost:3001
```

### 6. Start the frontend

The frontend and backend run as separate development servers, so two terminal windows are required.

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

## Running Tests

Run all unit and integration tests:

```bash
npm test
```

---

## Future Improvements

Some ideas that could further extend the project include:

- Streaming AI responses
- Conversation renaming
- Conversation search
- Export conversations
- Authentication and cloud synchronization
- Docker support
- CI/CD pipeline with GitHub Actions

---

## Screenshots
