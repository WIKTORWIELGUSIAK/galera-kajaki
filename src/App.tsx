/** @format */

import { useEffect } from "react";
import "./App.css";
import Modal from "./components/Modal/Modal";
import useLocalStorage from "./hooks/useLocalStorage";
import MapPage from "./pages/MapPage";
function App() {
  const [firstOpen, setFirstOpen] = useLocalStorage("firstOpen", "true");
  return (
    <div className="App">
      <MapPage />
      {firstOpen === "true" ? <Modal setFirstOpen={setFirstOpen} /> : null}
    </div>
  );
}

export default App;
