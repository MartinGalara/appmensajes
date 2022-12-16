const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Email', {
        title: {
            type: DataTypes.STRING,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sendTo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date:{
            type: DataTypes.DATE,
        }

    },
        {
            timestamps: false,
        }
    )
}
