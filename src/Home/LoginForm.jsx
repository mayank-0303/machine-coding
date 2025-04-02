import React, { Fragment, useReducer, useState } from "react";
import "./LoginForm.css";

// enhacement that could be done 1. cache data so reload fill data automatically if its a login form
// lazy load the components of tab with lazy and show loader as suspense
// rather than creating a single validation function , i could have added that to config individually
// and used a error object with name and value and pass it down components to show error nessage
// below each component

const Profile = ({ formData, dispatch }) => {
  return (
    <div>
      <label htmlFor="name"> name</label>
      <input
        id="name"
        name="name"
        type="text"
        maxLength={20}
        minLength={5}
        value={formData.name}
        onChange={(e) => dispatch({ type: "name", val: e.target.value })}
      />
      <label htmlFor="age"> age</label>
      <input
        id="age"
        name="age"
        type="number"
        min={18}
        max={30}
        value={formData.age}
        onChange={(e) => dispatch({ type: "age", val: e.target.value })}
      />
    </div>
  );
};
const Interest = ({ formData, dispatch }) => {
  return (
    <div>
      <label> sport interest(choose one)</label>
      <label htmlFor="football"> Football</label>
      <input
        id="football"
        name="sport"
        type="radio"
        checked={formData.sport === "football"}
        onChange={(e) => dispatch({ type: "sport", val: "football" })}
      />
      <label htmlFor="football"> Cricket</label>
      <input
        id="Cricket"
        name="sport"
        type="radio"
        checked={formData.sport === "Cricket"}
        onChange={(e) => dispatch({ type: "sport", val: "Cricket" })}
      />
      <label htmlFor="football"> Hockey</label>
      <input
        id="Hockey"
        name="sport"
        type="radio"
        checked={formData.sport === "Hockey"}
        onChange={(e) => dispatch({ type: "sport", val: "Hockey" })}
      />
    </div>
  );
};
const Settings = () => {
  return <div>Settings</div>;
};

const tabInfo = [
  {
    id: 1,
    name: "Profile",
    component: Profile,
  },
  {
    id: 2,
    name: "Interest",
    component: Interest,
  },
  {
    id: 3,
    name: "Settings",
    component: Settings,
  },
];

const initialFormInfo = {
  name: "",
  age: 19,
  email: "",
  sport: "",
  notification: true,
};

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-container">
      {tabInfo.map((tab) => (
        <div
          className={`tab ${activeTab == tab.id ? "active" : ""}`}
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.name}{" "}
        </div>
      ))}
    </div>
  );
};

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [validationMessage, setvalidationMessage] = useState(null);

  const reducerFn = (state, { type, val }) => {
    switch (type) {
      case "name":
      case "age":
      case "sport":
        return { ...state, [type]: val };

      default:
        break;
    }
  };
  const [formData, dispatch] = useReducer(reducerFn, initialFormInfo);

  const validateForm = (event) => {
    event.preventDefault();
    for (let [field, value] of Object.entries(formData)) {
      if (field === "name" && value.length < 5) {
        console.log("invalid");
      } else {
        console.log("valid");
      }
    }
  };

  return (
    <div className="login-page">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <form>
        {tabInfo.map((tab, i) =>
          tab.id === activeTab ? (
            <Fragment key={tab.id}>
              {<tab.component formData={formData} dispatch={dispatch} />}

              {i === tabInfo.length - 1 && (
                <div>
                  {validationMessage}
                  <button type="submit" onClick={(e) => validateForm(e)}>
                    submit
                  </button>
                </div>
              )}
            </Fragment>
          ) : null
        )}
      </form>
    </div>
  );
};

export default LoginForm;
