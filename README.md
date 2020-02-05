# Horus Monitoring

[Sustaingineering at UBC](https://www.sustaingineering.com)

GSM MONITORING PROJECT
UBC Sustaingineering is working in partnership with ENICALSA (Renewable solutions company in Nicaragua) to design and develop a 3G-network monitoring system for solar water pumps. There are currently 30 solar pumps systems installed in Nicaragua's country side whose functionality is currently being monitored by ENICALSA's team in-person.

The team is developing a remote monitoring platform that senses various operating parameters of the solar panels and water pumps such as the temperature, voltage/current, water pressure, and transmits this data through GSM/3G to a central base for its monitoring.

# Developer Info

The front-end is built as a React app, which is backed by Firebase. As our backend, firebase handles the auth, hosting, and storage. 

Check out `scripts/` to preview how to add sensor data to the RDB.

## Setup

To set this up with a brand new firebase project, follow these steps.

1. Create a new projcet in the Firebase console. 

2. Under the develop header, do the following:

    a. Under authentication, enable `Email/Password` and `Google` as sign-in methods.

    b. Under database, create a new database and start that in production mode. Choose any location.
    
    c. Under hosting, enable it.

3. Go to the project settings and install a web app (the `</>` symbol), and give it an arbitrary name. This will generate a `firebaseConfig`. Copy that into `firebase.config.js`.

4. Add your `projectId` under `default` in `.firebaserc`. This is for the CLI. 

5. Now, clone this repo and run `npm install`, then `npm deploy`. **Make sure you set up all the previous components (especially the database) before deploying!**

## Scripts

`npm run start` - start a local development server.

`npm run build` - build an optimized output to `build/`.

`npm run push` - deploy to database, firestore, and hosting to firebase. Make sure you have auth permissions. 

`npm run deploy` - concat of build and push.

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
    time-stamp: <data>,
    voltage: <data>,
    ...
  },
}
```