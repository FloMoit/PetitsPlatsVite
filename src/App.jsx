import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header onSearch={(value) => setSearch(value)} />
      <Main search={search} />
    </>
  );
}

export default App;
