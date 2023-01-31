/** @format */

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SidebarProps } from "../../interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Feature, GeoJsonProperties, LineString } from "geojson";
import RiverForm from "../RiverForm/RiverForm";
import { Marker } from "mapbox-gl";
import chroma from "chroma-js";

const schema = yup.object().shape({
  riverName: yup.string().required(),
});

const Sidebar = forwardRef<any, SidebarProps>((props, ref) => {
  const {
    selectedRivers,
    setSelectedRivers,
    newRoadCoords,
    setNewRoadCoords,
    roads,
    setRoads,
    map,
    roadId,
    setRoadId,
    setStartEdit,
    startEdit,
    setHovered,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const submitForm = (data: any) => {
    const config = {
      method: "get",
      url: `http://localhost:3001/search_river?name=${data.riverName}`,
      headers: {
        accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {},
    };
    axios(config)
      .then(function (response) {
        let features: Feature<LineString, GeoJsonProperties>[] = [];
        response.data.coordinates.map((coordinatesArray: number[][]) => {
          const feature = {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: coordinatesArray,
            },
            properties: { RWB_NAME: response.data.name },
          };
          features.push(feature as Feature<LineString, GeoJsonProperties>);
        });
        setSelectedRivers([...selectedRivers, ...features]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const turnOffLayouts = () => {
    roads.map((road: any) => {
      map.setLayoutProperty(`Layer${road.id}`, "visibility", "none");
    });
  };
  const turnOnLayouts = () => {
    roads.map((road: any) => {
      map.setLayoutProperty(`Layer${road.id}`, "visibility", "visible");
    });
    setSelectedRivers([]);
    setNewRoadCoords([]);
  };
  console.log(colors);

  return (
    <div style={{ width: "20vw", backgroundColor: "green" }}>
      <h4>Dodaj trasę</h4>
      <button onClick={turnOffLayouts}>Dodaj trasę</button>
      <h4>Dodaj rzeki do wyświetlania</h4>
      <form onSubmit={handleSubmit(submitForm)} className="modalForm">
        <input type="text" {...register("riverName")} />
        <button type="submit">Dodaj</button>
      </form>
      <h4>Dodaj trasę</h4>
      <RiverForm
        selectedRivers={selectedRivers}
        newRoadCoords={newRoadCoords}
        roads={roads}
        setRoads={setRoads}
        map={map}
        setNewRoadCoords={setNewRoadCoords}
        setSelectedRivers={setSelectedRivers}
        setStartEdit={setStartEdit}
        startEdit={startEdit}
        roadId={roadId}
      />
      <button onClick={turnOnLayouts}>Zakończ tryb dodawania</button>

      {roads.map((road: any, index: any) => {
        return (
          <div
            key={road.id}
            onMouseEnter={() => {
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
              setHovered(road);
              map.setPaintProperty(`Layer${road.id}`, "line-width", 10);
              console.log(colors);
              roads.map((tempRoad: any) => {
                if (tempRoad !== road) {
                  map.setPaintProperty(
                    `Layer${tempRoad.id}`,
                    "line-color",
                    "grey"
                  );
                  map.setPaintProperty(
                    `Layer${tempRoad.id}`,
                    "line-opacity",
                    0.5
                  );
                }
              });
            }}
            onMouseLeave={() => {
              setHovered(null);
              roads.map((tempRoad: any, index: any) => {
                map.setPaintProperty(
                  `Layer${tempRoad.id}`,
                  "line-color",
                  colors[index]
                );
                map.setPaintProperty(`Layer${tempRoad.id}`, "line-opacity", 1);
              });
              map.setPaintProperty(`Layer${road.id}`, "line-width", 6);
            }}
            onClick={() => {
              roads.map((road: any) => {
                map.setLayoutProperty(`Layer${road.id}`, "visibility", "none");
              });
              // map.setLayoutProperty(`Layer${road.id}`, "visibility", "visible");
              const test = roads.find((tempRoad: any) => tempRoad === road);
              setRoadId(roads.find((tempRoad: any) => tempRoad === road).id);
              const index = roads.indexOf(
                roads.find((tempRoad: any) => tempRoad === road)
              );
              setSelectedRivers(JSON.parse(road.selectedRivers));
              setNewRoadCoords(JSON.parse(road.roadCoordinates));
              map.setPaintProperty(
                "road",
                "line-color",
                JSON.parse(road.properties).color
              );
              setStartEdit(true);

              // startMarkerRef.current = new Marker({ draggable: true });
              // startMarkerRef.current
              //   .setLngLat(JSON.parse(road.roadCoordinates)[0])
              //   .addTo(map);
              // console.log(startMarkerRef);
            }}
          >
            {road.name}
          </div>
        );
      })}
    </div>
  );
});

export default Sidebar;
