/** @format */

import { useEffect } from "react";
import { SourcesConfig } from "../../interfaces";

function Sources({
  map,
  data,
  roads,
  setLoadingSource,
  setMap,
}: SourcesConfig) {
  useEffect(() => {
    if (!map) return;
    data.map((source) => {
      map.once("style.load", () => {
        setMap(map);
        map.addSource(source.id, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [],
            },
            properties: {
              title: "Road",
              "marker-symbol": "monument",
            },
          },
        });
        roads.map((source) => {
          if (map.getSource(`Road${source.id}`)) {
            return;
          } else {
            map.addSource(`Road${source.id}`, {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: JSON.parse(source.roadCoordinates),
                },
                properties: {
                  title: "Road",
                  "marker-symbol": "monument",
                },
              },
            });
            setLoadingSource(false);
          }
        });
      });
    });
  }, [map]);

  return null;
}

export default Sources;
