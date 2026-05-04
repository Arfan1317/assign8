# 🌐 SkillSphere

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=14b8a6)

SkillSphere is a modern, responsive learning management web application designed to track student progress, manage enrolled courses, and provide a seamless, personalized user profile experience. 

### 🚀 **[View Live Demo on Vercel](https://skillsphere-8.vercel.app/)**

## ✨ Key Features

* **🔐 Secure Authentication:** Seamless user login, registration, and session management powered by NextAuth.js.
* **🎓 Course Management:** Users can view their active enrollments, course ratings, and categories via a beautifully designed dashboard.
* **👤 Dynamic User Profiles:** Fully editable user profiles featuring live-updating avatars, fallback UI-Avatar integration, and persistent database storage.
* **🧠 Smart Image Parsing Engine:** Features a custom-built URL extractor that automatically sanitizes and bypasses strict image hosting protocols:
  * Automatically extracts raw image files from massive Google Image Search links.
  * Utilizes Google's hidden `lh3` server API to bypass strict Google Drive CORS restrictions for profile pictures.
  * Auto-corrects Imgur album links into direct `.jpg` rendering links.
* **📱 Fully Responsive UI:** Built with a mobile-first approach using Tailwind CSS and DaisyUI, ensuring the platform looks perfect on any device.
* **🔔 Real-time Feedback:** Integrated `react-toastify` for instant, elegant user notifications during database updates.

## 🛠️ Tech Stack

**Frontend:**
* [Next.js](https://nextjs.org/) (App Router)
* [React](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [DaisyUI](https://daisyui.com/)

**Backend & Database:**
* [NextAuth.js](https://next-auth.js.org/) (Authentication & Session Management)
* [MongoDB](https://www.mongodb.com/) (Atlas Cluster for User Data)
* Next.js API Routes (RESTful endpoints)

**Utilities:**
* `react-toastify` (Toasts & Notifications)
* UI-Avatars API (Fallback Profile Generators)

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Arfan1317/assign8.git
cd assign8

2. Install dependencies
Bash

npm install

3. Set up Environment Variables

Create a .env or .env.local file in the root directory and add your secret keys:
Code snippet

# Database Connection
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_SECRET=your_super_secret_string
NEXTAUTH_URL=http://localhost:3000

4. Run the development server
Bash

npm run dev

Open http://localhost:3000 with your browser to see the live result.

📝 License

This project is open-source and available under the MIT License.