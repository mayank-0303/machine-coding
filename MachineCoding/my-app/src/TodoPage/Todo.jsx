import React, { useState } from "react";
import "./Todo.css";
const Todo = () => {
  const [list, setList] = useState({
    1: {
      id: 1,
      name: "Mayank",
      checked: false,
    },
  });

  const removeListItem = (id) => {
    const newList = { ...list };
    delete newList[id];
    setList(newList);
  };

  const AddListItem = (name) => {
    const ranndomId = name + Math.floor(Math.random() * 1000);

    setList((old) => ({
      ...old,
      [ranndomId]: {
        id: ranndomId,
        name,
        checked: false,
      },
    }));
  };

  const updateListItem = (id, checked) => {
    const newList = { ...list };
    newList[id].checked = checked;
    setList(newList);
  };

  return (
    <div>
      <InputComponent AddListItem={AddListItem} />
      <ListComponent
        list={list}
        updateListItem={updateListItem}
        removeListItem={removeListItem}
      />
    </div>
  );
};

export default Todo;

const InputComponent = ({ AddListItem }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button disabled={text.length === 0} onClick={() => AddListItem(text)}>
        ADD
      </button>
    </div>
  );
};

const ListComponent = ({ list, updateListItem, removeListItem }) => {
  return (
    <div>
      {Object.values(list).map((item, i) => (
        <div key={item.id} className="list-item">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => updateListItem(item.id, !item.checked)}
          />
          <span className={`${item.checked ? "" : "strike"}`}>{item.name}</span>

          <button onClick={() => removeListItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
