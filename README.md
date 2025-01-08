# Project Name

## Getting Started

### Prerequisites

To run this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn Package Manager](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (optional for Docker setup)

---

### 1. Install Dependencies

Before running the project, install the required dependencies:

```bash
yarn install
```

This will install all the dependencies listed in the `package.json` file.

---

## Available Scripts

### Run Locally

#### 1. Start the Development Server

```bash
yarn start
```

- Runs the app in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload automatically when changes are made.
- Any lint errors will appear in the console.

#### 2. Run Tests

```bash
yarn test
```

- Launches the test runner in interactive watch mode.
- For more details, see the [React testing documentation](https://reactjs.org/docs/running-tests.html).

#### 3. Build for Production

```bash
yarn build
```

- Builds the app for production into the `build` folder.
- Optimizes the build for best performance (minified, hashed filenames).

To learn more about deploying your app, check out the [React deployment documentation](https://reactjs.org/docs/deployment.html).

---

## Docker Instructions

This project supports Docker for containerized deployment. Follow the steps below to build and run the application using Docker.

### Build the Docker Image

Run the following command in the project directory to build the Docker image:

```bash
docker build -t react-app:dev .
```

### Run the Docker Container

Run the following command to start the Docker container:

```bash
docker run -p 5173:5173 react-app:dev
```

- The app will be accessible at [http://localhost:5173](http://localhost:5173).

---

## Troubleshooting

1. **Development Server Fails to Start:**

   - Ensure your development server is running.
   - Check the terminal for errors and resolve them.

2. **Docker Image Does Not Build:**

   - Verify Docker is installed and running.
   - Ensure the Dockerfile is correctly configured.

3. **Port Conflicts:**
   - Make sure no other application is using the specified ports (3000 or 5173).
