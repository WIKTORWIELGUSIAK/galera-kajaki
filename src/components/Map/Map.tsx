/** @format */

import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  LineString,
  PathFinder,
  Point,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "../../shared";
import "mapbox-gl/dist/mapbox-gl.css";
import "/src/App.css";
import CustomMarker from "../Marker/CustomMarker";
import { MapProps, Road, SourcesConfig } from "../../interfaces";
import Layer from "../Layer/Layer";
import Source from "../Source/Source";
import { findClosestCoords } from "../../Helpers/findClosestCords";
import {
  EventData,
  GeoJSONSource,
  LngLatLike,
  MapboxGLMap,
  MapMouseEvent,
  Marker,
} from "../../shared";

const Map = ({
  selectedRivers,
  newRoadCoords,
  setNewRoadCoords,
  roads,
  setMap,
}: MapProps) => {
  const startMarkerRef = useRef<Marker | null>(null);
  const endMarkerRef = useRef<Marker | null>(null);

  const [pathFinder, setPathFinder] =
    useState<PathFinder<LineString, GeoJsonProperties>>();
  const [loadingSource, setLoadingSource] = useState(true);
  const initialMapState = {
    lngLat: { lng: 20, lat: 50.04 },
    zoom: 8,
  };
  const [coordinates, setCoordinates] = useState<number[][]>([]);
  const [startMarkerCoords, setStartMarkerCoords] = useState<number[]>([]);
  const [endMarkerCoords, setEndMarkerCoords] = useState<number[]>([]);

  const map = useRef<MapboxGLMap | undefined>();
  const mapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (map.current) return;
    map.current = new MapboxGLMap({
      container: mapContainer.current!,
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [initialMapState.lngLat.lng, initialMapState.lngLat.lat],
      zoom: initialMapState.zoom,
    });
  }, []);

  useEffect(() => {
    let tempCoordinates: number[][] = [];
    selectedRivers.map((selectedRiver: Feature) => {
      if (selectedRiver.geometry.type === "LineString")
        selectedRiver.geometry.coordinates.map((cord: number[]) => {
          tempCoordinates.push(cord);
        });
    });
    setCoordinates(() => {
      return tempCoordinates;
    });
  }, [selectedRivers]);
  useEffect(() => {
    if (newRoadCoords.length > 0) {
      startMarkerRef.current = new Marker({ draggable: true });
      setStartMarkerCoords(newRoadCoords[0]);
      endMarkerRef.current = new Marker({ draggable: true });
      setEndMarkerCoords(newRoadCoords[newRoadCoords.length - 1]);
    } else {
      startMarkerRef.current = null;
      endMarkerRef.current = null;
      setStartMarkerCoords([]);
      setEndMarkerCoords([]);
    }
  }, [newRoadCoords]);
  const listener = useCallback(
    (e: MapMouseEvent) => {
      if (coordinates.length === 0) {
        return;
      }
      const cords = findClosestCoords(coordinates, [
        e.lngLat.lng,
        e.lngLat.lat,
      ]);

      if (!startMarkerRef.current) {
        createStartMarker(cords);
      } else if (!endMarkerRef.current) {
        createEndMarker(cords);
      } else {
        updateEndMarker(cords);
      }
    },
    [coordinates]
  );

  const createStartMarker = (cords: number[]) => {
    startMarkerRef.current = new Marker({ draggable: true });
    setStartMarkerCoords(cords);
  };

  const createEndMarker = (cords: number[]) => {
    endMarkerRef.current = new Marker({ draggable: true });
    setEndMarkerCoords(cords);
  };
  const updateEndMarker = (cords: number[]) => {
    setEndMarkerCoords(cords);
  };

  useEffect(() => {
    if (map.current) {
      map.current.on("click", "rivers", listener);
    }
    return () => {
      map.current?.off("click", "rivers", listener);
    };
  }, [map, coordinates]);

  const startCoordinate: Feature<Point, GeoJsonProperties> = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: startMarkerCoords,
    },
    properties: {
      name: "Dinagat Islands",
    },
  };
  const endCoordinate: Feature<Point, GeoJsonProperties> = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: endMarkerCoords,
    },
    properties: {
      name: "Dinagat Islands",
    },
  };
  useEffect(() => {
    if (pathFinder && startMarkerCoords && endMarkerCoords) {
      const path = pathFinder.findPath(startCoordinate, endCoordinate);
      if (path) setNewRoadCoords(path.path);
    }
  }, [startMarkerCoords, endMarkerCoords]);
  useEffect(() => {
    const geoJSONObject: FeatureCollection<LineString> = {
      type: "FeatureCollection",
      features: selectedRivers as Feature<LineString, GeoJsonProperties>[],
    };
    const newPathFinder: PathFinder<LineString, GeoJsonProperties> =
      new PathFinder(geoJSONObject);
    setPathFinder(newPathFinder);
  }, [selectedRivers]);
  useEffect(() => {
    if (map.current?.getSource("mapData")) {
      (map.current.getSource("mapData") as GeoJSONSource).setData({
        type: "FeatureCollection",
        features: selectedRivers,
      });
    }
  }, [selectedRivers]);
  useEffect(() => {
    if (map.current?.getSource("newRoad")) {
      (map.current.getSource("newRoad") as GeoJSONSource).setData({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: newRoadCoords,
        },
        properties: {
          title: "Road",
          "marker-symbol": "monument",
        },
      });
    }
  }, [newRoadCoords]);
  map.current?.on("mouseenter", "rivers", () => {
    if (map.current) map.current.getCanvas().style.cursor = "pointer";
  });
  map.current?.on("mouseleave", "rivers", () => {
    if (map.current) map.current.getCanvas().style.cursor = "";
  });

  function handleMarkerDragEnd(
    e: EventData,
    firstMarker: boolean = true
  ): void {
    const coords = findClosestCoords(coordinates, [
      e.target.getLngLat().lng,
      e.target.getLngLat().lat,
    ]);
    if (firstMarker) {
      setStartMarkerCoords((prev: number[]) => coords);
    } else {
      setEndMarkerCoords((prev: number[]) => coords);
    }
  }
  const sourcesConfig: SourcesConfig = {
    setMap: setMap,
    map: map.current as MapboxGLMap,
    roads: roads,
    setLoadingSource: setLoadingSource,
    loadingSource,
    data: [
      {
        id: "mapData",
        sourceData: [],
      },
      {
        id: "newRoad",
        sourceData: newRoadCoords,
      },
    ],
  };
  return (
    <div>
      <div
        style={{ width: "100%", height: "100vh" }}
        ref={mapContainer}
        className="rivers-map"
      >
        <Source {...sourcesConfig} />

        <Layer
          id="rivers"
          source="mapData"
          color="#79bcec"
          map={map.current}
          loadingSource={loadingSource}
        />
        <Layer
          id="road"
          source="newRoad"
          color="black"
          map={map.current}
          loadingSource={loadingSource}
        />
        {roads.map((road: Road) => {
          return (
            <Layer
              key={road.id}
              id={`Layer${JSON.stringify(road.id)}`}
              source={`Road${road.id}`}
              color={JSON.parse(road.properties).color}
              map={map.current}
              loadingSource={loadingSource}
            />
          );
        })}
      </div>
      {startMarkerRef.current ? (
        <CustomMarker
          map={map.current}
          marker={startMarkerRef.current}
          lngLat={startMarkerCoords as LngLatLike}
          onDragEnd={(e) => handleMarkerDragEnd(e)}
          coords={newRoadCoords}
        />
      ) : null}
      {endMarkerCoords ? (
        <CustomMarker
          map={map.current}
          marker={endMarkerRef.current}
          lngLat={endMarkerCoords as LngLatLike}
          onDragEnd={(e) => handleMarkerDragEnd(e, false)}
          coords={newRoadCoords}
        />
      ) : null}
    </div>
  );
};
// });

export default Map;
