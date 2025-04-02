import React, { useEffect, useId, useRef, useState } from "react";
import "./Otp.css";

// Enhancements that could be done rather than accessing children with ids , use reference, how to do it
// its simple like you used to go in 3 years back , considering ref.current as a mao and storing all the refs there
const Otp = ({ count }) => {
  const otpId = useId();
  const [otpvalue, setOtpvalue] = useState(
    Array.from({ length: count }, (_, i) => "")
  );
  const [focussedInput, setFI] = useState(0);

  const refNodes = useRef({});

  useEffect(() => {
    document.getElementById(`otp-${otpId}-${0}`).focus();
  }, []);

  const keyDown = (event, i) => {
    const value = event.target.value;

    if (event.key === "Backspace" && value === "" && i > 0) {
      document.getElementById(`otp-${otpId}-${i - 1}`).focus();
    }
  };

  const onChange = (event, i) => {
    const value = event.target.value;
    if (isNaN(value)) return;
    setOtpvalue((old) => {
      const v = [...old];
      v[i] = event.target.value;
      return v;
    });

    if (value && i < count - 1) {
      document.getElementById(`otp-${otpId}-${i + 1}`).focus();
    }
  };

  return (
    <div className="otp-container">
      {[...Array(count).keys()].map((i) => (
        <input
          id={`otp-${otpId}-${i}`}
          ref={(element) => {
            refNodes.current[i] = element;
          }}
          key={i}
          className="child-otp"
          type="text"
          value={otpvalue[i]}
          // disabled={focussedInput !== i}
          maxLength={1}
          onKeyDown={(e) => keyDown(e, i)}
          onChange={(e) => onChange(e, i)}
        />
      ))}
    </div>
  );
};

export default Otp;
