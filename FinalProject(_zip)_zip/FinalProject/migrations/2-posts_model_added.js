'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "posts", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "posts_model_added",
    "created": "2023-03-13T02:04:49.044Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "posts",
        {
            "PostId": {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "unique": true,
                "allowNull": false,
                "primaryKey": true,
                "autoIncrement": true
            },
            "PostTitle": {
                "type": Sequelize.STRING(255),
                "field": "PostTitle",
                "allowNull": false
            },
            "PostBody": {
                "type": Sequelize.STRING(32),
                "field": "PostBody",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "defaultValue": Sequelize.Literal,
                "allowNull": false
            },
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "defaultValue": Sequelize.Literal,
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
