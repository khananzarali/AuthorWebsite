# 📚 Anzar Ali Khan - Author Website

Welcome to the official author website for **Anzar Ali Khan**, a writer of richly imagined, dark, and dazzling cosy fantasy.

This repository contains the source code for a fully responsive, modern web application built with **React** and **Vite**. The design has been meticulously crafted to reflect the premium, magical, and cozy aesthetic of the author's work, providing readers with an immersive and seamless experience.

---

## ✨ Features & Enhancements

I have heavily customized and improved the website to ensure it feels dynamic, premium, and deeply engaging for visitors.

### 1. 🎨 Premium UI & Glassmorphism Design
- **Refined Color Palette:** Implemented a sophisticated off-white background paired with vibrant gold accents, creating a high-end literary atmosphere.
- **Glassmorphic Header:** The top navigation bar now features a sleek, blurred glassmorphism effect that gently reveals content as users scroll down.
- **Card UI:** Timeline updates, reading lists, and contact information have been beautifully contained within elevated cards boasting soft borders, deep shadows, and interactive hover lifts.

### 2. 🎬 Dynamic Animations
- Powered by `framer-motion`, the website feels alive and responsive.
- **Staggered Fade-Ins:** Content gracefully cascades into view when visiting pages like *Home* or *Writings*.
- **Spring Physics:** Buttons, hero images, and timeline items feature subtle, satisfying bounce and hover-scaling effects to encourage user interaction.
- **Smooth Page Transitions:** Reader interfaces elegantly fade in, minimizing jarring jumps between views.

### 3. 📖 Google Books "Daily Recommendation" System
- Built a custom **Book of the Day** engine on the *Recommendations* page.
- Securely integrates with the **Google Books API** to fetch top-tier fantasy and magic novels.
- **Smart Rotation & Caching:** The algorithm uses the current date to guarantee a fresh recommendation exactly once every 24 hours. The result is cached locally in the browser (`localStorage`), ensuring zero-latency loads on subsequent visits and heavily reducing unnecessary API requests.

### 4. 📝 Integrated Markdown Reader
- Utilizes `react-markdown` to seamlessly convert local `.md` files into beautifully styled reading experiences.
- Includes a dynamic sidebar with an automatically generated **Table of Contents** for easy navigation through chapters and updates.
- Clicking **"Learn More"** on the homepage elegantly routes the user to a detailed synopsis of *Heaven Behind The Mountain Pass*, keeping the user inside the seamless Single Page Application ecosystem.

---

## 🛠 Tech Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router DOM v7
- **Styling:** Vanilla CSS (CSS Modules)
- **Animations:** Framer Motion
- **Markdown Parsing:** React Markdown

---

## 🚀 Running Locally

To run this project on your own machine:

### 1. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 2. Set Up Environment Variables (API Key)
To enable the Google Books Recommendation feature, create a file named `.env` in the root of the project and add your API key:
```env
VITE_GOOGLE_BOOKS_API_KEY=your_actual_api_key_here
```

### 3. Start the Development Server
```bash
npm run dev
```
The site will be available locally, usually at `http://localhost:5173`.

### 4. Build for Production
To generate the highly optimized production bundle:
```bash
npm run build
```

---

## ✍️ Why I Built It This Way

An author's website should be more than just a digital business card; it should be an extension of their storytelling. 

By avoiding heavy UI libraries like Tailwind and instead relying on precise **Vanilla CSS Modules**, we maintain total control over the exact aesthetic tone—achieving the specific "cozy fantasy" vibe. Integrating **Framer Motion** bridges the gap between static text and interactive experience, making the user's journey through the library feel magical. Finally, the **Daily Recommendation System** is designed to give readers a reason to keep coming back every single day, fostering a dedicated community.

*Designed with magic and tea. ☕✨*