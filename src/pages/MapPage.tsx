/** @format */

import {
  axios,
  Feature,
  GeoJsonProperties,
  LineString,
  Position,
  useEffect,
  useState,
  Router,
  Route,
  Routes,
} from "../shared";
import CustomMap from "../components/Map/Map";
import { MapboxGLMap } from "../shared";
import RoadForm from "../components/RoadForm/RoadForm";
import RoadInformations from "../components/RoadInformation/RoadInformations";
import Sidebar from "../components/Sidebar/Sidebar";
import { Road } from "../interfaces";
import StyledMapPage from "./MapPage.module.css";
import { SERVER_URL } from "../../config";

const MapPage = () => {
  const [selectedRivers, setSelectedRivers] = useState<
    Feature<LineString, GeoJsonProperties>[]
  >([]);
  const [newRoadCoords, setNewRoadCoords] = useState<Position[]>([]);
  const [roads, setRoads] = useState<Road[]>([]);
  const [roadsLoading, setRoadsLoading] = useState<boolean>(true);
  const [map, setMap] = useState<MapboxGLMap | undefined>();
  const [roadId, setRoadId] = useState<number | undefined>();
  const [startEdit, setStartEdit] = useState(false);

  useEffect(() => {
    const config = {
      method: "get",
      url: `${SERVER_URL}/getRoads`,
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
  useEffect(() => {
    if (map) {
      if (location.pathname === "/") {
        return;
      } else if (location.pathname === "/road/add") {
        roads.map((road: Road) => {
          map.setLayoutProperty(`Layer${road.id}`, "visibility", "none");
        });
      } else if (location.pathname.split("/").length - 1 === 1) {
        roads.map((road: Road) => {
          map.setLayoutProperty(`Layer${road.id}`, "visibility", "none");
        });
        const id = location.pathname.split("road")[1];
        map.setLayoutProperty(`Layer${id}`, "visibility", "visible");
      } else {
        console.log(location.pathname);
        const roadPath = location.pathname.split("/")[1];
        const id = roadPath.split("road")[1];
        console.log(id);
        console.log(roads);
        const road = roads.find((road) => road.id === JSON.parse(id));
        map.setLayoutProperty("road", "visibility", "visible");
        const color = road?.properties;
        console.log(color);
        if (road) {
          map.setPaintProperty(
            "road",
            "line-color",
            JSON.parse(road.properties).color
          );
        }
        roads.map((road) => {
          map.setLayoutProperty(`Layer${road.id}`, "visibility", "none");
        });
        if (road) {
          setSelectedRivers(JSON.parse(road.selectedRivers));
          setNewRoadCoords(JSON.parse(road.roadCoordinates));
        }
      }
    }
    localStorage.setItem("isTrue", "true");
  }, [map, location.pathname]);
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
          // firstOpen={firstOpen}
        />
      </Router>
    </main>
  ) : (
    <div>Loading...</div>
  );
};

export default MapPage;
