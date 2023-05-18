const fs = require('node:fs');
const {
    resolve
} = require('node:path');
const chalk = require('chalk');
const validator = require('validator');

//membuat folder data jika belum ada
const dirPath = './data';

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//membuat file contact.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const simpanContact = (nama, email, noHP) => {
    const contact = {
        nama,
        email,
        noHP
    };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file); //parse string ke json

    // cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
        return false;
    }

    // cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email tidak valid!'));
            return false;
        }
    }

    // cek nomor handphone
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.inverse.bold('No hp tidak valid!'));
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); //parse json ke string
    console.log(chalk.green.inverse.bold(`Terima kasih sudah memasukkan data`));

}

module.exports = {simpanContact};