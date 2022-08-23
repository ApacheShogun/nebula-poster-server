module.exports = (sequelize, DataTypes) => {
    const Followers = sequelize.define('Followers', {
        username: {
            type: DataTypes.STRING
        },
        FollowerId:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })

    return Followers
}