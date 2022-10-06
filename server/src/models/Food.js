module.exports = ( sequelize, DataTypes ) => {
    const Food = sequelize.define('Food', {
        name: DataTypes.STRING,
        price: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        category: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Food
}