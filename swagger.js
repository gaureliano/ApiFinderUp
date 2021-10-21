const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./config/funcroutes.js','./config/prodroutes.js', './config/transroutes.js' ]

swaggerAutogen(outputFile, endpointsFiles)


