var db = require("../db");
var util = require("../util");
// var config = require("../config/constants");
var request_send = require('request');
require('request-debug')(request_send);
var moment = require('moment');
var cheerio = require('cheerio');
var parse = require('url-parse');
var supportedUrls = ["www.amazon.com", "www.amazon.in", "www.flipkart.com"];

function PriceController() {};

PriceController.prototype.postPriceCheck = {
    handler: function(request, reply) {
      console.log("postPriceCheck");

      if (!request.payload.url) 
        return util.reply.error('URL needed', reply);

      var siteUrl = parse(request.payload.url);
      var validUrl = (supportedUrls.indexOf(siteUrl.hostname) > -1);
      if (!validUrl)
        return util.reply.error('URL invalid', reply);
      else {
        console.log(siteUrl.href);

        var options = { method: 'GET',
          url: 'http://www.flipkart.com/',
          headers: 
           { 'postman-token': '565a82d7-8fd2-ac9d-8169-168dbb012e86',
             'cache-control': 'no-cache' } };

        request_send(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
          reply(body)
        });
        // var options = {
        //     uri: 'http://www.flipkart.com/',
        //     headers: {
        //        'Host': 'www.flipkart.com',
        //     'Cache-Control': 'no-cache'
        //     }
        //     // url: 'http://www.amazon.com/',
        //     // headers: {
        //     //    'Host': 'www.amazon.com'
        //     // }
        // }
        // request_send.get(options, function(error, response, body) {
        //   if(error) {
        //     console.log("Error: " + error);
        //   }
        //   // Check status code (200 is HTTP OK)
        //   console.log("Status code: " + response.statusCode);
        //   if (response.statusCode != 200) {
        //     console.log("hi")
        //     return reply(body)
        //   }
        //   return reply(body);

        //   var $ = cheerio.load(body);

        //   switch (siteUrl.hostname) {
        //     case supportedUrls[0]:
        //       amazonComParse($, reply);
        //       break;
        //     case supportedUrls[1]:
        //       amazonInParse($, reply);
        //       break;
        //     case supportedUrls[2]:
        //       flipkartParse($, reply);
        //       break;
        //     default:
        //       return util.reply.error('URL invalid', reply);
        //   }

        // });
      }
      
    }
};


function amazonInParse(body, reply) {
  // console.log("Title:  " + body('#productTitle').text());
  // console.log("price:  " + body('#priceblock_ourprice').text());
  reply(body('#productTitle').text() + "\n" + body('#priceblock_ourprice').text());
}

function amazonComParse(body, reply) {
  // console.log("Title:  " + body('#productTitle').text());
  // console.log("price:  " + body('#priceblock_ourprice').text());
  reply(body('#productTitle').text() + "\n" + body('#priceblock_ourprice').text());
}

function flipkartParse(body, reply) {
  // console.log("Title:  " + body('#productTitle').text());
  // console.log("price:  " + body('#priceblock_ourprice').text());
  reply(body);
}

module.exports = new PriceController();