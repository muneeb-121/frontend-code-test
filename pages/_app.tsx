import { StyleProvider, ThemePicker } from "vcc-ui";

import Cars from "../src/components/Cars";
import "../public/css/styles.css";
import React from "react";

import CarsList from "../public/api/cars.json";

function HomePage() {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <Cars items={CarsList} size={4} />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default HomePage;
