module.exports = (sequelize, DataTypes) => {
    return sequelize.define('m_pengarang', {
        id: {
            type: DataTypes.INTEGER(5),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nama: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        alamat: {
            type: DataTypes.STRING(60),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true
        }
    }, {
        // timestamps false karena secara default true, dan akan meminta field createdAt
        timestamps: false,
        tableName: 'pengarang'
    });
}