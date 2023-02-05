/** @format */

import { useForm } from "react-hook-form";
import axios from "axios";
import { Feature, GeoJsonProperties } from "geojson";
import { LineString } from "@turf/turf";
import style from "./SelectedRiversForm.module.css";
import {
  SelectedRiversFormData,
  SelectedRiversFormInterface,
} from "../../interfaces";

function SelectedRiversForm({
  selectedRivers,
  setSelectedRivers,
}: SelectedRiversFormInterface) {
  const submitForm = (data: SelectedRiversFormData) => {
    console.log("submit");
    const config = {
      method: "get",
      url: `galera-backend-service.vercel.app/search_river?name=${data.riverName}`,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { riverName: "" },
  });
  return (
    <div>
      <h4>Dodaj rzeki do wyświetlania:</h4>
      <form onSubmit={handleSubmit(submitForm)} className="modalForm">
        <input
          type="text"
          {...register("riverName", { required: true, minLength: 3 })}
          className={`${style.textInput} ${
            errors.riverName ? style.error : ""
          }`}
        />
        {errors.riverName && (
          <p
            className={`${style.errorMessage} ${
              errors.riverName ? style.error : ""
            }`}
          >
            Proszę podaj jedną z polskich rzek
          </p>
        )}
        <button type="submit" className={style.button}>
          Dodaj rzekę
        </button>
      </form>
    </div>
  );
}

export default SelectedRiversForm;
