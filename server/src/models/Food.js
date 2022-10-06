module.exports = ( sequelize, DataTypes ) => {
    const Food = sequelize.define('Product', {
        name: DataTypes.STRING,
        price: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        category: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Product
}