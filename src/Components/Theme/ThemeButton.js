import React from "react";
import "./ThemeButton.css";
function ThemeButton() {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const toggleTheme = (event) => {
    if (event.target.checked) setLightMode();
    else setDarkMode();
  };
  return (
    <div style={{ position: "fixed", bottom: 0, right: 0 }}>
      <label class="switch" for="darkmode-toggle">
        <input type="checkbox" id="darkmode-toggle" onChange={toggleTheme} />
        <span class="slider round"></span>
      </label>
    </div>
  );
}

export default ThemeButton;
