

DATABASE_URL=postgres://username:password@localhost:5432/taskdb
JWT_SECRET=your_secret_key

Run the backend:

go mod tidy
go run main.go

Frontend Setup

Navigate to frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Deployment

Deploy Backend on Render

Create a new web service on Render

Connect your GitHub repository

Set up environment variables (DATABASE_URL, JWT_SECRET)

Deploy the backend

Deploy Backend on Fly.io

Install Fly CLI:

curl -L https://fly.io/install.sh | sh

Authenticate and deploy:

flyctl auth login
flyctl launch
flyctl deploy

Deploy Frontend on Vercel

Install Vercel CLI:

npm install -g vercel

Deploy the frontend:

vercel

API Endpoints

Authentication

POST /register - Register a new user

POST /login - Authenticate user and get JWT

Tasks

POST /tasks - Create a new task



![image](https://github.com/user-attachments/assets/6b566473-48d3-49fe-89c4-f82cd0d13f1e)

GET /tasks - Get all tasks

PUT /tasks/:id - Update task status

DELETE /tasks/:id - Delete a task
