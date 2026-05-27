const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: { title: 'Video Games API', description: 'API' },
  host: 'cse341-webservices-jp5b.onrender.com', 
  schemes: ['https'], 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles);