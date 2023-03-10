require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

let sequelize = process.env.NODE_ENV === 'production'
  ? new Sequelize({
      database: DB_NAME,
      dialect: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      pool: {
        max: 3,
        min: 1,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      keepAlive: true,
  },
  ssl: true,
}) 
: new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/appmensajes`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const modelDefiners = [];

/*let models = "src/models"

let modelsPath = "";

fs.readdirSync("src").map( e => {
  if(e === "models"){
    modelsPath = path.resolve("src",e)
  }
})

fs.readdirSync(models)
.filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
.forEach((file) => {
  modelDefiners.push(path.join(modelsPath, file));
});*/

modelDefiners.push(require('../models/Category.js'))
modelDefiners.push(require('../models/Email.js'))
modelDefiners.push(require('../models/User.js'))

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Category , Email , User} = sequelize.models;

// Aca vendrian las relaciones

User.hasMany(Email);
Email.belongsTo(User);

Email.belongsTo(Category);
Category.hasMany(Email);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
