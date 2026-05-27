const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Video Games API',
    description: 'API para gestión de videojuegos',
  },
  host: 'localhost:8080', 
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles);