import { Fragment, useEffect, useState } from "react";

const formData = [
  {
    id: "1234",
    label: "Name",
    type: "input",
    defaultValue: "Mayank Singh",
    maxLength: 20,
  },
  {
    id: "132434",
    type: "radio",
    label: "Gender",
    defaultValue: "2",
    radioOptions: [
      {
        id: "1",
        value: "1",
        label: "option 1",
      },
      {
        id: "2",
        value: "2",
        label: "option 2",
      },
      {
        id: "3",
        value: "3",
        label: "option 3",
      },
    ],
  },
];

const FormBuilder = () => {
  const [formConfig, setFormConfig] = useState([]);
  const [formValue, setFormvalue] = useState({});

  useEffect(() => {
    //api call....
    fetchFormInfo();
  }, []);

  const fetchFormInfo = async () => {
    //api call to fetch form config.....
    setFormConfig(formData);
    // api call to fetch the already set data of this form..
    // if no data that means we need to make the state of our own otherwise i would have dumped the result in state
    setFormvalue(createFormState(formData));
  };

  const createFormState = (config) => {
    return Object.fromEntries(
      config.map((element) => [[element.id], element.defaultValue])
    );
  };

  const updateFormItem = (id, newVal) => {
    setFormvalue((old) => ({
      ...old,
      [id]: newVal,
    }));
  };

  return (
    <div>
      FormBuilder:
      {formConfig.map((elem) => (
        <div key={elem.id}>
          <label> {elem.label} </label>

          {elem.type === "input" && (
            <input
              id={elem.id}
              type="text"
              value={formValue[elem.id]}
              onChange={(event) => updateFormItem(elem.id, event.target.value)}
            />
          )}

          {elem.type === "radio" &&
            elem.radioOptions.map((radio) => {
              return (
                <Fragment key={radio.id}>
                  <label htmlFor={radio.id + "-radio"}>{radio.label}</label>
                  <input
                    id={radio.id + "-radio"}
                    key={radio.id}
                    type="radio"
                    checked={formValue[elem.id] === radio.value}
                    onChange={() => updateFormItem(elem.id, radio.value)}
                  />
                </Fragment>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default FormBuilder;
