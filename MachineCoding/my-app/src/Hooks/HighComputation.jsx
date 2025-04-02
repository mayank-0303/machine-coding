import React, { useDeferredValue, useState, useTransition } from "react";
const names = Array.from({ length: 10 }, (_, i) => `User ${i}`);

const HighComputation = () => {
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState(names);
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  // similar to useTransition deferedValue will render later so we can show that later

  const handleSearch = (val) => {
    setQuery(val);

    startTransition(() => {
      // delay this no priority to update this
      setFilteredList(names.filter((name) => name.includes(val)));
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <br />
      {isPending && <p>Filtering...</p>}
      <br />
      {deferredQuery}
      <br />
      <ul>
        {filteredList.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HighComputation;
