const fs = require('node:fs');
const {
    resolve
} = require('node:path');

//menuliskan string ke file (synchronus)
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World secara synchronus!');
// } catch (error) {
//     console.log(error);
// }


//menuliskan string ke file (Asynchronus)
// fs.writeFile('data/test.txt', 'Hello World secara Asynchronous', (e) => {
//     console.log(e);
// });



//membaca file secara (synchronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);
// console.log(data.toString());

//membaca file secara (Asynchronous)
// fs.readFile('data/test.txt', 'utf-8', (e, data) => {
//     if (e) throw e;
//     console.log(data);
// });


//Readline
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

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

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    });
};

const simpanContact = (nama, email, noHP) => {
    const contact = {
        nama,
        email,
        noHP
    };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file); //parse string ke json

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); //parse json ke string
    console.log(`Terima kasih sudah memasukkan data`);

    rl.close();
}

module.exports = {tulisPertanyaan, simpanContact};