var Buku = require('../models').m_buku,
    Pengarang = require('../models').m_pengarang;

Buku.belongsTo(Pengarang, {
    as: 'list_buku',
    foreignKey: 'pengarang'
})
    
Pengarang.hasMany(Buku, {
    as: 'list_buku',
    foreignKey: 'pengarang'
})

exports.ambil_semua_pengarang = (req, res) => {
    Pengarang.findAll({}).then(datane => {
        if (datane == null || datane == '')
            res.status(401).json({
                "status": false,
                "message": "Data tidak ditemukan"
            })
        else
            var data_pengarang = JSON.parse(JSON.stringify(datane))
            res.send(data_pengarang)
    })
}

exports.ambil_satu_pengarang = (req, res) => {
    Pengarang.findAll({
        attributes: {
            exclude: ['pengarang']
        },
        include: [
            {
                model: Buku,
                as: "list_buku",
                required: true
            }
        ],
        where: {
            id: req.params.idpengarang
        }
    }).then(datane => {
        if (datane == '' || datane == null)
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
    }).catch(err => {
        console.log(err)
    })
}

exports.simpan_pengarang = (req, res) => {
    Pengarang.create({
        nama: req.body.nama,
        alamat: req.body.alamat,
        email: req.body.email
    }).then(() => Pengarang.findOrCreate({
        where: {
            email: req.body.email
        }
    }).spread((pengarang, created) => {
        res.json({
            "status": true,
            "message": "Data Pengarang berhasil dibuat",
            "data": pengarang
        })
    }))
}

exports.update_pengarang = (req, res) => {
    Pengarang.findOne({
        where: {
            id: req.params.idpengarang
        }
    }).then(data => {
        if (data == null)
            res.json({
                "status": false,
                "message": "Data tidak ditemukan"
            })
        else
            data.updateAttributes({
                nama: req.body.nama,
                alamat: req.body.alamat,
                email: req.body.email
            }).then(datane => {
                if (datane == null || datane == '')
                    res.json({
                        "status": false,
                        "message": "Data tidak ditemukan"
                    })
                else
                    res.json({
                        "status": true,
                        "message": "Data Pengarang berhasil di ubah",
                        "data": datane
                    })
            })
    })
}

exports.hapus_pengarang = (req, res) => {
    Pengarang.destroy({
        where: {
            id: req.params.idpengarang
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
                "message": "Data pengarang berhasil di hapus",
            })
    })
}