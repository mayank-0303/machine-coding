import React, { useState } from "react";
import Checkbox from "./Checkbox";

// its a way to show [-] in checkbox (remember this property can only be set by js not html attribute)
//const checkbox = document.getElementById("indeterminate-checkbox");
//checkbox.indeterminate = true;

const checkData = [
  {
    id: "1",
    name: "CheckBox 1",
  },
  {
    id: "2",
    name: "CheckBox 2",
    children: [
      {
        id: "21",
        name: "CheckBox 21",
      },
      {
        id: "22",
        name: "CheckBox 22",
        children: [
          {
            id: "221",
            name: "CheckBox 221",
          },
          {
            id: "222",
            name: "CheckBox 222",
          },
          {
            id: "223",
            name: "CheckBox 223",
          },
        ],
      },
      {
        id: "23",
        name: "CheckBox 23",
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

  // function changeCh(id) {
  //   const newState = { ...ischeck };

  //   function cc(newobj, id, forced = null) {
  //     // Handle Array
  //     if (Array.isArray(newobj)) {
  //       let allChildCheckedCount = 0;
  //       newobj.forEach((x) => {
  //         const checked = cc(x, id, forced);
  //         if (checked === "checked") allChildCheckedCount++;
  //       });

  //       return allChildCheckedCount;
  //     }
  //     // Handle Object
  //     if (typeof newobj === "object" && newobj != null) {
  //       let force = null;
  //       // force concept is used to handle children if parent is updated
  //       if (forced !== null) {
  //         newState[newobj.id] = forced;
  //         force = forced;
  //       } else {
  //         // if force is not present
  //         if (id === newobj.id) {
  //           if (
  //             newState[newobj.id] == undefined ||
  //             newState[newobj.id] == "unchecked" ||
  //             newState[newobj.id] == "indeterminate"
  //           ) {
  //             newState[newobj.id] = "checked";
  //           } else {
  //             newState[newobj.id] = "unchecked";
  //           }
  //           // newState[newobj.id] = !newState[newobj.id];
  //           force = newState[newobj.id];
  //         }
  //       }
  //       if (newobj.children) {
  //         const allChildCheckedCount = cc(newobj.children, id, force);

  //         if (allChildCheckedCount == newobj.children.length) {
  //           newState[newobj.id] = "checked";
  //         } else if (allChildCheckedCount === 0) {
  //           newState[newobj.id] = "unchecked";
  //         } else {
  //           newState[newobj.id] = "indeterminate";
  //         }

  //         // newState[newobj.id] = allChildCheckedCount == newobj.children.length;
  //       }
  //       return newState[newobj.id];
  //     }
  //   }

  //   cc(checkData, id);

  //   setisCheckedInfo(newState);
  // }

  function changeCh(id) {
    const newCheckObj = { ...ischeck };

    const recurssionFn = (folder, force, value) => {
      if (Array.isArray(folder)) {
        let status = true;
        folder.forEach((item) => {
          if (!recurssionFn(item, force, value)) {
            status = false;
          }
        });
        return status;
      }

      if (typeof folder === "object" && folder !== null) {
        let status = newCheckObj[folder.id];
        let forceChild = false;

        if (force) {
          status = value;
          forceChild = force;
        } else if (id === folder.id) {
          status = !status;
          forceChild = true;
          value = status;
        }

        if (folder.children) {
          status = recurssionFn(folder.children, forceChild, value);
        }

        newCheckObj[folder.id] = status;
        return status;
      }
    };

    recurssionFn(checkData);
    console.log(newCheckObj);
    setisCheckedInfo(newCheckObj);
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
