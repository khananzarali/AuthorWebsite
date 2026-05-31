import { motion } from 'framer-motion';
import styles from './css/Recommendations.module.css';

const Recommendations = () => {
  return (
    <motion.div 
      className={styles.recommendationsContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className={styles.pageTitle}>Recommendations</h1>
      <p className={styles.comingSoon}>Coming soon...</p>
    </motion.div>
  );
};

export default Recommendations;