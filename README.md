# Horus Monitoring

[Sustaingineering at UBC](https://www.sustaingineering.com)

GSM MONITORING PROJECT
UBC Sustaingineering is working in partnership with ENICALSA (Renewable solutions company in Nicaragua) to design and develop a 3G-network monitoring system for solar water pumps. There are currently 30 solar pumps systems installed in Nicaragua's country side whose functionality is currently being monitored by ENICALSA's team in-person.

The team is developing a remote monitoring platform that senses various operating parameters of the solar panels and water pumps such as the temperature, voltage/current, water pressure, and transmits this data through GSM/3G to a central base for its monitoring.

# Developer

The front-end is handled by React, which is backed by Firebase. As our backend, firebase handles the auth, hosting, and storage. 

Check out `scripts/` to preview how to add sensor data to the RDB.

## Usagel

Run `npm install` after cloning the repo.

## Testing and building projects

`npm run start` - start a local development server.

`npm run build` - build an optimized output to `build/`.

`npm run deploy` - deploy to firebase. Make sure you have auth permissions. 

Firebase credentials are unique but non-secret, thus are committed. 

## Firestore Format

```
{
  posts: {
    <unique document name>: {
      text: <html aware text>,
      title: <some title>
    }
  },
  users: {
    <uid> : {
      sensors: {
        <human readable name>: <sensor-id>,
        <human readable name>: <sensor-id>,
        etc
      }
    }
  }
}
```

## Firebase RDB Format 

```
{
  <random-monotonically-increasing-UID> : {
    timestamp: <data>,
    voltage: <data>,
    ...
  },
}
```