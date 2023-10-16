import { useState, useDeferredValue } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  const [search, setSearch] = useState("");

  const deferredSearch = useDeferredValue(search);

  return (
    <>
      <Header onSearch={(value) => setSearch(value)} />
      <Main search={deferredSearch} />
    </>
  );
}

export default App;
