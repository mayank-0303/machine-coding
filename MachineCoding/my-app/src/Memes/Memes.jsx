import React, { useEffect, useRef, useState } from "react";
import "./Memes.css";

// most important
// document.addEventListener("scroll", handleScroll); as i was addding to document.body and it doesnot work

// for intersection api , remember 1st time we put observer it will execrute the callback
const Memes = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMemes();
          console.log("executed");
        }
      },
      {
        root: null, // if not given still null, which means root will be viewport
        rootMargin: "0px",
        threshold: 0,
      }
    );
    observer.observe(loadingRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  // using intersection observer api...

  // using scroll event listener...
  // useEffect(() => {
  //   fetchMemes();
  ////.......                                         i was adding to body but we need to add to document
  //   document.addEventListener("scroll", handleScroll);
  //   return () => {
  //     document.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // function handleScroll() {
  //   if (
  //     window.scrollY + window.innerHeight >= document.body.scrollHeight - 100 &&
  //     !loading
  //   ) {
  //     fetchMemes();
  //   }
  // }

  async function fetchMemes() {
    try {
      setLoading(true);
      const res = await fetch("https://meme-api.com/gimme/10");
      const { count, memes } = await res.json();
      setMemes((oldMemes) => [...oldMemes, ...memes]);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="memes-section">
      <h2>Memes</h2>
      <div className="memes-container">
        {memes.map((meme, i) => (
          <div className="meme-section" key={i}>
            <img className="meme-img" src={meme.url} alt={meme.postLink} />
            <div className="meme-info">{meme.title}</div>
          </div>
        ))}
        {loading &&
          Array.from({ length: 10 }).map((s, i) => (
            <div className="meme-section-skeleton" key={i}></div>
          ))}
      </div>
      <div ref={loadingRef} className="loader-block"></div>
    </div>
  );
};

export default Memes;
