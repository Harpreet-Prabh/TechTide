import { useState } from "react";
import "./App.css";
import YouTube from "./component/YouTube";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <YouTube></YouTube>
    </>
  );
}

export default App;
