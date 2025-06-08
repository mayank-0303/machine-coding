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

  function deleteFolderNode(id) {
    const recurssionFn = (folder) => {
      if (Array.isArray(folder)) {
        return folder.filter((f) => recurssionFn(f).id !== id);
      }

      if (typeof folder === "object" && folder !== null) {
        if (folder.children) {
          folder.children = recurssionFn(folder.children);
        }
        return folder;
      }
    };

    const newFiles = recurssionFn(fileData);
    setFileData(newFiles);
  }

  function addFolderNode(id) {
    const newFolder = {
      id: "ad" + Math.random() * 1000,
      name: "NEWLY ADDED FOLDER" + Math.random() * 1000,
    };

    const recurssionFn = (element) => {
      if (Array.isArray(element)) {
        return element.map((e) => recurssionFn(e));
      }

      if (typeof element === "object" && element !== null) {
        if (element.id === id) {
          if (element.children?.length) {
            element.children = [...element.children, newFolder];
          } else {
            element.children = [newFolder];
          }
          return element;
        }

        if (element.children?.length) {
          element.children = recurssionFn(element.children);
        }

        return element;
      }
    };

    const newFiles = recurssionFn(fileData);
    setFileData(newFiles);
  }

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
