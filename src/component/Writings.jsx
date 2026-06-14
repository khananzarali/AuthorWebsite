import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getCache, setCache } from "../utils/cache";
import styles from './css/Writings.module.css'; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 70 }
  }
};

const Writings = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Prefetch markdown file on hover
  const prefetchFile = (fileName) => {
    if (fileName) {
      fetch(fileName).catch(() => {});
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const cachedStories = getCache("author_stories");
        if (cachedStories) {
          setStories(cachedStories);
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(collection(db, "stories"));
        const storiesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setCache("author_stories", storiesList, 1440);
        setStories(storiesList);
      } catch (e) {
        console.error("Error fetching stories: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const books = stories.filter(story => story.type === "book").slice(0, 5);
  const shortStories = stories.filter(story => story.type === "short story").slice(0, 5);
  const articles = stories.filter(story => story.type === "article").slice(0, 5);

  const Skeletons = () => (
    <ul className={styles.list}>
      {[1, 2, 3].map(n => (
        <li key={n} className={styles.listItem}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonMeta}></div>
        </li>
      ))}
    </ul>
  );

  return (
    <motion.div 
      className={styles.writingsContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className={styles.pageTitle} variants={itemVariants}>My Library</motion.h1>
      
      <motion.div className={styles.section} variants={containerVariants}>
        <motion.h2 className={styles.sectionHeading} variants={itemVariants}>Books</motion.h2>
        {loading ? <Skeletons /> : (
          <ul className={styles.list}>
            {books.map(story => (
              <motion.li key={story.id} className={styles.listItem} variants={itemVariants}>
                <Link 
                  to={`/story/${story.id}`} 
                  className={styles.storyLink}
                  onMouseEnter={() => prefetchFile(story.fileName)}
                >
                  {story.title}
                </Link>
                {story.meta && <span className={styles.metaText}>{story.meta} • {story.views || 0} views</span>}
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div className={styles.section} variants={containerVariants}>
        <motion.h2 className={styles.sectionHeading} variants={itemVariants}>Short Stories</motion.h2>
        {loading ? <Skeletons /> : (
          <ul className={styles.list}>
            {shortStories.map(story => (
              <motion.li key={story.id} className={styles.listItem} variants={itemVariants}>
                <Link 
                  to={`/story/${story.id}`} 
                  className={styles.storyLink}
                  onMouseEnter={() => prefetchFile(story.fileName)}
                >
                  {story.title}
                </Link>
                {story.meta && <span className={styles.metaText}>{story.meta} • {story.views || 0} views</span>}
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div className={styles.section} variants={containerVariants}>
        <motion.h2 className={styles.sectionHeading} variants={itemVariants}>Articles</motion.h2>
        {loading ? <Skeletons /> : (
          <ul className={styles.list}>
            {articles.map(story => (
              <motion.li key={story.id} className={styles.listItem} variants={itemVariants}>
                <Link 
                  to={`/story/${story.id}`} 
                  className={styles.storyLink}
                  onMouseEnter={() => prefetchFile(story.fileName)}
                >
                  {story.title}
                </Link>
                {story.meta && <span className={styles.metaText}>{story.meta} • {story.views || 0} views</span>}
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Writings;