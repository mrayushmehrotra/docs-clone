import { useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = () => {
  useEffect(() => {
    new Quill("#container", { theme: "snow" });
  }, []);

  return <div id="container"></div>;
};

export default TextEditor;
