import React from "react";
import TextEditor from "./components/TextEditor";
import { v4 as uuidV4 } from "uuid";

function App() {
  if (window.location.pathname === "/") {
    window.location.href = `/document/${uuidV4()}`;
    return null; // return null here to avoid rendering the TextEditor .
  } else {
    return <TextEditor />;
  }
}

export default App;
