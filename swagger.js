const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json' // Nome do arquivo de saída
const endpointsFiles = ['./config/funcroutes.js','./config/prodroutes.js', './config/transroutes.js' ] // Rotas para implementação do swagger

swaggerAutogen(outputFile, endpointsFiles)


