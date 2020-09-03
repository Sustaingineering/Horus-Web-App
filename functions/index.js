const functions = require("firebase-functions");
const express = require("express");
const fetch = require("node-fetch");

const app = express();

const URL =
  "https://sustaingineering-horus.firebaseio.com/${PUMP}/${TIMESTAMP}.json";
const PUMP_TEMPLATE = "${PUMP}";
const TIMESTAMP_TEMPLATE = "${TIMESTAMP}";

app.post("/storeSensorData", async (req, res) => {
  const pumpId = req.body["pumpId"];
  const data = req.body["data"].split(",").map((e) => Number(e));

  // TODO: randomly mapped for now
  const power = data[0];
  const surfaceTemp = data[1];
  const opTemp = data[2];
  const current = data[4];
  const waterBreaker = data[5];
  const timestamp = data[6];
  const voltage = data[3];

  const url = URL.replace(PUMP_TEMPLATE, pumpId).replace(
    TIMESTAMP_TEMPLATE,
    timestamp
  );

  // TODO: store directly
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      power: power,
      "surface-temperature": surfaceTemp,
      "op-temp": opTemp,
      current: current,
      "water-breaker": waterBreaker,
      "time-stamp": timestamp,
      voltage: voltage,
    }),
  }).then((e) => e.json());

  res.json({ status: response });
});

exports.widgets = functions.https.onRequest(app);
