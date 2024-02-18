# UseNuxt SaaS Starter Project 🚀

Welcome to UseNuxt, a comprehensive SaaS starter project built with Nuxt.js, designed to kickstart your project with all the essential features you need. With built-in team management, authentication, and more, UseNuxt provides a solid foundation for building robust SaaS applications.

## Features ✨

- **Team Management:** Easily manage team members and roles right out of the box.
- **Authentication:** Secure authentication system integrated.
- **Database Management:** Commands to manage your database schema and data.
- **Modern UI:** Utilizes @nuxt/ui for a sleek, modern user interface.
- **SEO Friendly:** Built-in SEO optimization for better visibility.
- **Fully Customizable:** Flexible codebase that allows for easy customization and scalability.


## Demo 🚀

Experience UseNuxt in action and see firsthand what it can do for your next project.

👉 [Visit the Demo](http://demo.usenuxt.com)


## Installation 🛠

Before you begin, ensure you have [Node.js](https://nodejs.org/) installed on your machine. Then, follow these steps to get UseNuxt up and running:

```bash
# Clone the repository
git clone https://yourrepository.com/nuxt-app.git

# Navigate into the project directory
cd nuxt-app

# Install dependencies
npm install

# Prepare your environment (husky hooks, etc.)
npm run prepare
```

## Available Scripts 📜

UseNuxt comes with several pre-configured npm scripts to help with your development:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds your application for production.
- `npm run preview`: Preview the generate static site.
- `npm run start`: Launches the built application.
- `npm run lint`: Lints and fixes files.
- `npm run db:push`: Pushes schema changes to your database.
- `npm run db:gen`: Generates database artifacts.

## Dependencies 📦

UseNuxt leverages a powerful stack of technologies and libraries to provide a comprehensive foundation for building SaaS applications. Here's a closer look at each dependency and its role in the project:

- **Framework & UI**:
  - `nuxt` (🔥): The core framework that powers UseNuxt, providing server-side rendering, static site generation, and a powerful module ecosystem.
  - `@nuxt/ui` (🎨): A modern UI library from Nuxt team, offering ready-to-use components that ensure a sleek and uniform interface.
  - `vue` (⚡): The progressive JavaScript framework for building user interfaces, used under the hood by Nuxt.
  - `vue-router` (🧭): The official router for Vue.js, managing navigation within the application.

- **Authentication & Security**:
  - `lucia` (🔑): A simple, lightweight authentication library that supports multiple strategies and easy integration.
  - `@lucia-auth/adapter-postgresql` (💾): Provides Lucia with PostgreSQL adapter for user data storage and retrieval.
  - `@lucia-auth/oauth` (🌐): Adds OAuth authentication support, enabling login with external providers.

- **Database & ORM**:
  - `drizzle-orm` (🧱): A flexible ORM for managing and querying the database with ease, supporting complex data structures.
  - `postgres` (🐘): The node.js client for PostgreSQL, allowing direct database queries and connections.

- **Utilities**:
  - `@iconify/json` (🖼️): Offers a comprehensive collection of icons, easily accessible within the project for UI embellishments.
  - `slugify` (🔗): Converts strings to clean URLs, making them more friendly and accessible.
  - `uid` (🆔): Generates unique identifiers, useful for database keys, session IDs, etc.
  - `stripe` (💳): Integrates payment processing, enabling the project to handle subscriptions, purchases, and financial transactions.

- **Development Tools & Linting**:
  - `eslint` (🚨): Ensures code quality and consistency through static analysis of the codebase.
  - `@antfu/eslint-config` (🔧): Provides a set of ESLint rules for Vue and Nuxt projects, promoting best practices.
  - `husky` (🐶): Manages Git hooks, automating tasks like linting before commits to maintain code quality.

- **Styling & Animation**:
  - `@nuxtjs/tailwindcss` (🌬️): Integrates Tailwind CSS for rapid UI development with utility-first CSS classes.
  - `@formkit/auto-animate` (✨): Adds automatic animations to Vue components, enhancing user experience with smooth transitions.

- **Analytics & SEO**:
  - `@nuxtjs/plausible` (📊): Lightweight and privacy-friendly analytics, offering insights without compromising user privacy.

These dependencies are carefully selected to provide a robust, scalable foundation for your SaaS application, ensuring that you have all the tools you need for development, deployment, and beyond.


## Contributing 🤝

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

Distributed under the MIT License. See `LICENSE` for more information.

