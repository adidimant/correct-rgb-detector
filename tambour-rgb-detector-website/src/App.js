import './App.css';
import Navbar from './Components/Navbar';
import DescriptionForm from './Components/TamburDescription';
import React, { useState, useEffect, useMemo } from 'react';
import ImageForm from './Components/ImageForm';
import ShowResults from './Components/ShowResults';
import { BrowserRouter as Router } from 'react-router-dom';
import { getClosestColors } from './api/serverApi';
import fs from 'fs';


function App() {
  const [image, setImage] = useState([]);
  const [closest, setClosest] = useState([]);
  const [step, setStep] = useState(0);

  const addImage = (colorImage) => {
    setImage(colorImage);
  };

  const sendToServer = async () => {
    const closestColors = await getClosestColors(image);
    alert(image);
    setClosest(closestColors);
    alert(JSON.stringify(closestColors));
    setStep(1);
  };


  return (
    <Router>
      {/* //<Sidebar /> */}
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "space-between" }}>
        <Navbar />
        <DescriptionForm />
        {!step ? <ImageForm addImageToParent={addImage} sendToServer={sendToServer} /> : <ShowResults closestColors={closest} />}
      </div>
    </Router>
  );
}

export default App;
