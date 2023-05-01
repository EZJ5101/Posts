/* jshint indent: 2 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    Username: {
      type: DataTypes.STRING(16),
      allowNull: true,
      unique: true
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    Password: {
      type: DataTypes.STRING(100000),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    FirstName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    LastName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'users'
  });
};
