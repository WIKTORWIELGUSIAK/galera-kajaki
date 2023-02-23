/** @format */

import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Modal from "./components/Modal/Modal";
import useLocalStorage from "./hooks/useLocalStorage";
import { MapboxGLMap } from "./shared";
// import MapPage from "./pages/MapPage";
function App() {
  const [firstOpen, setFirstOpen] = useLocalStorage("firstOpen", "true");
  // const [map, setMap] = useState<MapboxGLMap | undefined>();
  // mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  // const mapContainer = useRef<HTMLDivElement>(null);

  // const map = new mapboxgl.Map({
  //   container: mapContainer.current!, // container ID
  //   // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  //   style: "mapbox://styles/mapbox/streets-v12", // style URL
  //   center: [-74.5, 40], // starting position [lng, lat]
  //   zoom: 9, // starting zoom
  // });
  const map = useRef<MapboxGLMap | undefined>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const renderMap = () => {
    if (map.current) return;

    map.current = new MapboxGLMap({
      container: mapContainer.current!,
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  };
  useEffect(() => {
    if (firstOpen === "false") {
      renderMap();
    }
  }, [firstOpen]);
  return (
    <div className="App">
      {/* <MapPage /> */}

      <div
        style={{ width: "100%", height: "100vh" }}
        ref={mapContainer}
        className="rivers-map"
      ></div>
      {firstOpen === "true" ? <Modal setFirstOpen={setFirstOpen} /> : null}
    </div>
  );
}

export default App;
