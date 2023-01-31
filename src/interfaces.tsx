/** @format */

import { LineString } from "@turf/turf";
import { Feature, GeoJsonProperties, Position } from "geojson";
import { EventData, LngLatLike, Map, Marker } from "mapbox-gl";
import { Dispatch, SetStateAction } from "react";

export interface RiverFormInterface {
  selectedRivers: Feature[];
  newRoadCoords: Position[];
  roads: Road[];
  setRoads: Dispatch<SetStateAction<Road[]>>;
  map: Map;
  setNewRoadCoords: Dispatch<SetStateAction<Position[]>>;
  setSelectedRivers: Dispatch<
    SetStateAction<Feature<LineString, GeoJsonProperties>[]>
  >;
  setStartEdit: Dispatch<SetStateAction<boolean>>;
  startEdit: boolean;
  roadId: number | undefined;
}
export interface GeoJsonObject {
  type: string;
  features: Feature[];
}
export interface SourcesConfig {
  roads: Road[];
  map: Map;
  setMap: Dispatch<SetStateAction<Map | undefined>>;
  data: Source[];
  setLoadingSource: Dispatch<SetStateAction<boolean>>;
  loadingSource: boolean;
}

export interface Source {
  id: string;
  sourceData: Position[];
}
export interface LayerProps {
  id: string;
  source: string;
  color: string;
  map: Map | undefined;
  loadingSource: boolean;
  hover?: boolean;
}
export interface MarkerProps {
  map?: Map;
  marker?: Marker | null;
  lngLat: LngLatLike;
  onDragEnd?: (e: any) => void;
  coords: Position[];
}
export interface SidebarProps {
  selectedRivers: Feature[];
  setSelectedRivers: Dispatch<
    SetStateAction<Feature<LineString, GeoJsonProperties>[]>
  >;
  newRoadCoords: Position[];
  setNewRoadCoords: Dispatch<SetStateAction<Position[]>>;
  roads: Road[];
  setRoads: Dispatch<SetStateAction<Road[]>>;
  setRoadsLoading: Dispatch<SetStateAction<boolean>>;
  map: Map;
  setMap: Dispatch<SetStateAction<Map | undefined>>;
  roadId: number | undefined;
  setRoadId: Dispatch<SetStateAction<number | undefined>>;
  setStartEdit: Dispatch<SetStateAction<boolean>>;
  startEdit: boolean;
}
export interface MapProps {
  selectedRivers: Feature<LineString, GeoJsonProperties>[];
  newRoadCoords: Position[];
  setNewRoadCoords: Dispatch<SetStateAction<Position[]>>;
  roads: Road[];
  setRoads: Dispatch<SetStateAction<Road[]>>;
  map: Map | undefined;
  setMap: Dispatch<SetStateAction<Map | undefined>>;
  roadId: number | undefined;
}
export interface Road {
  id: number;
  name: string;
  roadCoordinates: string;
  selectedRivers: string;
  properties: string;
}

export interface RoadFormInterface {
  map: Map;
  road?: Road;
  roads: Road[];
  setRoads: Dispatch<SetStateAction<Road[]>>;
  newRoadCoords: Position[];
  setNewRoadCoords: Dispatch<SetStateAction<Position[]>>;
  selectedRivers: Feature<LineString, GeoJsonProperties>[];
  setSelectedRivers: Dispatch<
    SetStateAction<Feature<LineString, GeoJsonProperties>[]>
  >;
  roadId: number | undefined;
  startEdit: boolean;
  setStartEdit: Dispatch<SetStateAction<boolean>>;
}

export interface RoadInformationsInterface {
  map: Map;
  roads: Road[];
  road: Road;
  setSelectedRivers: Dispatch<
    SetStateAction<Feature<LineString, GeoJsonProperties>[]>
  >;
  setNewRoadCoords: Dispatch<SetStateAction<Position[]>>;
  setStartEdit: Dispatch<SetStateAction<boolean>>;
}

export interface RoadFormData {
  name: string;
  description: string;
  color: string;
}
export interface SelectedRiversFormData {
  riverName: string;
}
export interface SelectedRiversFormInterface {
  selectedRivers: Feature<LineString, GeoJsonProperties>[];
  setSelectedRivers: Dispatch<Feature<LineString, GeoJsonProperties>[]>;
}
