module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email:{
      type: DataTypes.STRING(40), // 30자 이내
      allowNull: false, // false: 필수
      unique: true, // 중복 금지
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', //하글 저장돼요
  })

  User.associate = (db) => {
    db.User.hasMany(db.Post)
    db.User.hasMany(db.Comment)
  };
  return User;
}