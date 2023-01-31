/** @format */

// /** @format */

// import axios from "axios";
// import { Feature, Position } from "geojson";
// import { useEffect, useState } from "react";
// import { GeoJsonObject } from "../interfaces";
// // import CustomMap from "./Map/Map";

// function removeDuplicateStartingCoords(feature: Feature) {
//   if (feature.geometry.type === "MultiLineString") {
//     let newCoordinates: number[][][] = [];
//     let startingCoords: { [key: string]: number } = {};
//     // Iterate through each set of coordinates of the MultiLineString
//     for (let i = 0; i < feature.geometry.coordinates.length; i++) {
//       let currentStartingCoords = JSON.stringify(
//         feature.geometry.coordinates[i][0]
//       );
//       if (!startingCoords[currentStartingCoords]) {
//         startingCoords[currentStartingCoords] = 1;
//         newCoordinates.push(feature.geometry.coordinates[i]);
//       } else {
//         startingCoords[currentStartingCoords]++;
//       }
//     }

//     feature.geometry.coordinates = newCoordinates;
//   }
//   return feature;
// }
// function sortMultiLineString(feature: Feature) {
//   if (feature.geometry.type === "MultiLineString") {
//     let sortedCoordinates: Position[] = feature.geometry.coordinates[0];

//     for (let i = 1; i < feature.geometry.coordinates.length; i++) {
//       for (let j = 1; j < feature.geometry.coordinates.length; j++) {
//         if (
//           JSON.stringify(feature.geometry.coordinates[j][0]) ==
//           JSON.stringify(sortedCoordinates[sortedCoordinates.length - 1])
//         ) {
//           feature.geometry.coordinates[j].map((coord: Position) => {
//             sortedCoordinates.push(coord);
//           });
//           feature.geometry.coordinates.splice(j, 1);
//           break;
//         }
//       }
//     }
//     feature = removeDuplicateStartingCoords(feature);
//   }
//   return feature;
// }

// function convertMultiLineStringToLineString(feature: Feature): Feature {
//   if (feature.geometry.type === "MultiLineString") {
//     const lineStringCoordinates: number[][] = [];
//     feature.geometry.coordinates.forEach((coordinates: number[][]) => {
//       lineStringCoordinates.push(...coordinates);
//     });
//     return {
//       ...feature,
//       geometry: {
//         type: "LineString",
//         coordinates: lineStringCoordinates,
//       },
//     };
//   }
//   return feature;
// }

// function convertAllMultiLineStringsToLineStrings(geoJsonObject: GeoJsonObject) {
//   if (geoJsonObject.type === "FeatureCollection") {
//     geoJsonObject.features = geoJsonObject.features.map((feature: Feature) => {
//       feature = removeDuplicateStartingCoords(feature);
//       if (feature.geometry.type !== "MultiLineString") {
//         return feature;
//       }
//       sortMultiLineString(feature);
//       feature = convertMultiLineStringToLineString(feature);
//       return feature;
//     });
//   }
//   return geoJsonObject;
// }
// const MapPage = () => {
//   const [riversData, setRiversData] = useState<any>({
//     type: "FeatureCollection",
//     features: [],
//   });
//   const [skip, setSkip] = useState(true);
//   // useEffect(() => {
//   //   if (!skip) {
//   //     axios
//   //       .get("polishRivers.geojson")
//   //       .then((res) => {
//   //         const data = convertAllMultiLineStringsToLineStrings(
//   //           JSON.parse(JSON.stringify(res.data))
//   //         );
//   //         setRiversData(data);
//   //       })
//   //       .catch((err) => console.log(err));
//   //   }
//   //   setSkip(false);
//   // }, [skip]);
//   // fetch("http://localhost:3001")
//   //   .then((response) => response.json())
//   //   .then((data) => console.log(data));
//   // const config = {
//   //   method: "get",
//   //   url: "http://127.0.0.1:3001/",
//   //   headers: {
//   //     accept: "application/json; charset=utf-8",
//   //     "Content-Type": "application/json; charset=utf-8",
//   //   },
//   //   data: {},
//   // };

//   // useEffect(() => {
//   //   if (!skip) {
//   //     axios(config)
//   //       .then(function (response) {
//   //         console.log(JSON.stringify(response.data));
//   //       })
//   //       .catch(function (error) {
//   //         console.log(error);
//   //       });
//   //   }
//   //   setSkip(false);
//   // }, [skip]);

//   let featureIndex = 0;
//   let counter = 0;
//   const [dataToSend, setDataToSend] = useState<any>();
//   useEffect(() => {
//     if (!skip) {
//       axios
//         .get("newPL.geojson")
//         .then((res) => {
//           const data = JSON.parse(JSON.stringify(res.data));
//           const testArray: any = [];
//           // setRiversData(data);
//           const rivers: any = [];
//           console.log(data.features[0]);
//           data.features.map((feature: any) => {
//             if (feature.geometry.type === "MultiLineString") {
//               feature.geometry.coordinates.map(
//                 (coordinates: any, index: any) => {
//                   const tempFeature = {
//                     type: "Feature",
//                     geometry: { type: "LineString", coordinates: coordinates },
//                     properties: {
//                       RWB_NAME: `${feature.properties.RWB_NAME} ${index}`,
//                     },
//                   };
//                   rivers.push(tempFeature);
//                 }
//               );

//               // feature.geometry.features.map(())
//             } else {
//               rivers.push(feature);
//             }
//           });
//           // data.features.map((a: any) => {
//           //   console.log(a.properties.RWB_NAME);
//           // });
//           console.log(rivers);
//           // const test = data.features.filter((feature: any) =>
//           //   feature.properties.RWB_NAME.includes("Ropa")
//           // );

//           // test[0].geometry.coordinates.map((t6: any) => {
//           //   setSelectedRivers([
//           //     ...selectedRivers,
//           //     {
//           //       type: "Feature",
//           //       geometry: { type: "LineString", coordinates: t6 },
//           //       properties: { RWB_NAME: "" },
//           //     },
//           //   ]);
//           // });
//           // test[0].geometry.coordinates.map((t: any) => {
//           //   testArray.push({
//           //     type: "Feature",
//           //     geometry: { type: "LineString", coordinates: t },
//           //     properties: { RWB_NAME: "" },
//           //   });
//           //   // setSelectedRivers([
//           //   //   ...selectedRivers,
//           //   //   {
//           //   //     type: "Feature",
//           //   //     geometry: { type: "LineString", coordinates: t },
//           //   //     properties: { RWB_NAME: "" },
//           //   //   },
//           //   // ]);
//           // });
//           setRiversData({
//             type: "FeatureCollection",
//             features: rivers,
//           });
//           // setSelectedRivers(testArray);
//           // setSelectedRivers([
//           //   {
//           //     type: "Feature",
//           //     geometry: {
//           //       type: "LineString",
//           //       coordinates: test[0].geometry.coordinates[0],
//           //     },
//           //     properties: { RWB_NAME: "" },
//           //   },
//           // ]);
//           // setSelectedRivers([
//           //   {
//           //     type: "Feature",
//           //     geometry: { type: "LineString", coordinates: test3 },
//           //     properties: { RWB_NAME: "" },
//           //   },
//           // ]);
//         })
//         .catch((err) => console.log(err));
//     }
//     setSkip(false);
//   }, [skip]);
//   useEffect(() => {
//     if (!skip) {
//       if (riversData.features.length > 0) {
//         const interval = setInterval(async () => {
//           const config = {
//             method: "post",
//             url: "http://localhost:3001/rivers",
//             headers: {
//               accept: "application/json; charset=utf-8",
//               "Content-Type": "application/json; charset=utf-8",
//             },
//             data: {
//               name: JSON.stringify(
//                 riversData.features[featureIndex].properties.RWB_NAME
//               ),
//               coordinates: JSON.stringify(
//                 riversData.features[featureIndex].geometry.coordinates
//               ),
//               properties: JSON.stringify({
//                 type: "LineString",
//               }),
//             },
//           };
//           console.log(featureIndex);
//           console.log(riversData.features.length);
//           axios(config)
//             .then(function (response) {
//               console.log(JSON.stringify(response.data));
//             })
//             .catch(function (error) {
//               console.log(error);
//             });
//           featureIndex++;
//           counter++;
//           if (counter === riversData.features.length) {
//             clearInterval(interval);
//           }
//         }, 100);
//       }
//     }
//   }, [riversData]);

//   // axios
//   //   .post("http://127.0.0.1:3001/", data, config)
//   //   .then((response) => {
//   //     console.log(response);
//   //   })
//   //   .catch((error) => {
//   //     console.log(error);
//   //   });
//   // const config = {
//   //   method: "post",
//   //   url: "http://127.0.0.1:3001/",
//   //   headers: {
//   //     accept: "application/json; charset=utf-8",
//   //     "Content-Type": "application/json; charset=utf-8",
//   //   },
//   //   data: data,
//   // };
//   // axios(config)
//   //   .then(function (response) {
//   //     console.log(JSON.stringify(response.data));
//   //   })
//   //   .catch(function (error) {
//   //     console.log(error);
//   //   });

//   return (
//     <>
//       {/* <CustomMap riversData={riversData} setRiversData={setRiversData} /> */}
//       {/* <Map riversData={riversData} /> */}
//       {/* <RiverForm/> */}
//     </>
//   );
// };

// export default MapPage;
