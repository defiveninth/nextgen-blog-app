# Blog Post App

A modern, full-stack blog post application built with:

- **PostgreSQL**: For a robust, scalable relational database.
- **Next.js**: Leveraging the power of the app directory for server-side rendering and optimized routing.
- **TypeScript**: Ensuring type safety and a better developer experience.
- **ShadCN**: For beautifully designed, customizable UI components.

## Features

- Create, read, update, and delete (CRUD) blog posts.
- Organize posts with categories and tags.
- Responsive and visually appealing design using ShadCN components.
- Efficient server-side rendering and client-side interactions.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/defiveninth/blog-post-app.git
   cd blog-post-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your `.env` file by copying the example:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your PostgreSQL connection details.

4. Initialize the database using Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application should now be running at [http://localhost:3000](http://localhost:3000).

### Scripts

Here are some useful scripts to manage the project:

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to check for code issues.
- `npm run format`: Format code using Prettier.

## Project Structure

The project follows a structured and modular design:

```
blog-post-app/
├── prisma/          # Prisma schema and migrations
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js app directory
│   ├── components/  # Reusable UI components
│   ├── lib/         # Utility functions and constants
│   ├── pages/       # Custom pages
│   └── styles/      # Global styles
├── .env.example     # Example environment variables
├── next.config.js   # Next.js configuration
└── package.json     # Project dependencies and scripts
```

## Technologies Used

- **PostgreSQL**: For managing relational data with performance and reliability.
- **Prisma**: For interacting with the database using a type-safe ORM.
- **Next.js**: Framework for building server-rendered React applications.
- **TypeScript**: For static typing and improved developer productivity.
- **ShadCN**: For a modern, responsive UI design system.
- **Tailwind CSS**: For rapid and responsive styling.

## Author

**XBDURRXUF I**  
A passionate developer building scalable and efficient web applications. Connect on [GitHub](https://github.com/defiveninth).

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding!

