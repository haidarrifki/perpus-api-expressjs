module.exports = (sequelize, DataTypes) => {
    return sequelize.define('m_buku', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        judul: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        pengarang: {
            type: DataTypes.INTEGER(5),
            allowNull: false
        }
    }, {
        // timestamps false karena secara default true, dan akan meminta field createdAt
        timestamps: false,
        tableName: 'buku'
    });
}