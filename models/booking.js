//Create Booking Model and export the module

module.exports = (sequelize, DataTypes) => {
    //Create Booking Model
    const Booking = sequelize.define("Booking", {
        // eslint-disable-next-line camelcase
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,50]
            } 
        },
        // eslint-disable-next-line camelcase
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,50]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                len: [1,255]
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [10,10]
            }
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 20,
                max: 100
            }
        },
        // eslint-disable-next-line camelcase
        is_cat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        // eslint-disable-next-line camelcase
        pet_amt: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1,
                max: 5,
                len: 1
            }
        },
        small: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        med: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        large: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        giant: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        // eslint-disable-next-line camelcase
        is_pup: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        // eslint-disable-next-line camelcase
        long_term: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,

        },
        // eslint-disable-next-line camelcase
        short_term: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,255]
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
    //Set up Model/Table association 
    Booking.associate = function(models) {
        Booking.belongsTo(models.Host, {
            foreignKey: {
                name: "host_id",
                allowNull: false,
            },
        });
    };
    //Return Booking Model
    return Booking;
};
