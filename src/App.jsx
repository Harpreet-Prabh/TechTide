import { useState } from "react";
import "./App.css";
import Main from "./component/main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Main></Main>
    </>
  );
}

export default App;
