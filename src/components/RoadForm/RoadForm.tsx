/** @format */

import styles from "./RoadForm.module.css";
import { Road, RoadFormInterface, RoadFormData } from "../../interfaces";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ArrowLeftCircle } from "lucide-react";
import SelectedRiversForm from "../SelectedRiversForm/SelectedRiversForm";
import { replaceElement } from "../../Helpers/replaceElement";
import { SERVER_URL } from "../../../config";

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

      url: `${SERVER_URL}/roads`,
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
    if (roads.length > 0) {
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
      if (!startEdit) {
        roads.map((road: Road) => {
          map.setLayoutProperty(`Layer${road.id}`, "visibility", "visible");
        });
      }
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();
  const color = watch("color");
  useEffect(() => {
    if (map.getLayer("road")) {
      if (color !== "") map.setPaintProperty("road", "line-color", color);
    }
  }, [color]);
  const clickArrowHandler = () => {
    if (road) {
      map.setLayoutProperty("road", "visibility", "none");
      map.setLayoutProperty(`Layer${road.id}`, "visibility", "visible");

      setStartEdit(false);
      setNewRoadCoords([]);
      setSelectedRivers([]);
      map.setLayoutProperty("road", "visibility", "visible");
    } else {
      roads.map((road: Road) => {
        map.setLayoutProperty(`Layer${road.id}`, "visibility", "visible");
      });
      setNewRoadCoords([]);
      setSelectedRivers([]);
    }
    road ? navigate(`/road${road.id}`) : navigate("/");
  };
  return (
    <div className={styles.RoadForm}>
      <h2 className={styles.h2}>{road ? road.name : "Nowa trasa"}</h2>
      <p className={styles.description}></p>
      <div className={styles.buttons}>
        <ArrowLeftCircle
          onClick={clickArrowHandler}
          className={styles.arrowIcon}
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
            className={styles.textInput}
            {...register("name", { required: true, minLength: 3 })}
          />
        </div>
        {errors.name && (
          <p
            className={`${styles.errorMessage} ${
              errors.name ? styles.error : ""
            }`}
          >
            Proszę podaj jedną z polskich rzek
          </p>
        )}
        <label htmlFor="description">Opis trasy:</label>
        <input
          id="description"
          type="text"
          className={styles.textInput}
          {...register("description")}
        />
        <div className={styles.colorSelect}>
          <label htmlFor="color">Kolor:</label>
          <input
            id="color"
            type="color"
            className={styles.color}
            {...register("color")}
          />
        </div>
        <button type="submit" className={styles.button}>
          {startEdit ? "Zapisz" : "Dodaj trasę"}
        </button>
      </form>
    </div>
  );
};

export default RoadForm;
