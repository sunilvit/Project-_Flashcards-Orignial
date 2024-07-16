import React from "react";
import "./App.css";
import RootRoutes from "./RootRoutes";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
        <RootRoutes />
      </div>
  );
}

export default App;
