# Notesify

Notesify is a modern, AI-powered note-taking application designed to help users organize, summarize, and enhance their notes efficiently. With a clean user interface and seamless integration of AI capabilities, Notesify ensures that your notes are always clear, concise, and well-organized.


## Features

Core Features
### Note Management:
   Create, edit, and delete notes with ease.
### Tagging System:
  Organize notes with tags for better categorization.
### Search and Filter:
  Quickly find notes using search queries and tag filters.
    AI-Powered Assistance:
    Summarize notes into concise overviews.
    Improve the clarity and structure of your notes.
    Expand notes with additional context and examples.
    Suggest relevant tags for better organization.
    User Interface
    Responsive Design: A clean and modern UI built with React.

Three-Panel Layout:
    Note List: Displays all notes with filtering options.
    Note Editor: Edit and manage the content of a selected note.
    AI Panel: Interact with AI features to enhance your notes.

## Project Structure
The project is organized as follows:

src/
├── App.jsx                # Main application component
├── main.jsx               # Entry point for React
├── context/
│   └── NotesContext.jsx   # Context for managing notes globally
├── hooks/
│   └── useAI.js           # Custom hook for interacting with the AI service
├── services/
│   └── aiServices.js      # Service for communicating with the AI API
├── utils/
│   └── noteUtils.js       # Utility functions for note creation and filtering
├── components/
│   ├── ai/
│   │   └── AIPanel.jsx    # AI interaction panel
│   ├── notes/
│   │   ├── NoteCard.jsx   # Individual note card component
│   │   ├── NoteEditor.jsx # Note editor component
│   │   └── NoteList.jsx   # List of notes
│   └── ui/
│       ├── Badge.jsx      # UI badge component
│       └── Button.jsx     # UI button component



## Environment Variables
The project uses environment variables for configuration. Ensure you have a .env file in the root directory with the following content:
  VITE_GEMINI_API_KEY=your-api-key-here

## Installation

1. Clone the repository
    git clone https://github.com/your-username/notesify.git
    cd notesify

2. Install the dependencies
    npm install

3. Start the Development server
    npm run dev

## Dependencies
    React: Frontend library for building the user interface.
    GoogleGenAI: AI service for note enhancement.
    Vite: Development server and build tool.

## Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Submit a pull request with a detailed description of your changes