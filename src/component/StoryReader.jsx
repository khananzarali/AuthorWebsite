import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import styles from "./css/StoryReader.module.css";

const generateSlug = (text) => {
  return String(text).toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)+/g, '');
};

const StoryReader = ({ type }) => {
  const { id } = useParams(); 
  const [item, setItem] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [headings, setHeadings] = useState([]);
  const [error, setError] = useState(null);

  const backLinkPath = type === "story" ? "/writings" : "/";
  const backLinkText = type === "story" ? "← Back to Library" : "← Back to Home";

  useEffect(() => {
    const fetchContent = async () => {
      window.scrollTo(0, 0); 
      setLoading(true);
      setError(null);
      
      const collectionName = type === "story" ? "stories" : "updates";
      const docRef = doc(db, collectionName, String(id));
      
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setItem(data);
          setContent(data.content || "");
          
          // Increment views
          await updateDoc(docRef, {
            views: increment(1)
          });

          // Extract headings for sidebar
          if (data.content) {
            const headingMatches = Array.from(data.content.matchAll(/^(#{2,3})\s+(.*?)\s*$/gm));
            const extractedHeadings = headingMatches.map((match) => ({
              level: match[1].length,
              text: match[2],
              slug: generateSlug(match[2])
            }));
            setHeadings(extractedHeadings);
          }
        } else {
          setError(`This ${type} could not be found.`);
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        setError("Error loading content. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id, type]);

  const [visibleParagraphs, setVisibleParagraphs] = useState(10); // Initially load 10 paragraphs

  // ... (inside fetchContent)
  // setContent(data.content || "");
  // setVisibleParagraphs(10); // Reset when loading new content

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (totalScroll / windowHeight) * 100;
      setProgress(scrollPercentage);

      // Lazy load more paragraphs when scrolled past 70%
      if (scrollPercentage > 70 && content) {
        const totalParagraphs = content.split('\n\n').length;
        if (visibleParagraphs < totalParagraphs) {
          setVisibleParagraphs(prev => Math.min(prev + 10, totalParagraphs));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content, visibleParagraphs]);

  const scrollToHeading = (e, slug) => {
    e.preventDefault();
    
    // Force show all paragraphs so the heading is rendered in the DOM
    if (content) {
      setVisibleParagraphs(content.split('\n\n').length);
    }

    // Give React a moment to render the newly visible content
    setTimeout(() => {
      const element = document.getElementById(slug);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
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

  if (error) {
    return (
      <div className={styles.notFound}>
        <h2>{error}</h2>
        <Link to={backLinkPath}>{backLinkText}</Link>
      </div>
    );
  }

  // Calculate visible content safely
  const visibleText = content ? content.split('\n\n').slice(0, visibleParagraphs).join('\n\n') : "";

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
          
          {loading ? (
            <p className={styles.loading}>Loading manuscript...</p>
          ) : (
            <>
              <h1 className={styles.title}>{item?.title}</h1>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", color: "#666", fontStyle: "italic" }}>
                <span>{type === "update" && item?.date ? `Posted on ${item.date}` : ""}</span>
                <span>{item?.views ? `${item.views} views` : ""}</span>
              </div>

              <div className={styles.markdownContent}>
                <ReactMarkdown components={customRenderers}>
                  {visibleText}
                </ReactMarkdown>
                {content && visibleParagraphs < content.split('\n\n').length && (
                  <div className={styles.loadingMore}>
                    <p style={{textAlign: "center", color: "var(--text-medium)", fontStyle: "italic"}}>Loading more pages...</p>
                  </div>
                )}
              </div>
            </>
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