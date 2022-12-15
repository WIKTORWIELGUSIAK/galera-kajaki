/** @format */

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  Geometry,
  FeatureCollection,
  GeoJsonProperties,
  Feature,
} from "geojson";
import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RiverForm from "../RiverForm/RiverForm";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  // ##########################################################################################################
  // Local states
  // ##########################################################################################################
  const [riversData, setRiversData] = useState<
    FeatureCollection<Geometry, GeoJsonProperties>
  >({
    type: "FeatureCollection",
    features: [],
  });
  const [selectedRivers, setSelectedRivers] = useState<Feature[]>([]);
  const [lngLat, setLngLat] = useState({ lng: 20, lat: 50.04 });
  const [zoom, setZoom] = useState(8);
  const [openRiverForm, setOpenRiverForm] = useState(false);
  const [riverInput, setRiverInput] = useState("");
  const [coordinates, setCoordinates] = useState();
  const map = useRef<mapboxgl.Map | null>(null);

  console.log(riverInput);
  // ##########################################################################################################
  // UseEffects that start with application
  // ##########################################################################################################
  useEffect(() => {
    axios
      .get("polishRivers.geojson")
      .then((res) => setRiversData(JSON.parse(JSON.stringify(res.data))))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (map.current?.getSource("map-data")) {
      (map.current.getSource("map-data") as GeoJSONSource).setData({
        type: "FeatureCollection",
        features: selectedRivers,
      });
    }
  }, [selectedRivers]);
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lngLat.lng, lngLat.lat],
      zoom: zoom,
    });
    // ##########################################################################################################
    // Function to load structure and layer to map
    // ##########################################################################################################
    map.current.on("style.load", () => {
      map.current?.addSource("map-data", {
        type: "geojson",
        data: { type: "FeatureCollection", features: selectedRivers },
      });
      map.current?.addLayer({
        id: "rivers",
        type: "line",
        source: "map-data",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "green",
          "line-width": 2,
        },
      });
    });
  }, [map.current, selectedRivers]);

  // ##########################################################################################################
  // Functionts used in map component
  // ##########################################################################################################

  // ##########################################################################################################
  // Function to fetch data (will be used instead of funcion to fetch data at start application)
  // ##########################################################################################################
  const fetchRiversData = () => {
    axios
      .get("polishRivers.geojson")
      .then((res) => setRiversData(JSON.parse(JSON.stringify(res.data))))
      .catch((err) => console.log(err));
  };

  // ##########################################################################################################
  // Function to filter rivers data by river name
  // ##########################################################################################################
  const filtredData = (props: string) => {
    return riversData.features.filter((el) =>
      el.properties?.RWB_NAME.includes(props)
    );
  };

  // ##########################################################################################################
  // Function to set rivers to display on map
  // ##########################################################################################################
  const setRivers = (props: string) => {
    if (!selectedRivers.some((el) => el.properties?.RWB_NAME.includes(props))) {
      if (riversData.features.length === 0) {
        fetchRiversData();
      }
      setSelectedRivers([...selectedRivers, ...filtredData(props)]);
    }
  };

  // ##########################################################################################################
  // Function to set cursor to pointer on hover over rivers lines
  // ##########################################################################################################
  map.current?.on("mouseenter", "rivers", () => {
    if (map.current) map.current.getCanvas().style.cursor = "pointer";
  });

  // ##########################################################################################################
  // Function to change back cursor when it leaves
  // ##########################################################################################################
  map.current?.on("mouseleave", "rivers", () => {
    if (map.current) map.current.getCanvas().style.cursor = "";
  });

  // ##########################################################################################################
  // Function set coordinates from clicked river to state
  // ##########################################################################################################
  map.current?.on("click", "rivers", (e: any) => {
    setCoordinates(e.features[0].geometry.coordinates.slice());
  });

  // ##########################################################################################################
  // Return form map component
  // ##########################################################################################################
  return (
    <div>
      <div
        style={{ width: "100%", height: "100vh" }}
        id="map"
        className="rivers-map"
      />
      <button
        style={{ position: "absolute", top: "1vh", left: "1vh" }}
        onClick={() => setOpenRiverForm(true)}
      >
        Dodaj rzeki
      </button>
      <RiverForm
        open={openRiverForm}
        setOpen={setOpenRiverForm}
        setInputText={setRivers}
      />
    </div>
  );
};

export default Map;
