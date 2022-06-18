import "./App.css";
import MainApp from "./containers/MainApp";
import AppContextProvider from "./contexts/appContext";
import React from "react";

function App() {
  return (
    <AppContextProvider>
      <MainApp />
    </AppContextProvider>
  );
}

export default App;
