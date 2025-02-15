Task Management Tool 📝
A responsive task management application built with React.js, TypeScript, Firebase Authentication, and Firestore.

🚀 Live Demo
🔗 [Live Project URL](https://task-management-tool-84bc6.web.app)

📌 Features Implemented
User Authentication: Google Sign-In via Firebase.
Task Management: Create, edit, delete tasks.
Categories & Due Dates: Organize tasks with categories and deadlines.
Task Filtering & Sorting: Sort tasks by due date, status, and categories.
Task History: Track all task updates and changes.
Drag and Drop: Reorder tasks using drag-and-drop functionality.
Batch Actions: Perform bulk operations on tasks.
Multiple Views: Switch between Board and List views.
Responsive UI: Works seamlessly across mobile, tablet, and desktop devices.
🛠 Tech Stack
Frontend: React.js (TypeScript), React Query, Firebase
Backend: Firebase Firestore
Authentication: Firebase Authentication (Google Sign-In)
Deployment: Vercel / Netlify / Firebase Hosting
⚙️ How to Run the Project Locally
1️⃣ Clone the repository

bash
Copy
Edit
git clone https://github.com/YOUR_USERNAME/task-management-tool.git
cd task-management-tool
2️⃣ Install dependencies

bash
Copy
Edit
npm install
3️⃣ Set up Firebase
Go to Firebase Console.
Create a project and enable Firestore & Authentication (Google Sign-In).
Get your Firebase config and create a .env file in the root folder:

env
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
4️⃣ Run the development server

bash
Copy
Edit
npm run dev
Your app will run at http://localhost:5173/ (if using Vite).

🧑‍💻 Challenges Faced & Solutions
1️⃣ Firebase Authentication Issues
Problem: Firebase authentication setup was confusing.
✅ Solution: Read Firebase docs, enabled Google Sign-In, and tested with dummy accounts.

2️⃣ State Management
Problem: Managing task states globally was complex.
✅ Solution: Used React Context + React Query for optimized state updates.

3️⃣ Drag & Drop Implementation
Problem: Tasks were not updating in real-time when dragged.
✅ Solution: Used react-beautiful-dnd and updated Firestore state properly.

📡 Deployment
This project is deployed on Firebase Hosting.
🔗 [Live Project URL](https://task-management-tool-84bc6.web.app)

📬 Contact
👤 Kamesh S
📧 Email: kameshs662@gmail.com
📍 Location: Bangalore, India

Feel free to reach out if you need any further modifications!
