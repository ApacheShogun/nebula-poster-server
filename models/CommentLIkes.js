module.exports = (sequelize, DataTypes) => {
    const CommentLikes = sequelize.define('CommentLikes', {
        username: {
            type: DataTypes.STRING
        }
    })

    return CommentLikes
}