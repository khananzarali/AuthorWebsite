import { motion } from 'framer-motion';
import styles from './css/About.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 60 }
  }
};

const About = () => {
  return (
    <motion.div 
      className={styles.aboutContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className={styles.aboutTitle} variants={itemVariants}>About the Author</motion.h1>
      
      <div className={styles.aboutContent}>
        <motion.p variants={itemVariants}>
          Hello, I'm Anzar Ali Khan. I am a writer of richly imagined, dark, and dazzling cosy fantasy. 
          I have spent most of my life surrounded by books, tea, and half-finished manuscripts, 
          dreaming up worlds where magic hides just beneath the surface of the mundane.
        </motion.p>
        
        <motion.p variants={itemVariants}>
          My debut novel, <em>Heaven Behind The Mountain Pass</em>, explores the quiet corners of magic, the importance 
          of found family, and learning to love ourselves. When I am not writing, you can usually 
          find me exploring overgrown gardens, collecting vintage teacups, or reading late into the night. 
        </motion.p>
        
        <motion.p variants={itemVariants}>
          I currently reside in Kashmir with a towering stack of books I swear I will read eventually.
        </motion.p>

        <motion.div className={styles.contactCard} variants={itemVariants}>
          <h2>Get in Touch</h2>
          <p>
            For literary representation, rights inquiries, or just to say hello, I would absolutely love to hear from you. 
            You can reach me directly via email.
          </p>
          <p className={styles.email}>
            <strong>Email:</strong> khananzarali7@gmail.com
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;