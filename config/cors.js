const allowlist = [
  'http://www.google.com', 
  'http://localhost:3500/',
  'http://localhost:3000',
  'https://test.yenepay.com/'
];

const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true, credentials: true, optionsSuccessStatus: 200 }; // reflect (enable) the requested origin in the CORS response
  } else {
      corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = corsOptionsDelegate;
