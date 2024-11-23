Here’s the updated README with the Docker pull instructions for your assignment:

Project Overview

This repository contains a full-stack web application with both client and server components. The client is a React app, and the server is built with Node.js/Express. The project uses Docker for containerization and Kubernetes (Minikube) for local deployment and orchestration. Additionally, there is a load test script provided using k6.

Project Structure

.
├── client/                 # React frontend application
│   ├── Dockerfile
│   ├── package.json        # Frontend dependencies
│   └── src/                # React app source code=[]
│   └── deployment/         # Kubernetes deployment files for client
│
├── server/                 # Backend Node.js server
│   ├── Dockerfile
│   ├── package.json        # Backend dependencies
│   └── src/                # Server source code
│   └── deployment/         # Kubernetes deployment files for server
│
├── loadtest/               # Load testing folder using k6
│   └── loadtest.js         # k6 load test script
│
└── README.md               # Project documentation

Getting Started

Prerequisites

Before getting started, you need to have the following tools installed:
	•	Node.js (v14+)
	•	Docker (for containerization)
	•	Minikube (for Kubernetes)
	•	kubectl (Kubernetes CLI)
	•	k6 (for load testing)

Setup Instructions

1. Clone the repository

git clone <repository-url>
cd <project-folder>

Running the Application

The project consists of two parts: Client (React) and Server (Node.js).

2. Start the Client

To start the client, navigate to the client folder and run:

cd client
npm install   # Install client dependencies
npm start     # Start the client in development mode

The client will be available at http://localhost:3000.

3. Start the Server

To start the server, navigate to the server folder and run:

cd server
npm install   # Install server dependencies
npm start     # Start the server (default port: 4000)

The server will be available at http://localhost:4000.

Dockerization

If you want to use pre-built Docker images instead of building them yourself, you can pull the images from Docker Hub.

4. Docker Pull & Run

	1.	Pull the Client Docker image:

docker pull senthamizhko2024/client:latest


	2.	Run the Client Docker container:

docker run -d -p 8080:80 --name client-container senthamizhko2024/client:latest


	3.	Pull the Server Docker image:

docker pull senthamizhko2024/server:latest


	4.	Run the Server Docker container:

docker run -d -p 4000:4000 --name server-container senthamizhko2024/server:latest



5. Kubernetes (Minikube)

	1.	Start Minikube:

minikube start


	2.	Apply Kubernetes Configurations:
Once Minikube is running, apply the Kubernetes deployment and service configurations:
	•	For the client:

kubectl apply -f kubernetes/client-deployment.yaml
kubectl apply -f kubernetes/client-service.yaml


	•	For the server:

kubectl apply -f kubernetes/server-deployment.yaml
kubectl apply -f kubernetes/server-service.yaml


	3.	Check if pods are running:

kubectl get pods


	4.	Check if services are available:

kubectl get svc


	5.	Access the services:
	•	Use Minikube Tunnel to access services from outside:

minikube tunnel


	•	Or, use:

minikube service <service-name>



Load Testing with k6

A load testing script is provided in the losstaat folder using k6. It can be used to test the performance of the GraphQL API.
	1.	Install k6:
If you don’t have k6 installed, you can install it by following the instructions here.
	2.	Run the load test:
Inside the losstaat folder, run the following command to execute the load test:

cd losstaat
k6 run loadtest.js

This will simulate traffic to the server (running at port 64097 in Minikube) and check for performance.

Additional Notes

	•	The server runs at port 4000, and you can access it from the local Kubernetes service.
	•	The k6 test will send GraphQL queries to the server to validate if it’s responsive and the data structure is correct.
	•	To see the results of the load test, k6 will output the results in your terminal with details about the number of requests and response times.

Troubleshooting

If you run into issues while setting up or running the application:
	•	Docker issues:
	•	Make sure Docker is running and the Docker daemon is accessible.
	•	Verify that the correct ports are exposed (e.g., 8080 for the client and 4000 for the server).
	•	Minikube issues:
	•	Ensure Minikube is started correctly and that kubectl is configured to use the Minikube context (kubectl config current-context should show minikube).
	•	Load Testing issues:
	•	Ensure the server is running and accessible from the load test script by verifying the Minikube service URL.

This updated README now includes the docker pull commands for both the client and server Docker images, making it easier for your interviewers to run the application without building the images themselves.