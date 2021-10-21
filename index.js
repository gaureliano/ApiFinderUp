const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const prodroutes = require('./config/prodroutes')
const funcroutes = require('./config/funcroutes')
const transroutes = require('./config/transroutes')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended : false}))
app.use(express.json())
app.use(prodroutes , funcroutes, transroutes)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(13464, () => {
    console.log('Express started at http://localhost:13464')
})