import React, { createContext, useState } from "react";
import Folder from "./Folder";

/* Remember this data structure(TREE) of nested objects is good for rendering and showing the folders
      But for look up like Searching/updating/deleting/adding to a specific folder
      requires deep traversal (O(n) time complexity).

      For these operations we can store our data in a hashmap/object format which will makes things faster
      
      Use a Tree when the folder structure doesn’t change often.
      Use a Hybrid Approach when you frequently update, delete, or search folders.

      Use Flat(Store Data in a Flat Object (HashMap)) for Updates => Convert to a Tree for Rendering
*/

const initialFileData = [
  {
    id: 1,
    name: "1",
    children: [
      {
        id: 12,
        name: "12",
        children: [
          {
            id: 123,
            name: "123",
            children: [
              {
                id: 1234,
                name: "1234",
                children: [
                  {
                    id: 12345,
                    name: "12345",
                  },
                  {
                    id: 12346,
                    name: "12346",
                  },
                ],
              },
              {
                id: 1240,
                name: "1240",
              },
            ],
          },
          {
            id: 1250,
            name: "1250",
            children: [
              {
                id: 1251,
                name: "1251",
              },
              {
                id: 1252,
                name: "1252",
              },
            ],
          },
        ],
      },
      {
        id: 1260,
        name: "1260",
      },
    ],
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
];

// hash map can look something like this,
// if only parent is there ,we can figure out children arrays by going thrugh object once
const HybridObjectMap = {
  1: { id: 1, name: "Folder 1", parent: null, children: [34, 34, 555] },
  2: { id: 2, name: "Folder 2", parent: null },
  3: { id: 3, name: "Subfolder", parent: 1 },
};

const fileContext = createContext();

const FileExplorer = () => {
  const [fileData, setFileData] = useState(initialFileData);

  const deleteFolderNode = (id) => {
    const newfileData = removeNode(fileData, id);
    setFileData(newfileData);
  };
  const removeNode = (item, id) => {
    if (Array.isArray(item)) {
      const newArray = [];
      item.forEach((i) => {
        const xx = removeNode(i, id);
        if (xx !== null) newArray.push(xx);
      });
      return newArray;
    }
    if (typeof item === "object" && item !== null) {
      const newObj = { ...item };
      if (item.id === id) {
        return null;
      }
      if (item.children) {
        newObj.children = removeNode(item.children, id);
      }
      return newObj;
    }
  };

  const addFolderNode = (id) => {
    const newfileData = addNode(
      fileData,
      {
        id: "ad" + Math.random() * 1000,
        name: "NEWLY ADDED FOLDER",
      },
      id
    );
    setFileData(newfileData);
  };
  const addNode = (item, nFolder, id) => {
    if (Array.isArray(item)) {
      return item.map((i) => addNode(i, nFolder, id));
    }
    if (typeof item === "object" && item !== null) {
      const newObj = { ...item };
      if (newObj.id === id) {
        if (newObj.children?.length) {
          newObj.children.push(nFolder);
        } else {
          newObj.children = [nFolder];
        }
      } else {
        if (item.children) {
          newObj.children = addNode(item.children, nFolder, id);
        }
      }
      return newObj;
    }
  };

  return (
    <div>
      <fileContext.Provider value={[deleteFolderNode, addFolderNode]}>
        <Folder fileData={fileData} />
      </fileContext.Provider>
    </div>
  );
};

export { fileContext };

export default FileExplorer;
