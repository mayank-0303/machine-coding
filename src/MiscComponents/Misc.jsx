import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import FileExplorer from "./FileExplorer";
import ModalContainer from "./ModalContainer";

const Misc = () => {
  const [list, setList] = useState([5, 10, 30, 60, 90]);

  return (
    <div>
      Progress bar
      {list.map((v, i) => (
        <ProgressBar key={i} progress={v} />
      ))}
      Folder structure
      <FileExplorer />
      Modals
      <ModalContainer />
    </div>
  );
};

export default Misc;
