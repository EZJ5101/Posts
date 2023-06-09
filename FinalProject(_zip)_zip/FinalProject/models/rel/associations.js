'use strict';

module.exports = function(models) {
    models.users.hasMany(models.posts, { foreignKey: "UserId" });
    models.posts.belongsTo(models.users, {
      targetKey: "UserId"
    });
  };