
module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define('Likes', {
        username: {
            type: DataTypes.STRING
        }
    })


    return Likes
}