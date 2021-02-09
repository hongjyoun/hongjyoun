module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT, 
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', //이모티콘까지 쓸 수 있는 속성
    collate: 'utf8mb4_general_ci', //이모티콘+한글
  })

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User)
    db.Comment.belongsTo(db.Post)
  };
  return Comment;
}