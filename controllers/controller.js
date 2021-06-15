const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");

// get latest news from CDC
exports.getNews = async (req, res) => {
  const url = "https://www.cdc.gov.tw/Bulletin/List/MmgtpeidAR5Ooai4-fgHzQ";
  axios(url)
    .then((result) => {
      const response = {
        status: "success",
        data: {},
      };
      const domain = "https://www.cdc.gov.tw";
      const html = result.data;
      const $ = cheerio.load(html);
      const boxes = $(".content-boxes-v3").find("div > a");
      boxes.each((index, element) => {
        const title = $(element).attr("title");
        const link = domain + $(element).attr("href");
        response.data[title] = link;
      });
      res.json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        error: err,
      };
      res.json(response);
    });
};

// get the number of infected people in Taiwan
exports.getInfected = (req, res) => {
  const url = "https://covid19dashboard.cdc.gov.tw/dash3";
  axios(url)
    .then((result) => {
      const response = {
        status: "success",
        data: {},
      };
      response.data = result.data[0];
      res.json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        error: err,
      };
      console.error(err);
      res.json(response);
    });
};

// get the number of infected people in Taiwan cities
exports.getCityInfected = (req, res) => {
  const url = "https://covid-19.nchc.org.tw/dt_005-covidTable_taiwan.php";
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios({
    method: "get",
    url: url,
    httpsAgent: agent,
  })
    .then((result) => {
      const response = {
        status: "success",
        data: {},
      };
      const html = result.data;
      const $ = cheerio.load(html);
      const boxes = $("div.col-lg-12.main").find(
        "div > a.btn.btn-success.btn-lg > span"
      );
      boxes.each((index, element) => {
        const [city, cases] = $(element).contents().first().text().split(" ");
        response.data[city] = cases;
      });
      res.json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        error: err,
      };
      console.error(response);
      res.json(response);
    });
};
