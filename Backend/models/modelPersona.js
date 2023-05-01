
import sequelize from '../config/db.js';
import { DataTypes, Sequelize } from 'sequelize';

const Persona = sequelize.define('personas',{
    idPersona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        trim: true
      },
      fotografia: {
        type: DataTypes.STRING(200),
        trim: true,
        allowNull: false
      }
})

export default Persona;