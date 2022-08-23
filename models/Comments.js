module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        commentText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commentImg: {
            type: DataTypes.STRING,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    
    Comments.associate = (models) => {

        Comments.hasMany(models.CommentLikes, {
            onDelete: 'cascade',
        })
    }

    return Comments
}