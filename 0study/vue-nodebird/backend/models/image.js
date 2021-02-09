module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    charset: 'utf8', //이모티콘까지 쓸 수 있는 속성
    collate: 'utf8_general_ci', //이모티콘+한글
  })

  Image.associate = (db) => {
    db.Image.belongsTo(db.Post)
  };
  return Image;
}