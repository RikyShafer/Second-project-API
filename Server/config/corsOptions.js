// const allowedOrigins = [
//     'http://localhost:3000',
//     'http://localhost:3001',
//     'http://localhost:3002',
//     'http://localhost:5500',
//     'http://localhost:2134',
    
    
//   ];
//   const corsOptions = {
    
//     origin: (origin, callback) => {
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed origin'));
//       }
//     },
//     credentials: true,
//     "Access-Control-Allow-Credentials": true,
//     optionsSuccessStatus: 200,
    
//   };
  
//   module.exports = corsOptions;
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",

];

const corsOptions = {
  origin:  (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) { 
          callback(null, true);
      } else {
          callback(new Error("Not allowed by CORS"));
      }
  },
};

module.exports = corsOptions;
  