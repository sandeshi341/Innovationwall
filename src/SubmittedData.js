import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
import "./SubmittedData.css";
import logo from "./RightData Logo - White 1.png";
import * as XLSX from "xlsx";

const MAX_LENGTH = 15;

const SubmittedData = () => {
  
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const { showPopup ,} = useData(); // Use context to get popup state
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwwS06oucbx581CbTLg1ngn7BwwUG7sitjULXvMzmdromeem54VejVni7gbIWgFnIsZhA/exec"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        console.log("Fetched data:", result);

        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error("Unexpected data format:", result);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigate("/innovationwall");
  };

  const handleReadMore = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    document.body.classList.remove("modal-open");
  };

  const handleOnExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData, {
      header: ["Name", "Summary", "Description", "Category", "Date"],
    });
    XLSX.utils.book_append_sheet(wb, ws, "SubmittedData");
    XLSX.writeFile(wb, "InnovationHub.xlsx");
  };

  const filteredData = selectedCategory
    ? data.filter((item) => item.Category === selectedCategory)
    : data;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return "No date";
  };

  return (
    <div className="submitted-data">
    {loading ? (
      <>
        <div className="blur-background"></div>
        <div className="loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </>
    ) : (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="Rightdata Logo" className="logo" />
        <div className="button-container">
          <button onClick={handleBack}>Back</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={handleOnExport}>Export</button>
        </div>
      </div>
      <h1>Innovation Vault</h1>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Summary</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.Name || "No name"}</td>
                  <td>{item.Summary || "No summary"}</td>
                  <td>
                    {item.Description && item.Description.length > MAX_LENGTH ? (
                      <>
                        {item.Description.substring(0, MAX_LENGTH)}...
                        <a
        href="#"
        className="read-more-link"
        onClick={(e) => {
          e.preventDefault();
          handleReadMore(item);
        }}
      >
                          {" "}
                          read more
                        </a>
                      </>
                    ) : (
                      item.Description || "No description available"
                    )}
                  </td>
                  <td>{item.Category || "No category"}</td>
                  <td>{formatDate(item.Date)}</td>
                  <td>
          {item.File ? (
            <a href={item.File} className="download-link" target="_blank" rel="noopener noreferrer" download>
              Download
            </a>
          ) : (
            "No File available"
          )}
        </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedItem && (
  <div className="modal show">
    <div className="modal-content">
      <span className="close" onClick={handleCloseModal}>
        &times;
      </span>
      <h2>Description</h2>
      <p>{selectedItem.Description || "No description available"}</p>
    </div>
  </div>
)}
</div>
      )}
    </div>
  );
};

export default SubmittedData;
