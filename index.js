require('dotenv').config();
const ConvexHullGrahamScan = require('./graham_scan.min');
const { each, map } = require('lodash');
const axios = require('axios');
const URL = process.env.APP_URL + '/api/convex-hull';

axios.get(URL).then(({ data: areas }) => {
  const data = map(areas, (point, name) => {
    const convexHull = new ConvexHullGrahamScan();
    each(point, ({ lat: y, lng: x }) => {
      convexHull.addPoint(x, y);
    });
    return {
      name,
      area: convexHull.getHull(),
    };
  });
  axios.post(URL, { data });
});
