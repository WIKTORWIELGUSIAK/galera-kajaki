/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { Geometry, FeatureCollection, GeoJsonProperties } from "geojson";

const Map = () => {
  const [data, setData] = useState<
    FeatureCollection<Geometry, GeoJsonProperties>
  >({
    type: "FeatureCollection",
    features: [],
  });
  useEffect(() => {
    axios
      .get("newPL.geojson")
      .then((res) => setData(JSON.parse(JSON.stringify(res.data))))
      .catch((err) => console.log(err));
  }, []);
  return <div></div>;
};

export default Map;
