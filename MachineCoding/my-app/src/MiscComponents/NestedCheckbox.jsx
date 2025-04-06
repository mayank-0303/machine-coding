import React, { useState } from "react";
import Checkbox from "./Checkbox";

const checkData = [
  {
    id: "1",
    name: "CheckBox 1",
    checked: false,
  },
  {
    id: "2",
    name: "CheckBox 2",
    checked: false,
    children: [
      {
        id: "21",
        name: "CheckBox 21",
        checked: false,
      },
      {
        id: "22",
        name: "CheckBox 22",
        checked: false,
        children: [
          {
            id: "221",
            name: "CheckBox 221",
            checked: false,
          },
          {
            id: "222",
            name: "CheckBox 222",
            checked: false,
          },
          {
            id: "223",
            name: "CheckBox 223",
            checked: false,
          },
        ],
      },
      {
        id: "23",
        name: "CheckBox 23",
        checked: false,
      },
    ],
  },
  {
    id: "3",
    name: "CheckBox 3",
    checked: false,
  },
  {
    id: "4",
    name: "CheckBox 4",
    checked: false,
  },
  {
    id: "5",
    name: "CheckBox 5",
    checked: false,
  },
];

const NestedCheckbox = () => {
  const [ischeck, setisCheckedInfo] = useState({});

  function changeCh(id) {
    const newState = { ...ischeck };

    function cc(newobj, id, forced = null) {
      // Handle Array
      if (Array.isArray(newobj)) {
        let allChildCheckedCount = 0;
        newobj.forEach((x) => {
          const checked = cc(x, id, forced);
          if (checked) allChildCheckedCount++;
        });

        return allChildCheckedCount;
      }
      // Handle Object
      if (typeof newobj === "object" && newobj != null) {
        let force = null;
        // force concept is used to handle children if parent is updated
        if (forced !== null) {
          newState[newobj.id] = forced;
          force = forced;
        } else {
          // if force is not present
          if (id === newobj.id) {
            newState[newobj.id] = !newState[newobj.id];
            force = newState[newobj.id];
          }
        }
        if (newobj.children) {
          const allChildCheckedCount = cc(newobj.children, id, force);

          newState[newobj.id] = allChildCheckedCount == newobj.children.length;
        }
        return newState[newobj.id];
      }
    }

    cc(checkData, id);

    setisCheckedInfo(newState);
  }

  return (
    <div>
      <Checkbox checkInfo={checkData} changeCh={changeCh} ischeck={ischeck} />
    </div>
  );
};

export default NestedCheckbox;

// when i had checked in the data only
// function changeCh(value, id) {
//     const [newobj] = cc(checkInfo, id, value);
//     setCheckedInfo(newobj);
//   }

//   function cc(newobj, id, value, forced = null) {
//     // Handle Array
//     if (Array.isArray(newobj)) {
//       let allChildCheckedCount = 0;
//       const newOArray = newobj.map((x) => {
//         const ret = cc(x, id, value, forced);
//         if (ret.checked) allChildCheckedCount++;
//         return ret;
//       });

//       return [newOArray, allChildCheckedCount];
//     }
//     // Handle Object
//     if (typeof newobj === "object" && newobj != null) {
//       let force = null;
//       const newOO = { ...newobj };
//       // force concept is used to handle children if parent is updated
//       if (forced !== null) {
//         newOO.checked = forced;
//         force = forced;
//       } else {
//         // if force is not present
//         if (id === newOO.id) {
//           newOO.checked = !newOO.checked;
//           force = newOO.checked;
//         }
//       }

//       if (newOO.children) {
//         // allChildCheckedCount  concept is used to handle parent if children is updated
//         let allChildCheckedCount;
//         [newOO.children, allChildCheckedCount] = cc(
//           newOO.children,
//           id,
//           value,
//           force
//         );

//         if (allChildCheckedCount === newOO.children.length)
//           newOO.checked = true;
//         else newOO.checked = false;
//       }
//       return newOO;
//     }
//   }
