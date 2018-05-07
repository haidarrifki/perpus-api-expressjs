var Buku = require('../models').m_buku,
    Pengarang = require('../models').m_pengarang;

Buku.belongsTo(Pengarang, {
    as: 'penulis',
    foreignKey: 'pengarang'
})

Pengarang.hasMany(Buku, {
    as: 'penulis',
    foreignKey: 'pengarang'
})

exports.ambil_semua_buku = (req, res) => {
    Buku.findAll({
        attributes: {
            exclude: ['pengarang']
        },
        include: [
            {
                model: Pengarang,
                as: "penulis",
                required: true,
                attributes: {
                    exclude: ['id']
                },
            }
        ]
    }).then(datane => {
        if (datane == null)
            res.status(401).json({
                "status": false,
                "message": "Data tidak ditemukan"
            })
        
        res.json({
          "status": true,
          "message": "Request sukses",
          "data": datane
        })
    })
}

exports.ambil_satu_buku = (req, res) => {
    Buku.findOne({
        attributes: {
            exclude: ['pengarang']
        },
        include: [
            {
                model: Pengarang,
                as: "penulis",
                required: true,
                attributes: {
                    exclude: ['id']
                }
            }
        ],
        where: {
            id: req.params.idbuku
        }
    }).then(datane => {
        if (datane == null)
            res.status(401).json({
                "status": false,
                "message": "Data tidak ditemukan"
            })
        else
            res.json({
                "status": true,
                "message": "Request sukses",
                "data": datane
            })
    })
}

exports.simpan_buku = (req, res) => {
    Buku.create({
        judul: req.body.judul,
        pengarang: req.body.pengarang
    }).then(datane => {
        if (datane == null || datane == '')
            res.json({
                "status": false,
                "message": "Data tidak ditemukan"
            })
        else
            res.json({
                "status": true,
                "message": "Data Buku berhasil di simpan",
                "data": datane
            })
    })
}

exports.update_buku = (req, res) => {
    Buku.findOne({
        where: {
            id: req.params.idbuku
        }
    }).then(data => {
        if (data == null)
            res.json({
                "status": false,
                "message": "Data tidak ditemukan"
            })
        else
            data.updateAttributes({
                judul: req.body.judul,
                pengarang: req.body.pengarang
            }).then(datane => {
                if (datane == null || datane == '')
                    res.json({
                        "status": false,
                        "message": "Data tidak ditemukan"
                    })
                else
                    res.json({
                        "status": true,
                        "message": "Data buku berhasil di ubah",
                        "data": datane
                    })
            })
    })
}

exports.hapus_buku = (req, res) => {
    Buku.destroy({
        where: {
            id: req.params.idbuku
        }
    }).then(datane => {
        if (datane == null || datane == '')
            res.json({
                "status": false,
                "message": "Data tidak ditemukan"
            })
        else
            res.json({
                "status": true,
                "message": "Data buku berhasil di hapus",
            })
    })
}

