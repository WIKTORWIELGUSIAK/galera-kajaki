Galera is a website dedicated to a group of enthusiastic kayakers who always complained that there were no maps available for the rivers they wanted to kayak. This challenge inspired me to create an interactive map with the ability to create kayaking routes. The first step in creating this website was to obtain data about the rivers in Poland, which I obtained from Gov.pl, however the data was in the unsatisfactory SHP format.

I prepared the back-end to handle the database using the ORM Prisma and Express.js to create a REST API, with basic methods of post, get, put, and delete. The front-end of the website is powered by Mapbox and utilizes the Mapbox GL JavaScript library to display the map and the "geojson-path-finder" library to find the closest coordinates on the selected rivers to the user-created route. The user interface is built using React and its components are managed with state management. The Map component implements several React hooks to handle the updates of the selected rivers and the new route, and it is the main driving force behind the application's functionality.

GeoJSON-Path-Finder is a JavaScript library for finding the shortest path between two points on a map using the A* algorithm. It is designed to be used in combination with any web-mapping library (such as Leaflet or OpenLayers) that accepts GeoJSON as a source of data. The library takes two GeoJSON points as input and returns a GeoJSON LineString as output, representing the shortest path between the two points.

I decided to select this library because it provides a convenient and efficient way to find the shortest path on a map using GeoJSON data. The use of the A* algorithm ensures that the path is both accurate and optimized, making it a great choice for any project that involves mapping and navigation. Additionally, its compatibility with various web-mapping libraries makes it easy to integrate into a variety of projects.
