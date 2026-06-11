import { Link, useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import styles from "./css/Home.module.css"; 
import { updatesData } from "../data/updates"; 

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20
    }
  }
};

const Home = () => {
    const navigate = useNavigate();

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <section className={styles.heroSection}>
                <motion.div className={styles.imageColumn} variants={itemVariants}>
                    <img src="/bookcover.jpg" alt="Mountain Pass" />
                </motion.div>
                <motion.div className={styles.textColumn} variants={itemVariants}>
                    <h1>Heaven Behind The Mountain Pass</h1>
                    <p>An adventure story set in the Mountains of Kashmir about the quiet corners of magic, the importance of found family, and learning to love ourselves.</p>
                    <p className={styles.expectedDate}><strong>Expected Date:</strong> December 2027</p>
                    <motion.button 
                        className={styles.ctaButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/story/1')}
                    >
                        Learn More
                    </motion.button>
                </motion.div>
            </section>
            
            <section className={styles.updatesSection}>
                <motion.div className={styles.updatesHeader} variants={itemVariants}>
                    <h2>Updates</h2>
                    <hr className={styles.divider}></hr>
                    <p>Timeline of recent works and announcements.</p>
                </motion.div>
                
                <div className={styles.timeline}>
                    {updatesData.map((update, index) => (
                        <motion.div 
                            key={update.id} 
                            className={styles.timelineItem}
                            variants={itemVariants}
                            custom={index}
                        >
                            <div className={styles.timelineContent}>
                                <div className={styles.timelineDate}>{update.date}</div>
                                
                                <h3>
                                    <Link to={`/update/${update.id}`} className={styles.updateLink}>
                                        {update.title}
                                    </Link>
                                </h3>
                                {update.type && <span className={styles.tag}>{update.type}</span>}
                                <p>{update.description}</p>
                                
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
};

export default Home;