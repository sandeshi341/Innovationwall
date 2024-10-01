import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
import "./Innovationwall.css";
import logo from "./RightData Logo - White 1.png";

const Innovationwall = () => {
  const { addData } = useData();
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added to manage loader
  const [fileset, setFileset] = useState("");
  const [uploadstatusmsg, setUploadStatusMsg] = useState("");

  const [newEntry, setNewEntry] = useState({
    Summary: "",
    description: "",
    name: "",
    category: "",
    uploadstatusmsg: "",

    // Correct spelling
  });

  const [errors, setErrors] = useState({
    Summary: "",
    description: "",
    name: "",
    category: "",
  });
  useEffect(() => {
    let timer;
    if (popupVisible) {
      timer = setTimeout(() => {
        setPopupVisible(false);
      }, 3000); // Popup visible for 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [popupVisible]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile); // Add the file to the FormData

      // Send the file to the server using the /upload endpoint
      fetch("http://localhost:3005/fileuploads", {
        method: "POST",

        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Assuming backend sends text response
          } else {
            throw new Error("File upload failed.");
          }
        })
        .then((data) => {
          console.log("File uploaded successfully:", data);
          setUploadStatusMsg(data.file);
          //uploadstatusmsg = "http://";
          // Get file name from response
          setFileset((prevFiles) => [...prevFiles, data.file]);
          //console.log("upload", uploadstatusmsg);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Summary") {
      if (value.length > 30) {
        setErrors((prev) => ({
          ...prev,
          Summary: "Limit is 30 characters",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          Summary: "",
        }));
      }
      // Enforce the character limit
      setNewEntry((prev) => ({ ...prev, [name]: value.slice(0, 30) }));
    }

    if (name === "description") {
      if (value.length > 300) {
        setErrors((prev) => ({
          ...prev,
          description: "Limit is 300 characters",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          description: "",
        }));
      }
      // Enforce the character limit
      setNewEntry((prev) => ({ ...prev, [name]: value.slice(0, 300) }));
    }

    // Update other fields without character limits
    if (name !== "description" && name !== "Summary") {
      setNewEntry((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {
      Summary: "",
      description: "",
      name: "",
      category: "",
    };
    if (!newEntry.Summary) newErrors.Summary = "Summary is required";
    if (!newEntry.description)
      newErrors.description = "Description is required";
    if (!newEntry.category) newErrors.category = "Category is required";
    if (!newEntry.name) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = () => {
    if (validate()) {
      const date = new Date();
      setIsSubmitting(true);
      console.log("befor func", uploadstatusmsg);

      addData(
        newEntry.name,
        newEntry.Summary,
        newEntry.description,
        newEntry.category,
        date,
        uploadstatusmsg
      ).then(() => {
        setIsSubmitting(false); // Hide loader and blur
        // Show the popup after the loader
        setNewEntry({
          name: "",
          Summary: "",
          description: "",
          category: "",
        });
        debugger;
      });
    }
  };

  // const handleCancel = () => {
  //   navigate("/Dropdownpage"); // Navigate back to Dropdownpage
  // };

  const handleViewSummary = () => {
    navigate("/SubmittedData");
  };

  return (
    <div>
      {" "}
      {isSubmitting && (
        <div className="loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
      <div className={`wall ${isSubmitting ? "blur-background" : ""}`}>
        <div className="logo-container">
          <img src={logo} alt="Rightdata Logo" className="logo" />
          <button onClick={handleViewSummary}>View Vault</button>
        </div>
        <br />
        <h1>Innovation Hub</h1>
        <br />
        <br />
        <br />
        <div className="form-container">
          <div className="individual">
            <lable>Full Name</lable>
            <input
              type="text"
              placeholder="Enter your name here"
              name="name"
              value={newEntry.name}
              onChange={handleChange}
            />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>

          <div className="individual">
            <lable>Category</lable>
            <select
              placeholder="Category"
              name="category"
              value={newEntry.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="DataFactory">DataFactory</option>
              <option value="DataTrust">DataTrust</option>
              <option value="DataMarket">DataMarket</option>
              <option value="General">General</option>
            </select>
            {errors.category && (
              <div className="error-text">{errors.category}</div>
            )}
          </div>
          <div className="individual">
            <lable className="description-label">
              Summary<span className="character-limit">30 characters</span>
            </lable>
            <input
              type="text"
              placeholder="Write a Summary here"
              name="Summary"
              value={newEntry.Summary}
              onChange={handleChange}
            />
            {errors.Summary && (
              <div className="error-text">{errors.Summary}</div>
            )}
          </div>

          <div className="individual">
            <label className="description-label">
              Description
              <span className="character-limit">300 characters</span>
            </label>

            <textarea
              placeholder="Write a description here"
              name="description"
              value={newEntry.description}
              onChange={handleChange}
            />
            {errors.description && (
              <div className="error-text">{errors.description}</div>
            )}
          </div>

          <div className="individual">
            <input type="file" onChange={handleFileChange} />
          </div>

          <div className="btn">
            <button onClick={handleSubmit}>Submit</button>

            {/* <button onClick={handleCancel}>Cancel</button> */}
          </div>
        </div>

        {popupVisible && <div className="popup">Limit Exceeded</div>}
      </div>
    </div>
  );
};

export default Innovationwall;
