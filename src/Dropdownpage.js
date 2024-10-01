import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dropdownpage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Assuming your sub-options correspond to different paths
    if (selectedValue === "./Innovationwall.js") {
      navigate("./Innovationwall"); // Use the route path, not the component file path
    } else if (selectedValue === "Versionupdater") {
      navigate("/Versionupdater"); // Use the route path, not the component file path
    } else if (selectedValue === "./Report.js") {
      navigate("./Report.js");
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#6A5ACD", // English Purple
  };

  const headingStyle = {
    color: "white",
  };

  const selectStyle = {
    margin: "20px",
    padding: "10px",
    fontSize: "18px",
    border: "none",
    borderRadius: "5px",
    background: "#4169E1", // Royal Blue
    color: "white",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Customer Success Engineer Track sheet</h1>
      <select
        onChange={handleOptionChange}
        value={selectedOption}
        style={selectStyle}
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="./Innovationwall.js">Innovationwall</option>
        <option value="Versionupdater">Versionupdater</option>
        <option value="./Report.js">Report</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default Dropdownpage;
