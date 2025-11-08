import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("scrum_master", "manager", "employee"),
    defaultValue: "employee",
  },
  tech_stack: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default User;
