/** @format */

import { useEffect } from "react";
import { LayerProps } from "../../interfaces";

function Layer({ id, source, color, map, loadingSource }: LayerProps) {
  useEffect(() => {
    if (loadingSource) return;
    if (map?.getLayer(id)) {
      return;
    } else {
      map?.addLayer({
        id: id,
        type: "line",
        source: source,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": color,
          "line-width": 6,
          "line-opacity": 1,
        },
      });
    }
  }, [loadingSource]);
  return null;
}

export default Layer;
