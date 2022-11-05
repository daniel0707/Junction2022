const express = require("express");
const app = express();
const cors = require("cors");
const { Pool, Client } = require("pg");
const fs = require("fs");
const axios = require("axios");
const parse = require("pg-connection-string").parse;
require("dotenv").config();
const port = process.env.PORT || 3000;
const postgresqlUri = process.env.CONNECT_STR || "";
const api_key = process.env.WOLT_TOKEN || "";
const MERCHANT_ID = process.env.MERCHANT_ID || "";
const GMAP_TOKEN = process.env.GMAP_TOKEN;

if (!GMAP_TOKEN){
  throw "No google map token"
}

if (postgresqlUri == "") {
  throw "You forgot to add postgresqlUri for database!";
}
if (api_key == "") {
  throw "You forgot to add WOLT api key";
}
const conn = new URL(postgresqlUri);
conn.search = "";
let config = parse(postgresqlUri);
config.ssl = {
  ...config.ssl,
  rejectUnauthorized: true,
  ca: fs.readFileSync("./ca.pem").toString(),
};
const pool = new Pool(config);

app.use(cors());
app.use(express.json());

app.get("/categories", (req, res, next) => {
  pool.connect();
  pool.query("SELECT * FROM material", [], (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.send({
        categories: result.rows,
      });
    }
  });
});

app.post("/order/find", (req, res, next) => {
  const material_ids = req.body.materials;
  const coord = req.body.location.coordinates;
  const address = req.body.location;
  const querystring = `SELECT r.id, r.address, r.spot_name, r.municipality, r.postal_code, ST_DISTANCE(r.coordinates,'SRID=4326;POINT(${
    coord.lng
  } ${coord.lat})'::geography) as distance
  FROM recyclepoint as r
  WHERE r.id in (
   SELECT fk_recyclepoint FROM recyclepoint_material as rm
   WHERE ARRAY[${material_ids.toString()}]::numeric[] <@ ( SELECT ARRAY_AGG(rm.fk_material) FROM recyclepoint_material as rm)
 )
 ORDER BY distance ASC LIMIT 5
 `;
  pool.connect();
  pool.query(querystring, [], (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      find_price(result.rows, address).then(
        (price_resp) => {
          res.send({
            result: price_resp,
          });
        },
        (price_rej) => {
          console.log(price_rej);
        }
      );
    }
  });
});

const find_price = async (rows, address) => {
  const fee_url = `https://daas-public-api.development.dev.woltapi.com/merchants/${MERCHANT_ID}/delivery-fee`;
  let res_arr = [];
  let req_config = {
    headers: {
      Authorization: `Bearer ${api_key}`,
    },
  };
  for (let row of rows) {
    let req_body = {
      pickup: {
        location: {
          formatted_address: `${address.street}, ${address.postal_code} ${address.city}`,
        },
      },
      dropoff: {
        location: {
          formatted_address: `${row.address}, ${row.postal_code} ${row.municipality}`,
        },
      },
    };
    try {
      req_resp = await axios.post(fee_url, req_body, req_config);
      let tmp_row = row;
      row.fee = req_resp.data.fee;
      row.estimate_minutes = req_resp.data.time_estimate_minutes;
      res_arr.push(tmp_row);
    } catch (err) {
      console.log(err);
    }
  }
  return res_arr;
};

app.post("/order/submit", (req, res, next) => {
  const pickup_location = req.body.pickup
  const pickup = {location:pickup_location,
  contact_details:{
    "name": "John Wolt",
    "phone_number":"+358456456456",
    "send_tracking_link_sms": false
  }}
  const dropoff = {
    "location": {
      "formatted_address": req.body.dropoff
    },
    "contact_details": {
      "name": "John Wolt's wife",
      "phone_number": "+358123456789",
      "send_tracking_link_sms": false
    },
    "comment": "Leave at the door, please"
  }
});


const baseGmapUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
const  geocodeRequestConstuctor = (address) => {
  return `${baseGmapUrl}address=${encodeURI(address)}&key=${GMAP_TOKEN}`
}

const reverseGeocodeRequestConstructor = (coord) => {
  return `${baseGmapUrl}address=${coord.lat},${coord.lng}&key=${GMAP_TOKEN}`
}

app.post("/gmapproxy/geocode", (req, res, next) => {
  const address = req.body.address;
  axios.get(geocodeRequestConstuctor(address)).then((gres)=>{
    console.log('Geocode response', gres.data.results[0].geometry.location);
    const lnglat = gres?.data?.results[0]?.geometry?.location
    res.send({coord: lnglat});
  }, (err)=>{
    console.log('Geocodee error', err);
  })
})

app.post("/gmapproxy/reversegeocode", (req, res, next) => {
  console.log('Body', req.body)
  const coord = req.body.coord;
  console.log('Coords', coord);
  axios.get(reverseGeocodeRequestConstructor(coord)).then((gres) =>{
    console.log('Reverse geolocation ', gres.data);
    const address = gres?.data?.results?.[0]?.formatted_address
    res.send({address: address, fullData: gres?.data?.results?.[0]?.address_components});
  }, (err) => {
    console.log('Reverse geolocation error ', err);
  })
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
