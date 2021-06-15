const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");

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
    console.log(response);
  })
  .catch((err) => {
    const response = {
      status: "error",
      error: err,
    };
    console.error(response);
  });
