// Core Module
// File System

const yargs = require("yargs");
const contacts = require("./contacts");

//mengambil argumen dari command line
yargs.command({
        command: 'add',
        describe: 'Menambahkan contact baru',
        builder: {
            nama: {
                describe: 'Nama Lengkap',
                demandOption: true,
                type: 'string',
            },
            email: {
                describe: 'Email',
                demandOption: false,
                type: 'string'
            },
            noHp: {
                describe: 'Nomor Handphone',
                demandOption: true,
                type: 'string'
            },
        },
        handler(argv) {
            contacts.simpanContact(argv.nama, argv.email, argv.noHp);
        },
    })
    .demandCommand();

// menampilkan daftar semua nama dan nomor handphone contact

yargs.command({
    command: 'list',
    describe: 'Menampilkan sebuah contact',
    handler() {
        contacts.listContact();
    },
});

// menampilkan detail sebuah contact
yargs.command({
    command: 'detail',
    describe: 'Menambahkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    }
});

// menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    }
});

yargs.parse();