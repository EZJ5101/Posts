'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    PostId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    PostTitle : {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PostBody: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: "UserId"
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
    }
 ) }, {
    tableName: 'posts'
  };

// posts.associate = function(models) {};
