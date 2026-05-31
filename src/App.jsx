import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Writings from "./component/Writings";
import StoryReader from "./component/StoryReader";
import Recommendations from "./component/Recommendations";
import styles from "./App.module.css";

const App = () => {
  return (
    <BrowserRouter>
      <header className={styles.header}>
        <div className={styles.siteName}>Anzar Ali Khan</div>
        <nav className={styles.navLinks}>
          <Link to="/">Home</Link>
          <Link to="/writings">Writings</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writings" element={<Writings />} />
          <Route path="/about" element={<About />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/story/:id" element={<StoryReader type="story" />} />
          <Route path="/update/:id" element={<StoryReader type="update" />} />
        </Routes>
      </main>
<footer className={styles.footer}>
        {/* We wrap the icons in this div to control their spacing! */}
        <div className={styles.socialIcons}>
          
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className={styles.socialLink}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className={styles.socialLink}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>

          <a href="https://www.reddit.com" target="_blank" rel="noreferrer" aria-label="Reddit" className={styles.socialLink}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 8c2.648 0 5.028.826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59-4.03 6.5-9 6.5-4.875 0-8.845-2.8-9-6.294l-1-.206a2.5 2.5 0 0 1 2.326-4.36C5.972 8.826 8.352 8 12 8z"></path>
              <path d="M12 8V3l6 1"></path>
              <circle cx="19" cy="4" r="1"></circle>
              <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none"></circle>
              <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none"></circle>
              <path d="M10 17c.667.333 1.333.5 2 .5s1.333-.167 2-.5"></path>
            </svg>
          </a>

        </div>
      </footer>
    </BrowserRouter>
  );
};

export default App;