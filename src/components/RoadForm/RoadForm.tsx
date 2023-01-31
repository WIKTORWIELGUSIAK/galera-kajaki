/** @format */

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeftCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Road, RoadFormInterface, RoadFormData } from "../../interfaces";
import style from "./RoadForm.module.css";
import axios from "axios";
import SelectedRiversForm from "../SelectedRiversForm/SelectedRiversForm";
import { replaceElement } from "../../Helpers/replaceElement";

const schema = yup.object().shape({
  name: yup.string().required(),
});
const RoadForm = ({
  map,
  road,
  roads,
  setRoads,
  newRoadCoords,
  setNewRoadCoords,
  selectedRivers,
  setSelectedRivers,
  roadId,
  startEdit,
  setStartEdit,
}: RoadFormInterface) => {
  const initialValues = {
    name: road ? road.name : "",
    description: road ? JSON.parse(road.properties).description : "",
    color: road ? JSON.parse(road.properties).color : "",
  };
  const submitForm = (data: RoadFormData) => {
    const postData = {
      name: data.name,
      roadCoordinates: JSON.stringify(newRoadCoords),
      selectedRivers: JSON.stringify(selectedRivers),
      properties: JSON.stringify({
        description: data.description,
        color: data.color,
      }),
    };
    const putData = {
      id: roadId,
      name: data.name,
      roadCoordinates: JSON.stringify(newRoadCoords),
      selectedRivers: JSON.stringify(selectedRivers),
      properties: JSON.stringify({
        description: data.description,
        color: data.color,
      }),
    };
    const config = {
      method: startEdit ? "put" : "post",
      url: `http://127.0.0.1:3001/roads/`,
      headers: {
        accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
      },
      data: startEdit ? putData : postData,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (map.getSource(`Road${roads[roads.length - 1].id + 1}`)) {
      return;
    } else {
      map.addSource(`Road${roads[roads.length - 1].id + 1}`, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: newRoadCoords,
          },
          properties: {
            title: "Road",
            "marker-symbol": "monument",
          },
        },
      });
      if (!startEdit) {
        const newRoad = {
          id: roads[roads.length - 1].id + 1,
          name: data.name,
          roadCoordinates: JSON.stringify(newRoadCoords),
          selectedRivers: JSON.stringify(selectedRivers),
          properties: JSON.stringify({
            description: data.description,
            color: data.color,
          }),
        };
        setRoads([...roads, newRoad]);
        navigate("/");
      } else {
        if (road) {
          const newRoad = {
            id: road.id,
            name: data.name,
            roadCoordinates: JSON.stringify(newRoadCoords),
            selectedRivers: JSON.stringify(selectedRivers),
            properties: JSON.stringify({
              description: data.description,
              color: data.color,
            }),
          };
          const tempRoads = roads;
          setRoads(replaceElement(tempRoads, newRoad));
          map.setLayoutProperty(`Layer${road.id}`, "visibility", "visible");

          navigate(`/road${road.id}`);
        }
      }
      setNewRoadCoords([]);
      setSelectedRivers([]);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: initialValues });

  const navigate = useNavigate();

  const color = watch("color");
  useEffect(() => {
    console.log(color);
    if (color !== "") map.setPaintProperty("road", "line-color", color);
  }, [color]);
  const clickArrowHandler = () => {
    if (road) {
      map.setLayoutProperty("road", "visibility", "none");
      map.setLayoutProperty(`Layer${road.id}`, "visibility", "visible");

      setStartEdit(false);
      setNewRoadCoords([]);
      setSelectedRivers([]);
    } else {
      roads.map((road: Road) => {
        map.setLayoutProperty(`Layer${road.id}`, "visibility", "visible");
      });
      setNewRoadCoords([]);
      setSelectedRivers([]);
      console.log(map.getStyle().layers);
    }
    road ? navigate(`/road${road.id}`) : navigate("/");
  };
  return (
    <div className={style.RoadForm}>
      <h2 className={style.h2}>{road ? road.name : "Nowa trasa"}</h2>
      <p className={style.description}>
        {/* {JSON.parse(road.properties).description} */}
      </p>
      <div className={style.buttons}>
        <ArrowLeftCircle
          onClick={clickArrowHandler}
          className={style.arrowIcon}
        />
      </div>
      <SelectedRiversForm
        selectedRivers={selectedRivers}
        setSelectedRivers={setSelectedRivers}
      />
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <label htmlFor="name">Nazwa trasy:</label>
          <input
            id="name"
            type="text"
            className={style.textInput}
            {...register("name")}
          />
        </div>
        <label htmlFor="description">Opis trasy:</label>
        <input
          id="description"
          type="text"
          className={style.textInput}
          {...register("description")}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="color">Kolor:</label>
          <input
            id="color"
            type="color"
            className={style.color}
            {...register("color")}
          />
        </div>
        <button type="submit" className={style.button}>
          {startEdit ? "Zapisz" : "Dodaj trasę"}
        </button>
      </form>
    </div>
  );
};

export default RoadForm;