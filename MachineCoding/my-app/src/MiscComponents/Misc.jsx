import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import FileExplorer from "./FileExplorer";
import ModalContainer from "./ModalContainer";
import NestedCheckbox from "./NestedCheckbox";

const Misc = () => {
  const [list, setList] = useState([5, 10, 30, 60, 90]);

  return (
    <div>
      <h1>Progress bars</h1>
      {list.map((v, i) => (
        <ProgressBar key={i} progress={v} />
      ))}
      <h1>Folder structure</h1>
      <FileExplorer />
      <h1>Nested checkbox</h1>
      <NestedCheckbox />
      <h1>Modals</h1>
      <ModalContainer />
    </div>
  );
};

export default Misc;
