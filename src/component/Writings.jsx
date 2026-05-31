import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { storiesData } from "../data/stories";
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
  const books = storiesData.filter(story => story.type === "book");
  const shortStories = storiesData.filter(story => story.type === "short story");
  const articles = storiesData.filter(story => story.type === "article");

  return (
    <motion.div 
      className={styles.writingsContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className={styles.pageTitle} variants={itemVariants}>My Library</motion.h1>
      
      {books.length > 0 && (
        <motion.div className={styles.section} variants={containerVariants}>
          <motion.h2 className={styles.sectionHeading} variants={itemVariants}>Books</motion.h2>
          <ul className={styles.list}>
            {books.map(story => (
              <motion.li key={story.id} className={styles.listItem} variants={itemVariants}>
                <Link to={`/story/${story.id}`} className={styles.storyLink}>
                  {story.title}
                </Link>
                {story.meta && <span className={styles.metaText}>{story.meta}</span>}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {shortStories.length > 0 && (
        <motion.div className={styles.section} variants={containerVariants}>
          <motion.h2 className={styles.sectionHeading} variants={itemVariants}>Short Stories</motion.h2>
          <ul className={styles.list}>
            {shortStories.map(story => (
              <motion.li key={story.id} className={styles.listItem} variants={itemVariants}>
                <Link to={`/story/${story.id}`} className={styles.storyLink}>
                  {story.title}
                </Link>
                {story.meta && <span className={styles.metaText}>{story.meta}</span>}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {articles.length > 0 && (
        <motion.div className={styles.section} variants={containerVariants}>
          <motion.h2 className={styles.sectionHeading} variants={itemVariants}>Articles</motion.h2>
          <ul className={styles.list}>
            {articles.map(story => (
              <motion.li key={story.id} className={styles.listItem} variants={itemVariants}>
                <Link to={`/story/${story.id}`} className={styles.storyLink}>
                  {story.title}
                </Link>
                {story.meta && <span className={styles.metaText}>{story.meta}</span>}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Writings;