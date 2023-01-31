/** @format */

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Road, SidebarProps } from "../../interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Feature, GeoJsonProperties, LineString } from "geojson";
import StyledSidebar from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import Link from "../Link/Link";

const schema = yup.object().shape({
  riverName: yup.string().required(),
});

const Sidebar = ({
  selectedRivers,
  setSelectedRivers,
  setNewRoadCoords,
  roads,
  map,
  setRoadId,
}: SidebarProps) => {
  const clickHandler = (road: Road, index: number) => {
    navigate(`road${road.id}`);
    roads.map((road: Road) => {
      map.setLayoutProperty(`Layer${road.id}`, "visibility", "none");
    });
    map.setLayoutProperty(`Layer${road.id}`, "visibility", "visible");
    setRoadId(roads.find((tempRoad: Road) => tempRoad === road)?.id);
    map.setLayoutProperty("road", "visibility", "none");
    map.setPaintProperty(
      "road",
      "line-color",
      JSON.parse(road.properties).color
    );
  };

  const addNewClickHandler = () => {
    roads.map((road: Road) => {
      map.setLayoutProperty(`Layer${road.id}`, "visibility", "none");
    });
    navigate("road/add");
  };

  const mouseEnterHandler = (road: Road, index: number) => {
    let myLayer = map.getLayer(`Layer${road.id}`);
    if (myLayer) {
      map.removeLayer(`Layer${road.id}`);
      map.addLayer({
        id: `Layer${road.id}`,
        type: "line",
        source: `Road${road.id}`,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": JSON.parse(road.properties).color,
          "line-width": 6,
        },
      });
    }
    roads.map((tempRoad: Road) => {
      if (tempRoad !== road) {
        // map.setPaintProperty(`Layer${tempRoad.id}`, "line-color", "grey");
        map.setPaintProperty(`Layer${tempRoad.id}`, "line-opacity", 0.2);
      }
    });
  };
  const mouseLeaveHandler = (road: Road) => {
    roads.map((tempRoad: Road) => {
      map.removeLayer(`Layer${tempRoad.id}`);
      map.addLayer({
        id: `Layer${tempRoad.id}`,
        type: "line",
        source: `Road${tempRoad.id}`,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": JSON.parse(tempRoad.properties).color,
          "line-width": 6,
        },
      });

      map.setPaintProperty(`Layer${tempRoad.id}`, "line-opacity", 1);
    });
  };

  const navigate = useNavigate();

  return (
    <aside className={StyledSidebar.wrapper}>
      <header className={StyledSidebar.header}>
        <h1 className={StyledSidebar.h1}>Galera</h1>
        <img src="/public/logo.png" alt="" />
      </header>
      <div className={StyledSidebar.road}>
        <Link
          name="Dodaj"
          addNew={true}
          clickHandler={addNewClickHandler}
          mouseEnterHandler={() => {}}
          mouseLeaveHandler={() => {}}
        />
      </div>
      {roads.map((road: Road, index: number) => {
        return (
          <div key={road.id} className={StyledSidebar.road}>
            <Link
              name={road.name}
              addNew={false}
              clickHandler={() => clickHandler(road, index)}
              mouseEnterHandler={() => mouseEnterHandler(road, index)}
              mouseLeaveHandler={() => mouseLeaveHandler(road)}
            />
          </div>
        );
      })}
    </aside>
  );
};

export default Sidebar;
