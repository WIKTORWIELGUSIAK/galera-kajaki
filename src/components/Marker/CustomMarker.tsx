/** @format */

import { useEffect } from "react";
import { MarkerProps } from "../../interfaces";

const CustomMarker = ({
  map,
  marker,
  lngLat,
  onDragEnd,
  coords,
}: MarkerProps) => {
  useEffect(() => {
    if (!map || !marker) return;
    marker.setLngLat(lngLat).addTo(map);

    if (onDragEnd) {
      marker.on("dragend", onDragEnd);
    }
    if (coords.length === 0) {
      marker.remove();
    }
    return () => {
      marker.remove();
    };
  }, [map, marker, lngLat, onDragEnd, coords]);
  return null;
};

export default CustomMarker;
