var BASE_URL = '/price';
var PriceController = require('../controller/price');

module.exports = function() {
  return [
    {
      method: 'POST',
      path: BASE_URL,
      config: PriceController.postPriceCheck
    }
  ];
}();