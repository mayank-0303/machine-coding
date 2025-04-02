import React, { useContext, useState } from "react";
import "./Folder.css";
import { fileContext } from "./FileExplorer";

const Folder = ({ fileData }) => {
  const [deleteFolderNode, addFolderNode] = useContext(fileContext);
  const [showChildren, setShowChildren] = useState({});
  return (
    <>
      {fileData.map(({ id, name, children }) => (
        <div key={id} className="folder">
          <div
            className="folder-name"
            onClick={() => setShowChildren((x) => ({ ...x, [id]: !x[id] }))}
          >
            {name}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFolderNode(id);
              }}
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addFolderNode(id);
              }}
            >
              Add
            </button>
          </div>

          {showChildren[id] && children && <Folder fileData={children} />}
        </div>
      ))}
    </>
  );
};

export default Folder;
