import React, { useState, useEffect, useRef } from "react";
/*
    Autocomplete with cache and debounce
*/

const AutoCompleteInput = () => {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [showList, setShowList] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // this is deboucing with useEffect
  useEffect(() => {
    //remember useEffect is synchronous we cannot call api here with async await
    const timeoutId = setTimeout(() => fetchSearchResult(search.trim()), 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  const fetchSearchResult = async (search) => {
    let newItems = [];
    const cacheItem = sessionStorage.getItem(search);
    try {
      if (search) {
        if (cacheItem) {
          newItems = JSON.parse(cacheItem);
        } else {
          const response = await fetch(
            `https://www.google.co.in/complete/search?q=${search}&cp=2&client=gws-wiz&xssi=t&gs_pcrt=undefined&hl=en-IN&authuser=0&psi=R3TmZ931I8_L0-kPvsaFgQY.1743156296146&dpr=2`
          );

          //extra stuff so to use gooogle api
          const text = await response.text(); // Get response as text
          const cleanedText = text.replace(")]}'", ""); // Remove security prefix

          const searchList = JSON.parse(cleanedText); // Now safely parse JSON
          sessionStorage.setItem(search, JSON.stringify(searchList[0]));
          newItems = searchList[0];
        }
      }
    } catch (error) {}
    setSearchList(newItems);
  };

  return (
    <div ref={searchRef} className="search-container">
      <input
        type="text"
        name="search-bar"
        className="search-input"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => {
          setShowList(true);
        }}
      />
      {searchList.length > 0 && showList && (
        <div className="search-list-container">
          <ul>
            {searchList.map((result, i) => (
              <li
                className="search-list-item"
                key={i}
                dangerouslySetInnerHTML={{ __html: result[0] }}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
