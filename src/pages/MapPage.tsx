/** @format */

import axios from "axios";
import { Feature, GeoJsonProperties, LineString, Position } from "geojson";
import { Map, Marker } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomMap from "../components/Map/Map";
import RoadForm from "../components/RoadForm/RoadForm";
import RoadInformations from "../components/RoadInformation/RoadInformations";
import Sidebar from "../components/Sidebar/Sidebar";
import { createRoad } from "../Helpers/createRoad";
import { longestSubarrays } from "../Helpers/longestSubarrays";
import { Road } from "../interfaces";
import StyledMapPage from "./MapPage.module.css";

const MapPage = () => {
  const [selectedRivers, setSelectedRivers] = useState<
    Feature<LineString, GeoJsonProperties>[]
  >([]);
  const [newRoadCoords, setNewRoadCoords] = useState<Position[]>([]);
  const [roads, setRoads] = useState<Road[]>([]);
  const [roadsLoading, setRoadsLoading] = useState<boolean>(true);
  const [map, setMap] = useState<Map | undefined>();
  const [roadId, setRoadId] = useState<number | undefined>();
  const [startEdit, setStartEdit] = useState(false);
  const [riversData, setRiversData] = useState<any>();

  useEffect(() => {
    const config = {
      method: "get",
      url: `http://localhost:3001/getRoads`,
      headers: {
        accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {},
    };
    axios(config)
      .then(function (response) {
        setRoads(response.data);
        setRoadsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // const testMarker = new Marker();
  // const testMarker2 = new Marker();
  // const testMarker3 = new Marker();
  // const testMarker4 = new Marker();
  // if (map) {
  //   testMarker.setLngLat([21.12368, 49.53092]).addTo(map);
  //   testMarker2.setLngLat([21.12342, 49.53089]).addTo(map);
  //   testMarker3.setLngLat([21.12368, 49.53092]).addTo(map);
  // }
  // useEffect(() => {
  //   axios
  //     .get("newPL.geojson")
  //     .then((res) => {
  //       const data = JSON.parse(JSON.stringify(res.data));
  //       setRiversData(data);
  //       const rivers: any = [];
  //       console.log(data.features[0]);
  //       data.features.map((feature: any) => {
  //         if (feature.geometry.type === "MultiLineString") {
  //           feature.geometry.coordinates.map((coordinates: any, index: any) => {
  //             const tempFeature = {
  //               type: "Feature",
  //               geometry: { type: "LineString", coordinates: coordinates },
  //               properties: {
  //                 RWB_NAME: `${feature.properties.RWB_NAME} ${index}`,
  //               },
  //             };
  //             rivers.push(tempFeature);
  //           });

  //           // feature.geometry.features.map(())
  //         } else {
  //           rivers.push(feature);
  //         }
  //       });
  //       // data.features.map((a: any) => {
  //       //   console.log(a.properties.RWB_NAME);
  //       // });
  //       console.log(rivers);
  //       const test = data.features.filter((feature: any) =>
  //         feature.properties.RWB_NAME.includes("Ropa")
  //       );
  //       setSelectedRivers(test);
  //       const test2 = longestSubarrays(test[0].geometry.coordinates);
  //       let test3: any = [];
  //       test2.map((a: any) => {
  //         test3.push(...a);
  //       });

  //       // test[0].geometry.coordinates.map((t6: any) => {
  //       //   setSelectedRivers([
  //       //     ...selectedRivers,
  //       //     {
  //       //       type: "Feature",
  //       //       geometry: { type: "LineString", coordinates: t6 },
  //       //       properties: { RWB_NAME: "" },
  //       //     },
  //       //   ]);
  //       // });
  //       const testArray: any = [];
  //       test[0].geometry.coordinates.map((t: any) => {
  //         testArray.push({
  //           type: "Feature",
  //           geometry: { type: "LineString", coordinates: t },
  //           properties: { RWB_NAME: "" },
  //         });
  //         // setSelectedRivers([
  //         //   ...selectedRivers,
  //         //   {
  //         //     type: "Feature",
  //         //     geometry: { type: "LineString", coordinates: t },
  //         //     properties: { RWB_NAME: "" },
  //         //   },
  //         // ]);
  //       });
  //       // setSelectedRivers(testArray);
  //       // setSelectedRivers([
  //       //   {
  //       //     type: "Feature",
  //       //     geometry: {
  //       //       type: "LineString",
  //       //       coordinates: test[0].geometry.coordinates[0],
  //       //     },
  //       //     properties: { RWB_NAME: "" },
  //       //   },
  //       // ]);
  //       // setSelectedRivers([
  //       //   {
  //       //     type: "Feature",
  //       //     geometry: { type: "LineString", coordinates: test3 },
  //       //     properties: { RWB_NAME: "" },
  //       //   },
  //       // ]);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // useEffect(() => {
  //   if (riversData) {
  //     riversData.features.map((t: any) => {
  //       console.log(t);
  //     });
  //   }
  // }, [riversData]);
  return !roadsLoading ? (
    <main className={StyledMapPage.main}>
      <Router>
        {map ? (
          <Routes>
            <Route
              path="/"
              element={
                <Sidebar
                  selectedRivers={selectedRivers}
                  setSelectedRivers={setSelectedRivers}
                  newRoadCoords={newRoadCoords}
                  setNewRoadCoords={setNewRoadCoords}
                  roads={roads}
                  setRoads={setRoads}
                  setRoadsLoading={setRoadsLoading}
                  map={map}
                  setMap={setMap}
                  roadId={roadId}
                  setRoadId={setRoadId}
                  setStartEdit={setStartEdit}
                  startEdit={startEdit}
                />
              }
            />
            {roads.map((road) => {
              return (
                <Route
                  key={road.id}
                  path={`/road${road.id}`}
                  element={
                    <RoadInformations
                      map={map}
                      roads={roads}
                      road={road}
                      setSelectedRivers={setSelectedRivers}
                      setNewRoadCoords={setNewRoadCoords}
                      setStartEdit={setStartEdit}
                    />
                  }
                />
              );
            })}
            {roads.map((road) => {
              return (
                <Route
                  key={road.id}
                  path={`/road${road.id}/edit`}
                  element={
                    <RoadForm
                      map={map}
                      road={road}
                      roads={roads}
                      newRoadCoords={newRoadCoords}
                      selectedRivers={selectedRivers}
                      setRoads={setRoads}
                      setNewRoadCoords={setNewRoadCoords}
                      setSelectedRivers={setSelectedRivers}
                      roadId={roadId}
                      startEdit={startEdit}
                      setStartEdit={setStartEdit}
                    />
                  }
                />
              );
            })}
            <Route
              path={`/road/add`}
              element={
                <RoadForm
                  map={map}
                  roads={roads}
                  newRoadCoords={newRoadCoords}
                  selectedRivers={selectedRivers}
                  setRoads={setRoads}
                  setNewRoadCoords={setNewRoadCoords}
                  setSelectedRivers={setSelectedRivers}
                  roadId={roadId}
                  startEdit={startEdit}
                  setStartEdit={setStartEdit}
                />
              }
            />
          </Routes>
        ) : (
          <div>Map Loading...</div>
        )}
        <CustomMap
          selectedRivers={selectedRivers}
          newRoadCoords={newRoadCoords}
          setNewRoadCoords={setNewRoadCoords}
          roads={roads}
          setRoads={setRoads}
          map={map}
          setMap={setMap}
          roadId={roadId}
        />
      </Router>
    </main>
  ) : (
    <div>Loading...</div>
  );
};

export default MapPage;
