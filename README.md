# Welcome on Galera  <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px">

Galera is a website dedicated to a group of enthusiastic kayakers who always complained that there were no maps available for the rivers they wanted to kayak. This challenge inspired me to create an interactive map with the ability to create kayaking routes. The first step in creating this website was to obtain data about the rivers in Poland, which I obtained from Gov.pl, however the data was in the unsatisfactory SHP format.

I prepared the back-end to handle the database using the ORM Prisma and Express.js to create a REST API, with basic methods of post, get, put, and delete. The front-end of the website is powered by Mapbox and utilizes the Mapbox GL JavaScript library to display the map and the "geojson-path-finder" library to find the closest coordinates on the selected rivers to the user-created route. The user interface is built using React and its components are managed with state management. The Map component implements several React hooks to handle the updates of the selected rivers and the new route, and it is the main driving force behind the application's functionality.

GeoJSON-Path-Finder is a JavaScript library for finding the shortest path between two points on a map using the A* algorithm. It is designed to be used in combination with any web-mapping library (such as Leaflet or OpenLayers) that accepts GeoJSON as a source of data. The library takes two GeoJSON points as input and returns a GeoJSON LineString as output, representing the shortest path between the two points.

I decided to select this library because it provides a convenient and efficient way to find the shortest path on a map using GeoJSON data. The use of the A* algorithm ensures that the path is both accurate and optimized, making it a great choice for any project that involves mapping and navigation. Additionally, its compatibility with various web-mapping libraries makes it easy to integrate into a variety of projects.

## Languages technologies and main libraries I used in this project:

### Frontend

<img align="left" alt="React" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" /> React

<img align="left" alt="CSS3" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" /> CSS Modules

<img align="left" alt="TypeScript" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" /> TypeScript

### Backend

<img align="left" alt="Prisma" width="26px" src="https://api.iconify.design/simple-icons/prisma.svg?color=white&height=26" /> Prisma

<img align="left" alt="Express" width="26px" src="https://api.iconify.design/simple-icons/express.svg?color=green&height=26" /> Express

### Version Control

<img align="left" alt="Git" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" /> Git

<img align="left" alt="GitHub" width="26px" src="https://api.iconify.design/simple-icons/github.svg?color=white&height=26" /> GitHub

### Main Libraries

<img align="left" alt="Mapbox-GL" src="https://api.iconify.design/simple-icons/mapbox.svg?color=white&height=26"/> Mapbox-GL

<img align="left" alt="Axios" width="26px" src="https://api.iconify.design/simple-icons/axios.svg?color=purple&height=26" /> Axios

