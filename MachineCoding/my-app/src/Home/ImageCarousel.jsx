import { useEffect, useRef, useState } from "react";

export const ImageCarousel = () => {
  const [selected, setSelected] = useState(0);
  const [images, setImages] = useState([]);
  const cREf = useRef();
  const widthC = cREf.current?.getBoundingClientRect()?.width;

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSelected((old) => {
        return old === images.length - 1 ? 0 : old + 1;
      });
    }, 3000);
    return () => {
      clearInterval(timerId);
    };
  }, [images]);

  const fetchImages = async () => {
    try {
      const response = await fetch("https://meme-api.com/gimme/5");
      const images = await response.json();
      setImages(
        images.memes.map((image) => image.preview[image.preview.length - 1])
      );
    } catch (e) {
    } finally {
    }
  };

  return (
    <div>
      <div ref={cREf} className="image-carosel-container">
        <div
          className="scrollabel"
          style={{
            transform: `translateX(-${selected * widthC}px)`,
          }}
        >
          {images.map((image, i) => (
            <img src={image} alt="ACCessibiliy" key={i} className="image" />
          ))}
        </div>
        <div className="shifter">
          {images.map((image, i) => {
            return (
              <div
                key={i}
                className="shift-circle"
                style={{
                  backgroundColor: i === selected ? "black" : "white",
                }}
                onClick={() => setSelected(i)}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
