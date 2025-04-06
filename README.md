# GitHub Kanban Board

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://github-kanban-board-omega.vercel.app/)

GitHub Kanban Board is a web application that allows you to view and manage GitHub Issues in a Kanban board format. The app provides a convenient interface for dragging and dropping issues between columns that represent their status.

## Features

- 🎯 View GitHub Issues in Kanban board format
- 🖱️ Drag-and-drop functionality for changing issue status
- 🌙 Light and dark theme support
- 💾 Persistent state between sessions for each repository
- 🔗 Links to repository and owner profiles
- 🔍 Filter issues by status
- 📱 Responsive design
- ⚡ Fast performance thanks to optimization

## Screenshots

### Light Theme
![Light Theme](https://github.com/Sarufanter/Github-Kanban-Board/raw/main/public/screenshots/light-theme.png)

### Dark Theme
![Dark Theme](https://github.com/Sarufanter/Github-Kanban-Board/raw/main/public/screenshots/dark-theme.png)

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [@dnd-kit](https://dnd-kit.com/) - Drag-and-drop library
- [GitHub API](https://docs.github.com/en/rest) - For fetching issues data
- [Axios](https://axios-http.com/) - For API requests
- [Vitest](https://vitest.dev/) - Testing framework

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Sarufanter/Github-Kanban-Board.git
cd Github-Kanban-Board
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter GitHub repository URL in the format: `owner/repo`
2. Click the "Load Issues" button
3. View issues organized in three columns:
   - 📋 **ToDo**: New issues without an assignee
   - 🔄 **In Progress**: Open issues with an assignee
   - ✅ **Done**: Closed issues
4. Drag and drop issues between columns to change their status
5. The state of the board is saved automatically and will be restored when you load the same repository again
6. Toggle theme using the button in the top right corner

## Project Structure

```
src/
├── app/
│   ├── components/     # React components
│   ├── store/         # Redux store and slices
│   ├── services/      # API services
│   └── types/         # TypeScript types
```

## Deployment

The project is automatically deployed to [Vercel](https://vercel.com/) when pushing to the `main` branch.

## Author

[Oleh_Savkiv](https://github.com/Sarufanter)

## Acknowledgments

Thank you for checking out the project! If you have any suggestions for improvements or find a bug, please create an issue or pull request.
