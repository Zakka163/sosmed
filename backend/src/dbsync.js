const koneksi = require('./config/connection').sq

let normalizedPath = require("path").join(__dirname, "./model");
// let normalizedPath = require("path")
// console.log(normalizedPath);
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    console.log(file);
    require(`./model/${file}`)
    // let normalize = require("path").join(__dirname, "./module/" + file);
    // require("fs").readdirSync(normalize).forEach(function (file2) {
    //     if (file2 == "model.js") {
    //         require(`./module/${file}/model.js`)
    //     }
    // });
});

koneksi.sync({ alter: true}).then(() => {
    console.log('Database Berhasil di Sinkronisasi');
    console.log('disconnecting...');
    process.exit(0);
}).catch(e => {
    console.log(e)
});