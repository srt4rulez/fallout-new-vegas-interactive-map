# Fallout: New Vegas - Interactive Map

[https://srt4rulez.github.io/fallout-new-vegas-interactive-map](https://srt4rulez.github.io/fallout-new-vegas-interactive-map)

An interactive map of the [Mojave Wasteland](https://fallout.fandom.com/wiki/Mojave_Wasteland) in Fallout: New Vegas. 

## Features

- Contains all [skill books](https://fallout.fandom.com/wiki/Fallout:_New_Vegas_skill_books) and [snow globes](https://fallout.fandom.com/wiki/Snow_globe).
- Mark items as found to keep track of your progress. Your progress is saved in your browser.  
- Each item type is color-coded to easily identify them.
- Toggle the visibility of found items.
- Toggle the visibility of a single item type.
- Every item has a corresponding link to an article on [https://fallout.fandom.com/](https://fallout.fandom.com/) for more info.

## Other Interactive Maps

- [gamemapscout](http://www.gamemapscout.com/falloutnewvegas_interactive.html)

## How does it work?

We use a library called [Leaflet](https://leafletjs.com/) to create an interactive map, similar to Google Maps. 
Instead of a map of the real world, we load up an image of the Mojave Wasteland. This allows us to zoom, pan and interact 
with the map. It also allows us to add "markers" that when clicked, opens popups with custom content.

All the markers are stored in [markers.json](./src/Data/markers.json). Each marker has an ID, type, sub type (optional), 
title, description, url (optional), image (optional) and latitude and longitude values. 

When setting a marker as "found", we update something called [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 
in the browser. This is data that is saved in the browser and can survive refreshes. It's specific to the domain. 
This allows us to save your progress without having to store it in an external database. Your progress is only saved in 
your current browser though. If you visit the application on another browser, you won't see your previous data.

## Debugging Latitude and Longitude

Open the developer tools in your browser (usually F12), go to the console tab, and type in "window.debug = true" and 
press enter to enable debug mode. Clicking on the map will now log the latitude and longitude to the console.

## Development

To work on this repository, install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/), 
then run the following command in the project root:

```
docker-compose up -d
```

This will start up a docker container that has everything we need to develop, and start the development server using [create-react-app](https://github.com/facebook/create-react-app).

Go to http://localhost:3000/ in your browser on your machine to view the site.

Checkout [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app) for more info.
