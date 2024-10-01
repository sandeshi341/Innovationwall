import React, { createContext, useContext, useState } from "react";

// Initialize context
const DataContext = createContext();

// Helper function to format the date
const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

// Provide data and functions through context
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const addData = async (
    name,
    Summary,
    description,
    category,
    date,
    uploadstatusmsg
  ) => {
    const formattedDate = formatDate(date); // Format the date
    console.log("inside fun", uploadstatusmsg);
    const newData = [
      ...data,
      {
        name,
        Summary,
        description,
        category,
        date: formattedDate,
        uploadstatusmsg,
      },
    ];
    setData(newData);

    try {
      setLoading(true); // Start loading

      // // Convert file to base64
      // const fileReader = new FileReader();
      // fileReader.readAsDataURL(setFile);
      // fileReader.onload = async () => {
      //   const base64File = fileReader.result.split(",")[1];

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxlYYlr3Vy2qDGPJltQSww_ol774iHDpvrIVbtCcLKR_z0Ems8Nro6VKfv6nUROCPlkBA/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            ID: newData.length,
            Name: name,
            Summary: Summary,
            Description: description,
            Category: category,
            Date: formattedDate,
            File: uploadstatusmsg,
            //Attachment: "API test",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Data sent successfully");
      setShowPopup(true); // Show the popup message
      setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
      // };
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <DataContext.Provider value={{ data, addData, showPopup, loading }}>
      {children}
      {loading && <div className="loader"></div>}
      {showPopup && <div className="popup">Idea submitted successfully</div>}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useData = () => useContext(DataContext);
