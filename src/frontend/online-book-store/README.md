# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Frontend Setup

To ensure that the frontend of this project works correctly, you need to install all the necessary libraries and dependencies. Follow the steps below to set up the frontend environment:

### 1. Install Node.js and npm

Make sure that Node.js and npm - Node Package Manager are installed on your system. You can download and install them from [nodejs.org](https://nodejs.org/).

### 2. Navigate to the Project Directory

Navigate to the project directory where the `package.json` file is located.

```bash
cd src/frontend/online-book-store
```

### 3. Install Dependencies

Use npm to install all the required frontend libraries. These dependencies are listed in the package.json file. To install them, run:

```bash
npm install
```

### 4. Verify Installation

Once the installation is complete, you can verify that everything is set up correctly by starting the development server:

```bash
npm start
```

This will start the frontend application, and you can access it typically at [localhost:3000](http://localhost:3000).

### Adding or Updating Frontend Libraries

-   To install an extra library you can run:

```bash
npm install library_name
```

This will install the `library_name` and add it to the `package.json` file automatically.

-   To update an existing library you can run:

```bash
npm update library_name
```

This will update the `library_name` to the latest version.

### Libraries Used

This project uses the following key libraries and dependencies:

-   **@emailjs/browser**: A library that helps in sending emails directly from the browser using EmailJS.
-   **@fortawesome/fontawesome-svg-core, @fortawesome/free-brands-svg-icons, @fortawesome/free-regular-svg-icons, @fortawesome/free-solid-svg-icons, @fortawesome/react-fontawesome**: These libraries are part of the Font Awesome icon toolkit used for including scalable vector icons in your React application.
-   **@react-oauth/google**: A React component for Google's OAuth2 authentication, useful for implementing Google sign-in functionality.
-   **@tippyjs/react**: A lightweight and highly customizable tooltip and popover library for React.
-   **axios**: A promise-based HTTP client for making requests to your backend API or other services.
-   **classnames**: A utility for conditionally joining class names together, useful for managing dynamic styling in React components.
-   **customize-cra**: A tool to customize Create React App configuration without ejecting, allowing more flexible build settings.
-   **js-cookie**: A simple JavaScript API for handling cookies in the browser.
-   **jwt-decode**: A small library that helps in decoding JSON Web Tokens (JWT) for client-side authentication purposes.
-   **normalize.css**: A modern, HTML5-ready alternative to CSS resets, it makes browsers render all elements more consistently and in line with modern standards.
-   **react**: The main library for building user interfaces with components in this project.
-   **react-dom**: This package provides DOM-specific methods that can be used at the top level of a web app to enable efficient rendering.
-   **react-router-dom**: A fully-featured client and server-side routing library for React, used for managing navigation between pages in the app.
-   **react-scripts**: Scripts and configuration used by Create React App.
-   **sass**: A CSS preprocessor which adds special features such as variables, nested rules, and mixins on top of regular CSS.
-   **universal-cookie**: A universal cookie library for React that works in both client-side and server-side rendering environments.
-   **web-vitals**: A library that measures the quality of a user experience by reporting essential web vitals metrics.

### DevDependencies

These dependencies are used during the development process to enhance productivity:

-   **babel-plugin-module-resolver**: A Babel plugin to add custom module resolution paths, making your imports cleaner and more manageable.
-   **react-app-rewired**: A tool that allows you to override the Create React App configuration without ejecting, giving you more control over the build process.

Make sure to run `npm install` to install all the required dependencies before running the app. If you need to install additional libraries or update existing ones, follow the instructions provided in the previous sections.
