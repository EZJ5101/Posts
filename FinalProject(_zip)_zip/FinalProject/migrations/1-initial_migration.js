'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2023-03-13T01:42:02.712Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "users",
        {
            "Username": {
                "type": Sequelize.STRING(16),
                "field": "Username",
                "unique": true,
                "allowNull": true
            },
            "Email": {
                "type": Sequelize.STRING(255),
                "field": "Email",
                "unique": true,
                "allowNull": true
            },
            "Password": {
                "type": Sequelize.STRING(32),
                "field": "Password",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "defaultValue": Sequelize.Literal,
                "allowNull": false
            },
            "FirstName": {
                "type": Sequelize.STRING(45),
                "field": "FirstName",
                "allowNull": true
            },
            "LastName": {
                "type": Sequelize.STRING(45),
                "field": "LastName",
                "allowNull": true
            },
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "primaryKey": true,
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "defaultValue": Sequelize.Literal,
                "allowNull": false
            },
            "Admin": {
                "type": Sequelize.INTEGER,
                "field": "Admin",
                "defaultValue": "0",
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
