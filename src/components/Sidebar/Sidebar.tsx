/** @format */

import { useState } from "react";
import { Road, SidebarProps } from "../../interfaces";
import style from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import Link from "../Link/Link";
import { ArrowLeftCircle } from "lucide-react";

const Sidebar = ({ roads, map, setRoadId }: SidebarProps) => {
  const [hidden, setHidden] = useState<boolean>(false);
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
    <div>
      <ArrowLeftCircle
        className={`${style.hideButton} ${hidden ? style.hidden : ""}`}
        onClick={() => {
          setHidden(!hidden);
        }}
      />
      <aside
        className={`${style.wrapper} ${hidden ? style.hidden : style.show}`}
      >
        <div>
          <header className={style.header}>
            <h1 className={style.h1}>Galera</h1>
            <img src="/logo.png" alt="" />
          </header>
          <div className={style.road}>
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
              <div key={road.id} className={style.road}>
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
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
