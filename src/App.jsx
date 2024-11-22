import React from "react";
import PipelineMap from "./PipelineMap";
import pipelinesData from "./data.json"; // Your JSON data

function App() {
  return (
    <PipelineMap
      mainline={pipelinesData.mainline}
      zoneline={pipelinesData.zoneline}
      subzoneline={pipelinesData.subzoneline}
    />
  );
}

export default App;
