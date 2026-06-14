import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { getCache, setCache } from "../utils/cache";
import styles from "./css/Home.module.css"; 

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
    const [updatesData, setUpdatesData] = useState([]);
    const [loadingUpdates, setLoadingUpdates] = useState(true);

    // Prefetch markdown file on hover
    const prefetchFile = (fileName) => {
        if (fileName) {
            fetch(fileName).catch(() => {});
        }
    };

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const cachedUpdates = getCache("author_updates");
                if (cachedUpdates) {
                    setUpdatesData(cachedUpdates);
                    setLoadingUpdates(false);
                    return;
                }

                const querySnapshot = await getDocs(collection(db, "updates"));
                const updatesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                updatesList.sort((a, b) => b.id - a.id);
                setCache("author_updates", updatesList, 1440);
                setUpdatesData(updatesList);
            } catch (e) {
                console.error("Error fetching updates: ", e);
            } finally {
                setLoadingUpdates(false);
            }
        };
        fetchUpdates();
    }, []);

    const Skeletons = () => (
        <>
            {[1, 2, 3].map((n) => (
                <div key={n} className={styles.timelineItem}>
                    <div className={styles.skeletonTimelineContent}>
                        <div className={styles.skeletonDate}></div>
                        <div className={styles.skeletonTitle}></div>
                        <div className={styles.skeletonText}></div>
                        <div className={styles.skeletonText} style={{ width: '80%' }}></div>
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <section className={styles.heroSection}>
                <motion.div className={styles.imageColumn} variants={itemVariants}>
                    <img src="/bookcover.webp" alt="Mountain Pass" loading="lazy" />
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
                        onMouseEnter={() => prefetchFile('/MountainPass.md')}
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
                    {loadingUpdates ? <Skeletons /> : updatesData.slice(0, 3).map((update, index) => (
                        <motion.div 
                            key={update.id} 
                            className={styles.timelineItem}
                            variants={itemVariants}
                            custom={index}
                        >
                            <div className={styles.timelineContent}>
                                <div className={styles.timelineDate}>{update.date}</div>
                                
                                <h3>
                                    <Link 
                                        to={`/update/${update.id}`} 
                                        className={styles.updateLink}
                                        onMouseEnter={() => prefetchFile(update.fileName)}
                                    >
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