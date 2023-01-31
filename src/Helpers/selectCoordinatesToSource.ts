/** @format */

import { Feature, GeoJsonProperties, Geometry, Position } from "geojson";

export const selectCoordinatesToSource = (
  rivers: Feature<Geometry, GeoJsonProperties>[]
) => {
  const coordinates: Position[] = [];
  rivers.map((selectedRiver: Feature) => {
    if (selectedRiver.geometry.type === "LineString") {
      selectedRiver.geometry.coordinates.map((coordinate: Position) => {
        coordinates.push(coordinate);
      });
    }
  });
  return coordinates;
};

// Function to remove
// useEffect(() => {
//   if (!skip) {
//     if (riversData.features.length > 0) {
//       console.log(riversData);
//       console.log(featureIndex);
//       // const config = {
//       //   method: "get",
//       //   headers: {
//       //     accept: "application/json; charset=utf-8",
//       //     "Content-Type": "application/json; charset=utf-8",
//       //   },
//       //   // data: {
//       //   //   name: riversData.features[featureIndex].properties.RWB_NAME,
//       //   //   coordinates: riversData.features[featureIndex].geometry.coordinates,
//       //   //   properties: {
//       //   //     type: "LineString",
//       //   //   },
//       //   // },
//       // };

//       const interval = setInterval(async () => {
//         const config = {
//           method: "post",
//           url: "http://127.0.0.1:3001/",
//           headers: {
//             accept: "application/json; charset=utf-8",
//             "Content-Type": "application/json; charset=utf-8",
//           },
//           data: {
//             name: JSON.stringify(
//               riversData.features[featureIndex].properties.RWB_NAME
//             ),
//             coordinates: JSON.stringify(
//               riversData.features[featureIndex].geometry.coordinates
//             ),
//             properties: JSON.stringify({
//               type: "LineString",
//             }),
//           },
//         };
//         axios(config)
//           .then(function (response) {
//             console.log(JSON.stringify(response.data));
//           })
//           .catch(function (error) {
//             console.log(error);
//           });

//         featureIndex++;
//         counter++;
//         if (counter === riversData.features.length) {
//           clearInterval(interval);
//         }
//       }, 100);
//     }
//   }
// }, [riversData]);

// useEffect(() => {
//   if (!skip) {
//     if (riversData.features.length > 0) {

// }, [riversData]);
// axios
//   .post("http://127.0.0.1:3001/", data, config)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// const config = {
//   method: "post",
//   url: "http://127.0.0.1:3001/",
//   headers: {
//     accept: "application/json; charset=utf-8",
//     "Content-Type": "application/json; charset=utf-8",
//   },
//   data: data,
// };
// axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// const config = {
//   method: "get",
//   headers: {
//     accept: "application/json; charset=utf-8",
//     "Content-Type": "application/json; charset=utf-8",
//   },
// };
// useEffect(() => {
//   if (!skip) {
//     // var requestOptions = {
//     //   method: "GET",
//     //   redirect: "follow",
//     // };

//     axios(config)
//       .then(function (response) {
//         console.log(JSON.stringify(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
//   setSkip(false);
// }, [skip]);
// console.log(riversData.features.length);
