# Horus Monitoring build with React + Electron

[Sustaingineering at UBC](https://www.sustaingineering.com)

GSM MONITORING PROJECT
UBC Sustaingineering is working in partnership with ENICALSA (Renewable solutions company in Nicaragua) to design and develop a 3G-network monitoring system for solar water pumps. There are currently 30 solar pumps systems installed in Nicaragua's country side whose functionality is currently being monitored by ENICALSA's team in-person.

The team is developing a remote monitoring platform that senses various operating parameters of the solar panels and water pumps such as the temperature, voltage/current, water pressure, and transmits this data through GSM/3G to a central base for its monitoring.

## Developer

### Usage

Run `npm install` after cloning the repo.

### Testing and building projects

npm scirpts

```JSON
"scripts": {
    "react-start": "react-scripts start",
    "react-build": "react-scripts build",
    "react-test": "react-scripts test --env=jsdom",
    "react-eject": "react-scripts eject",
    "electron-build": "electron-builder",
    "release": "npm run react-build && electron-builder --publish=always",
    "build": "npm run react-build && npm run electron-build",
    "start"
}
```

> `npm start` Starts react dev server and electron.

> `npm run build` Builds react project on 'build' directory and builds electron packages on 'dist' directory. (Building the react project first is necessary to build the electron packages)

---
