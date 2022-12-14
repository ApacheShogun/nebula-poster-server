module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    }),
      Users.hasMany(models.Comments, {
        onDelete: "cascade",
      });

    Users.hasMany(models.CommentLikes, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Followers, {
      onDelete: "cascade",
    });
  };

  return Users;
};
