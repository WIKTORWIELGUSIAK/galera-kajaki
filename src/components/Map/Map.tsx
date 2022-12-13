/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Geometry,
  FeatureCollection,
  GeoJsonProperties,
  Feature,
} from "geojson";

const Map = () => {
  const [data, setData] = useState<
    FeatureCollection<Geometry, GeoJsonProperties>
  >({
    type: "FeatureCollection",
    features: [],
  });
  const [selectedRivers, setSelectedRivers] = useState<Feature[]>([]);

  const filteringData = (props: string) => {
    return data.features.filter((el) =>
      el.properties?.RWB_NAME.includes(props)
    );
  };
  const setRivers = (props: string) => {
    if (!selectedRivers.some((el) => el.properties?.RWB_NAME.includes(props))) {
      // If not, add it to the array
      setSelectedRivers([...selectedRivers, ...filteringData(props)]);
    }
  };
  useEffect(() => {
    axios
      .get("polishRivers.geojson")
      .then((res) => setData(JSON.parse(JSON.stringify(res.data))))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <button onClick={() => setRivers("Wisła")}>Wisła</button>
      <button onClick={() => setRivers("Odra")}>Odra</button>
    </div>
  );
};

export default Map;
