## Getting Started

## Prerequisites

To run this project, ensure you have the following installed:

- **Node.js**
- **Yarn Package Manager**
- **Docker** (optional, for Docker setup)

## Getting Started

### 1. Install Dependencies

Before running the project, you need to install the required dependencies. In your terminal, run:

```bash
yarn install
```

This will install all the dependencies listed in the `package.json` file.

### 2. Available Scripts

#### Run Locally

##### a) Start the Development Server

To start the development server, run the following command:

```bash
yarn start
```

This will:

- Run the app in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- Reload the page automatically when changes are made.
- Show any lint errors in the console.

##### b) Run Tests

To run tests, execute:

```bash
yarn test
```

This launches the test runner in interactive watch mode. For more details, see the [React testing documentation](https://reactjs.org/docs/testing.html).

##### c) Build for Production

To build the app for production, run:

```bash
yarn build
```

This will:

- Create a production build in the `build` folder.
- Optimize the build for the best performance (minified, hashed filenames).

To learn more about deploying your app, check out the [React deployment documentation](https://reactjs.org/docs/deployment.html).

### 3. Docker Instructions (Optional)

This project supports Docker for containerized deployment. To build and run the application using Docker, follow these steps:

#### a) Build the Docker Image

Ensure your Docker Desktop is running. Then, build the Docker image by running:

```bash
docker build -t react-app:dev .
```

#### b) Run the Docker Container

To start the Docker container, run:

```bash
docker run -p 5173:5173 react-app:dev
```

This will make the app accessible at [http://localhost:5173](http://localhost:5173).

## Troubleshooting

- **Development Server Fails to Start**:

  - Ensure your development server is running.
  - Check the terminal for errors and resolve them.

- **Docker Image Does Not Build**:

  - Verify that Docker is installed and running.
  - Ensure the Dockerfile is correctly configured.

- **Port Conflicts**:
  - Make sure no other application is using the specified ports (3000 or 5173).
