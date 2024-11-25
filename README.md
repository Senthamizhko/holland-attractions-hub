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
docker pull enthamizhko2024/server:v1.1
```
Check the app using docker only
```
docker run -d -p 8080:80 senthamizhko2024/client:latest
docker run -d -p 4000:4000 enthamizhko2024/server:v1.1
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

## Accessibility

This project is designed with accessibility in mind to ensure usability for all users, including those with disabilities. Key accessibility features include:

	- Semantic HTML: Proper use of <header>, <section>, heading structure per sections and other elements to enhance screen reader compatibility.
	- Keyboard Navigation: All interactive elements (e.g., buttons, forms) are fully navigable via the keyboard, with clear focus states.
	- ARIA Roles and Live Regions: Dynamic updates (e.g., notifications) are announced to screen readers using role="alert" and aria-live.
	- Responsive Design: Fully optimized for mobile, tablet, and desktop use.

### Testing

Accessibility was tested using tools like screen readers (VoiceOver) and dev tools.

## Screenshots

<img width="1728" alt="Screenshot 2024-11-26 at 00 02 30" src="https://github.com/user-attachments/assets/579ec3ce-0e43-4cc6-96ab-6f86b77b7d70">
<img width="1728" alt="Screenshot 2024-11-26 at 00 02 43" src="https://github.com/user-attachments/assets/4054152b-74ca-4bb6-9bb0-0f1d43aefe64">
<img width="1728" alt="Screenshot 2024-11-26 at 00 03 01" src="https://github.com/user-attachments/assets/36fa6f88-33e8-4f50-9fe0-9b7784093177">
<img width="1727" alt="Screenshot 2024-11-26 at 00 03 30" src="https://github.com/user-attachments/assets/a4fb5aa8-1286-4c36-b08e-703e2d8b0ce5">
<img width="1724" alt="Screenshot 2024-11-26 at 00 04 07" src="https://github.com/user-attachments/assets/3648b399-e105-43bb-bea1-3c60fb654a55">
<img width="1722" alt="Screenshot 2024-11-26 at 00 04 18" src="https://github.com/user-attachments/assets/c2c64cd3-16db-4cbf-88fb-9deb8f651455">
<img width="1717" alt="Screenshot 2024-11-26 at 00 04 27" src="https://github.com/user-attachments/assets/4d9ed33c-307f-47cd-877c-69dbc4aa7893">
<img width="1728" alt="Screenshot 2024-11-26 at 00 04 41" src="https://github.com/user-attachments/assets/5ce5035d-32e3-44ba-86fc-4a429914efbf">
<img width="1720" alt="Screenshot 2024-11-26 at 00 05 15" src="https://github.com/user-attachments/assets/cbf55cf9-6dfd-4728-a5f5-0d03aeba945d">
<img width="627" alt="Screenshot 2024-11-26 at 00 06 24" src="https://github.com/user-attachments/assets/eadded2b-2cbc-40a7-bf64-78e50e63044b">
<img width="427" alt="Screenshot 2024-11-26 at 00 06 43" src="https://github.com/user-attachments/assets/09df4859-35e9-46fd-b770-0adb458a6183">
<img width="1722" alt="Screenshot 2024-11-26 at 00 10 01" src="https://github.com/user-attachments/assets/1d675fcf-2be1-4747-8759-7914901ba9a8">
<img width="1727" alt="Screenshot 2024-11-26 at 00 12 00" src="https://github.com/user-attachments/assets/a784f474-3d90-4674-bc45-4c9d3d7cf32b">
<img width="1072" alt="Screenshot 2024-11-26 at 00 18 00" src="https://github.com/user-attachments/assets/cc7109f9-4ced-468c-a0f5-dcc8764434a1">








