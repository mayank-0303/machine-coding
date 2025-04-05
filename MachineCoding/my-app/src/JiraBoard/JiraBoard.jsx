import React, { useState } from "react";
import "./JiraBoard.css";

//Things to remember
// e.dataTransfer.setData("taskId", id);
// Browsers prevent drops by default. You must call event.preventDefault() in onDragOver
const statusListss = {
  11: {
    id: 11,
    name: "dev",
    tasks: [1, 2, 3],
  },
  12: {
    id: 12,
    name: "in-dev",
    tasks: [],
  },
  13: {
    id: 13,
    name: "in-staging",
    tasks: [],
  },
  14: {
    id: 14,
    name: "in prod",
    tasks: [],
  },
  15: {
    id: 15,
    name: "in post prod",
    tasks: [4],
  },
};

const itemList = {
  1: {
    id: 1,
    name: "Task 1",
  },
  2: {
    id: 2,
    name: "Task 2",
  },
  3: {
    id: 3,
    name: "Task 3",
  },

  4: {
    id: 4,
    name: "Task 4",
  },
};

const JiraBoard = () => {
  const [statusList, setStatusList] = useState(statusListss);

  const shiftTask = (id, old, neww) => {
    setStatusList((l) => {
      return {
        ...l,
        [old]: { ...l[old], tasks: l[old].tasks.filter((t) => t != id) },
        [neww]: { ...l[neww], tasks: [...l[neww].tasks, id] },
      };
    });
  };

  return (
    <div className="board-container">
      {Object.values(statusList).map((status) => (
        <div key={status.id} className="board-element">
          {status.name}
          <DraggagableStatusBlock
            tasks={status.tasks}
            sectionId={status.id}
            shiftTask={shiftTask}
          />
        </div>
      ))}
    </div>
  );
};

const DraggagableStatusBlock = ({ tasks = [], sectionId, shiftTask }) => {
  const dragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
    e.dataTransfer.setData("sectionId", sectionId);
  };

  // MOST IMPORTANT
  // Browsers prevent drops by default. You must call event.preventDefault() in onDragOver
  const dragOver = (event) => {
    // prevent default to allow drop
    event.preventDefault();
  };

  const dragEnd = (e) => {
    if (e.dataTransfer.getData("sectionId") != sectionId) {
      shiftTask(
        e.dataTransfer.getData("taskId"),
        e.dataTransfer.getData("sectionId"),
        sectionId
      );
    }
  };
  return (
    <div
      className="dragabble-area"
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => dragEnd(e, sectionId)}
    >
      {tasks.map((task) => (
        <div
          key={task}
          className="task-block"
          draggable={true}
          onDragStart={(e) => dragStart(e, task)}
        >
          {itemList[task].name}
        </div>
      ))}
    </div>
  );
};

export default JiraBoard;
