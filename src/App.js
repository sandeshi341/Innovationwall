// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dropdownpage from "./Dropdownpage";
import { DataProvider } from "./DataContext";
import Report from "./Report";
import Versionupdater from "./Versionupdater";
import Innovationwall from "./Innovationwall";
import SubmittedData from "./SubmittedData";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Innovationwall />} />
          <Route path="Innovationwall" element={<Innovationwall />} />
          {/* <Route path="/Versionupdater" element={<Versionupdater />} />
          <Route path="/src/Report.js" element={<Report />} /> */}
          <Route path="SubmittedData" element={<SubmittedData />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
