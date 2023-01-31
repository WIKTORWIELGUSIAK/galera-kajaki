/** @format */

import { Feature, GeoJsonProperties, LineString, Position } from "geojson";
import { Map } from "mapbox-gl";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Road, RoadInformationsInterface } from "../../interfaces";
import { ArrowLeftCircle, Edit } from "lucide-react";

import style from "./RoadInformations.module.css";

const RoadInformations = ({
  map,
  roads,
  setSelectedRivers,
  setNewRoadCoords,
  setStartEdit,
  road,
}: RoadInformationsInterface) => {
  const navigate = useNavigate();
  const arrowLeftClickHandler = () => {
    roads.map((road: Road, index: number) => {
      map.setLayoutProperty(`Layer${road.id}`, "visibility", "visible");
      map.setPaintProperty(
        `Layer${road.id}`,
        "line-color",
        JSON.parse(road.properties).color
      );
      map.setPaintProperty(`Layer${road.id}`, "line-opacity", 1);
    });

    setSelectedRivers([]);
    setNewRoadCoords([]);
    navigate("/");
  };
  const editClickHandler = () => {
    navigate(`/road${road.id}/edit`);

    let index: number = 0;
    const foundRoad = roads.find((tempRoad: Road) => {
      tempRoad == road;
      return tempRoad;
    });
    console.log(roads[0] === road);
    if (foundRoad) {
      index = roads.indexOf(foundRoad);
      console.log(index);
      map.setPaintProperty(
        "road",
        "line-color",
        JSON.parse(road.properties).color
      );
      map.setLayoutProperty("road", "visibility", "visible");
      map.setLayoutProperty(`Layer${road.id}`, "visibility", "none");

      setStartEdit(true);
      setSelectedRivers(JSON.parse(road.selectedRivers));
      setNewRoadCoords(JSON.parse(road.roadCoordinates));
    }
  };

  return (
    <div className={style.RoadInformations}>
      <h2 className={style.h2}>{road.name}</h2>
      <p className={style.description}>
        {JSON.parse(road.properties).description}
      </p>
      <div className={style.buttons}>
        <Edit onClick={editClickHandler} className={style.editIcon} />
        <ArrowLeftCircle
          onClick={arrowLeftClickHandler}
          className={style.arrowIcon}
        />
      </div>
      {/* <EditBar /> */}
    </div>
  );
};

export default RoadInformations;
