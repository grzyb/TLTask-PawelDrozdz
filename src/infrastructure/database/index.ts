import { Sequelize } from 'sequelize';
const config = require('./config')[process.env.NODE_ENV || 'local'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export { sequelize };
