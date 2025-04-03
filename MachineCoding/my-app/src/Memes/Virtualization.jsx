import React, { useEffect, useRef, useState } from "react";
import "./Virtualization.css";

const COUNT = 20;
const TOTAL_COUNT = 1000;
const ITEM_HEIGHT = 60;

/**
 * Main steps
 * 1. create a scrollable fixed height container and add scroll event listener and make a reactive
 * property as scrollTop (we need it bcoz on the base of where we are in list we will render list so we
 * need where we are)
 * window has scrollY to know how much the whole page was scrolled but for a element like div etc we use
 * scrollTop.
 * 2. now on the base of scroll position calculate slice the list and render it.
 * 3. important stuff is to render a div with height same as a div will all list items so that the
 * scroll height and range is correct.
 * 4. now as the rendered items will always be rendered just in start so we need to add another div
 * which has transform: translateY() property to position it according to where we are in scroll.
 *
 *
 * transform: translateY()  is impotant as it uses gpu for animations
 * Extra stuff: if i removed transform: translateY() => the scroll event was trigerred infinitely which i
 * was confused about why => it was bcoz the rerender of list items (bcoz of layout reflows) =>
 * Tiny scroll position shifts occur due to layout reflow → another scroll event fires.
 *
 * but when transform: translateY() is there => React does not remove/add DOM elements.
 * It just changes the content inside existing divs.(so No layout reflows)
 *
 *
 *
 * Optimization still that could be done.
 *
 * 1.usememo(), react.memo(), usecallback()
 *
 * 2.requestAnimationFrame is efficient way to call a callback (kind of deboucing but with sync )
 *
 * The frequency of calls to the callback function will generally match the display refresh rate
 * (so smooth transition)
 *
 * requestAnimationFrame() calls are paused in most browsers when running in background tabs or hidden <iframe>s,
 * in order to improve performance and battery life.
 *
 * - Instead of updating scrollTop immediately, we request a frame update using requestAnimationFrame().
 * - The browser waits until just before the next repaint to call the function.
 * - setScrollTop updates only once per frame instead of firing multiple updates per scroll event.
 * - The UI updates smoothly, avoiding layout thrashing.
 *
 * 3.for dynamic heights of list items we can store heights in a ref of list items and then keep computing
 * according to that
 *
 * 4. using transform: translate (read in notes(https://docs.google.com/document/d/1A8qqMaK5QAM3AEyoYSGrRuCc0Psny12PUR4ZLzoWvT4/edit?tab=t.0#heading=h.fd5tbudiw03f) it doesnot cause relayouting and uses gpu rather than cpu)
 */

/** Windowing/Virtualization */

const Virtualization = () => {
  const [list, setList] = useState(
    Array.from({ length: TOTAL_COUNT }, (_, i) => ({
      id: i,
      name: "Item " + (i + 1),
    }))
  );

  const scrollRef = useRef();

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.addEventListener("scroll", handleScroll);
    return () => {
      if (scrollRef.current)
        scrollRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll(e) {
    requestAnimationFrame(() => {
      setScrollTop(scrollRef.current.scrollTop);
    });
  }

  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 5); // i am rendering extra so adding logic of 5
  const endIndex = Math.min(list.length, startIndex + COUNT);

  const renderedList = list.slice(startIndex, endIndex);

  return (
    <div className="v-container">
      <h1>Virtualization</h1>

      <div ref={scrollRef} className="scrollable-block">
        <div style={{ height: ITEM_HEIGHT * TOTAL_COUNT }}>
          <div
            style={{ transform: `translateY(${startIndex * ITEM_HEIGHT}px)` }}
          >
            {renderedList.map((l) => (
              <div key={l.id} className="v-item">
                {l.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Virtualization;
