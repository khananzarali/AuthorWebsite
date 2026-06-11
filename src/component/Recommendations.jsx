import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './css/Recommendations.module.css';

const CACHE_KEY = 'authorWebsite_dailyBook';
const CACHE_DATE_KEY = 'authorWebsite_bookDate';

const Recommendations = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookOfTheDay = async () => {
      try {
        const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const cachedDate = localStorage.getItem(CACHE_DATE_KEY);
        const cachedBook = localStorage.getItem(CACHE_KEY);

        // If we already have a book for today, use it!
        if (cachedDate === todayStr && cachedBook) {
          setBook(JSON.parse(cachedBook));
          setLoading(false);
          return;
        }

        // Otherwise, fetch a new book
        // We use the day since epoch to deterministically cycle through results
        const dayIndex = Math.floor(Date.now() / 86400000);
        const startIndex = dayIndex % 100; // Loop through top 100 fantasy books
        
        const query = 'subject:fantasy';
        let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=1&langRestrict=en`;
        
        // Use API Key if it's provided in the environment variables
        const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
        if (apiKey) {
          url += `&key=${apiKey}`;
        }

        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          const fetchedBook = data.items[0].volumeInfo;
          setBook(fetchedBook);
          
          // Cache it for the rest of the day
          localStorage.setItem(CACHE_DATE_KEY, todayStr);
          localStorage.setItem(CACHE_KEY, JSON.stringify(fetchedBook));
        } else {
          throw new Error("No books found");
        }
      } catch (err) {
        console.error("Error fetching recommendation:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBookOfTheDay();
  }, []);

  return (
    <motion.div 
      className={styles.recommendationsContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className={styles.pageTitle}>Book of the Day</h1>
      <p className={styles.subtitle}>Discover a new magical world every 24 hours.</p>

      {loading ? (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Unearthing a magical tome...</p>
        </div>
      ) : error ? (
        <div className={styles.errorBox}>
          <p>The library is currently closed. Please check back later for a new recommendation!</p>
        </div>
      ) : book && (
        <motion.div 
          className={styles.bookCard}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
        >
          <div className={styles.bookCover}>
            {book.imageLinks?.thumbnail ? (
              <img src={book.imageLinks.thumbnail.replace('http:', 'https:')} alt={`${book.title} cover`} />
            ) : (
              <div className={styles.noCover}>No Cover Available</div>
            )}
          </div>
          
          <div className={styles.bookInfo}>
            <h2>{book.title}</h2>
            {book.authors && <h3 className={styles.author}>by {book.authors.join(', ')}</h3>}
            
            <div className={styles.description}>
              {book.description ? (
                <p>{book.description.length > 400 ? book.description.substring(0, 400) + '...' : book.description}</p>
              ) : (
                <p><em>No description available for this enchanting read.</em></p>
              )}
            </div>
            
            <div className={styles.meta}>
              {book.categories && <span className={styles.tag}>{book.categories[0]}</span>}
              {book.pageCount && <span className={styles.tag}>{book.pageCount} pages</span>}
            </div>

            {book.infoLink && (
              <a href={book.infoLink} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
                Read More on Google Books
              </a>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Recommendations;
