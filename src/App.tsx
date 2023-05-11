/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal/Modal";
import useLocalStorage from "./hooks/useLocalStorage";
import MapPage from "./pages/MapPage";
function App() {
  const [loadMapPage, setLoadMapPage] = useState(false);
  const [firstOpen, setFirstOpen] = useLocalStorage("firstOpen", "true");
  useEffect(() => {
    if (firstOpen === "false") {
      setLoadMapPage(true);
    }
  }, []);

  return (
    <div className="App">
      {firstOpen === "true" ? (
        <Modal setFirstOpen={setFirstOpen} setLoadMapPage={setLoadMapPage} />
      ) : null}
      {loadMapPage === false ? null : <MapPage />}
    </div>
  );
}

export default App;
