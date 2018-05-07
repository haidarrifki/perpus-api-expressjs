var buku = require('../controllers/buku'),
    pengarang = require('../controllers/pengarang');

module.exports = (app) => {
    app.route('/')
        .get((req, res) => {
            res.json({'message':'Hello, World!'})
        })

    app.route('/buku')
        .get(buku.ambil_semua_buku)
        .post(buku.simpan_buku);

    app.route('/buku/:idbuku')
        .get(buku.ambil_satu_buku)
        .put(buku.update_buku)
        .delete(buku.hapus_buku)

    app.route('/pengarang')
        .get(pengarang.ambil_semua_pengarang)
        .post(pengarang.simpan_pengarang);

    app.route('/pengarang/:idpengarang')
        .get(pengarang.ambil_satu_pengarang)
        .put(pengarang.update_pengarang)
        .delete(pengarang.hapus_pengarang)
    
    app.route('/listbuku/pengarang/:idpengarang')
        .get(pengarang.list_buku_pengarang)
}
