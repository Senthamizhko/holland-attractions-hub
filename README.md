# Holland Attraction Booking System

## Overview

The Holland Attraction Booking System is a user-friendly web application designed to provide a one-stop solution for exploring, selecting, and booking tickets for various attractions across Holland. Whether you’re interested in museums, kids’ attractions, or seasonal delights like Christmas markets, this platform makes it easy to find the best deals and secure your tickets.

With a clean interface, users can browse the categories , select the no of persons and a preferred date to add tickets to your cart.

Scalable & Efficient: Built for high performance and reliability, ensuring a smooth experience even under heavy traffic.

## Tech stack

### Frontend
	- React: Component-based architecture with React Hooks and Context API for state management.
	- SASS: Styled using the BEM CSS methodology for maintainable and modular design.
	- GraphQL with Apollo Client: Efficient data fetching and management.
	- Testing: Unit tests implemented using Jest and React Testing Library.

### Backend

	- Node.js: Server logic.
	- GraphQL with Apollo Server: API layer for querying and managing data.

### Deployment

	- Docker: Containerized application for consistent deployments.
	- Kubernetes: Orchestration for scaling and managing application containers.

### Load Testing

	- K6: Performance and load testing to ensure scalability and reliability.

## Project structure

This project is organized into three main directories:

	- Client: Contains the React-based frontend code and assets and deployment files.
	- Server: Houses the Node.js backend with GraphQL API, and server configurations and deployment files.
	- Loadtest: Contains k6 load test file.

## Prerequisites

	- Node.js and npm installed.
	- Docker and Kubernetes installed.
	- Minikube configured for local Kubernetes environment.

## Steps to Run Locally

### Running Directly Using Node.js

#### Clone the Repository:

```
git clone https://github.com/Senthamizhko/holland-attractions-hub.git
cd holland-attraction-hub
```

#### Run the Client:
Navigate to the client folder, install dependencies, and start the frontend:

```
cd client
npm install
npm start
```

This will open the application in your browser at http://localhost:3000.

#### Run the Server:
In a separate terminal, navigate to the server folder, install dependencies, and start the backend:

```
cd ../server
npm install
npm start
```

The GraphQL API server will be available at http://localhost:4000.

### Running Using Docker and Kubernetes and minikube

#### Use Pre-Pushed Docker Images:
Instead of building locally, pull the pre-built images from the registry:

```
docker pull senthamizhko2024/client:latest
docker pull senthamizhko2024/server:latest
```
Check the app using docker only
```
docker run -d -p 8080:80 senthamizhko2024/client:latest
docker run -d -p 4000:4000 senthamizhko2024/server:latest
```

#### Skip this if you followed the above step, and prefer to build and run Docker Containers Locally:
Navigate to the client folder and build the Docker image:

```
cd client
docker build -t client:latest .
docker run -d -p 8080:80 --name client-container client:latest
docker tag client:latest <your docker username>/client:latest
docker push <your docker username>/client:latest
Update the image name <your docker username>/client:latest in client-deployment.yaml
```
Navigate to the server folder and build the Docker image:

```
cd server
docker build -t server:latest .
docker run -d -p 4000:4000 --name server-container server:latest
docker tag server:latest <your docker username>/server:latest
docker push <your docker username>/server:latest
Update the image name <your docker username>/server:latest in server-deployment.yaml
```

#### Run with Minikube:
Start Minikube and verify it is configured:

```
brew install minikube
minikube start
kubectl config current-context
```
Should output "minikube"

#### Deploy with Kubernetes:
Apply deployment configurations for the client and Verify the deployment pods are running

```
kubectl apply -f client-deployment.yaml
kubectl get pods
```
Apply service configurations for the client and Verify the services are available

```
kubectl apply -f client-service.yaml
kubectl get svc
``` 

Apply deployment configurations for the server and Verify the deployment pods are running

```
kubectl apply -f server-deployment.yaml
kubectl get pods
``` 
Apply service configurations for the server and Verify the services are available

```
kubectl apply -f server-service.yaml
kubectl get svc
```

Access the Application: Use the Minikube service command to open the application:

```minikube tunnel```

Open the app at http://localhost:80.


This setup provides flexibility to run locally with Node.js or deploy using Docker and Kubernetes, catering to development and production needs alike.





