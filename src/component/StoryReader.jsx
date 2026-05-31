import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { storiesData } from "../data/stories"; 
import { updatesData } from "../data/updates"; 
import styles from "./css/StoryReader.module.css";

const generateSlug = (text) => {
  return String(text).toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)+/g, '');
};

const StoryReader = ({ type }) => {
  const { id } = useParams(); 
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [headings, setHeadings] = useState([]);

  // 1. Determine which data array to use based on the 'type' prop
  const dataSource = type === "story" ? storiesData : updatesData;
  const item = dataSource.find((s) => s.id === parseInt(id));

  // 2. Set up dynamic UI text based on what we are reading
  const backLinkPath = type === "story" ? "/writings" : "/";
  const backLinkText = type === "story" ? "← Back to Library" : "← Back to Home";
  const notFoundText = type === "story" ? "Story not found" : "Update not found";

  useEffect(() => {
    if (item) {
      window.scrollTo(0, 0); 
      setLoading(true); // Reset loading when switching items
      
      fetch(item.fileName)
        .then((response) => response.text())
        .then((text) => {
          setContent(text);
          setLoading(false);
          
          const headingMatches = Array.from(text.matchAll(/^(#{2,3})\s+(.*?)\s*$/gm));
          const extractedHeadings = headingMatches.map((match) => ({
            level: match[1].length,
            text: match[2],
            slug: generateSlug(match[2])
          }));
          
          setHeadings(extractedHeadings);
        })
        .catch((error) => {
          console.error(`Error loading ${type}:`, error);
          setContent("Sorry, this manuscript could not be found.");
          setLoading(false);
        });
    }
  }, [id, item, type]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (totalScroll / windowHeight) * 100;
      setProgress(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (e, slug) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const extractTextContent = (children) => {
    return Array.isArray(children) ? children[0] : children;
  };

  const customRenderers = {
    h2: ({ children, ...props }) => (
      <h2 id={generateSlug(extractTextContent(children))} {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 id={generateSlug(extractTextContent(children))} {...props}>{children}</h3>
    )
  };

  if (!item) {
    return (
      <div className={styles.notFound}>
        <h2>{notFoundText}</h2>
        <Link to={backLinkPath}>{backLinkText}</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>

      <div className={styles.pageLayout}>
        <div className={styles.readerContainer}>
          

          <Link to={backLinkPath} className={styles.backLink}>
            {backLinkText}
          </Link>
          
          <h1 className={styles.title}>{item.title}</h1>

          {type === "update" && item.date && (
            <p style={{ fontStyle: "italic", marginBottom: "30px", color: "#666" }}>
              Posted on {item.date}
            </p>
          )}
          
          {loading ? (
            <p className={styles.loading}>Loading manuscript...</p>
          ) : (
            <div className={styles.markdownContent}>
              <ReactMarkdown components={customRenderers}>
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!loading && headings.length > 0 && (
          <aside className={styles.sidebar}>
            <div className={styles.indexBox}>
              <h3 className={styles.indexTitle}>Contents</h3>
              <ul className={styles.indexList}>
                {headings.map((heading, index) => (
                  <li 
                    key={index} 
                    style={{ paddingLeft: heading.level === 3 ? "15px" : "0px" }}
                  >
                    <button 
                      onClick={(e) => scrollToHeading(e, heading.slug)} 
                      className={styles.indexLink}
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </motion.div>
  );
};

export default StoryReader;