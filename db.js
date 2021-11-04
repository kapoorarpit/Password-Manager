// import { Encrypt as _Encrypt } from 'encrypt.js';
// import { writeFile, readFile } from "fs";
const encrypt = require("./encrypt");
const fs = require("fs");


class DB {
    constructor(filepath, password, data=null) {
        this.filepath = filepath;
        this.password = password;
        this.encrypt = new encrypt(password);
        if (!data) {
            this.init();
        };
    };
    init() {
        let passwordHash = this.encrypt.hashPassword(this.password);
        if (!fs.existsSync(`${this.filepath}/db.spdb`)){
            fs.writeFile(`${this.filepath}/db.spdb`, passwordHash, (err) => {
                if (err) console.log(err);
                console.log("Successfully written to file.");
            });
        };
    }

    update(data) {
        fs.readFile(`${this.filepath}/db.spdb`, (err, filedata) => {
            if (err) {
                console.error(err);
            };
            let encryptedString = filedata.toString();
            let ecnryptedData = encryptedString.slice(30, filedata.toString().length - 30);
            let prevData;
            if (ecnryptedData) {
                prevData = JSON.parse(this.encrypt.decrypt(ecnryptedData));
            } else {
                prevData = {};
            };
            let dataToWrite = encryptedString.slice(0,30)+this.encrypt.encrypt(JSON.stringify({...prevData, ...data}))+encryptedString.slice(encryptedString.length - 30, encryptedString.length);
            fs.writeFile(`${this.filepath}/db.spdb`,dataToWrite,(err) => {
                if (err) console.error(err);
                console.log("Successfully updated file.");
            });
        });
    }

    read(callBack) {
        fs.readFile(`${this.filepath}/db.spdb`, (err, filedata) => {
            if (err) {
                console.error(err);
            };
            let encryptedString = filedata.toString();
            let encryptedData = encryptedString.slice(30, filedata.toString().length - 30);
            if (encryptedData) this.currentData = JSON.parse(this.encrypt.decrypt(encryptedData));
            callBack(this.currentData);
        });
    }

    getSavedPasswordHash(callBack) {
        fs.readFile(`${this.filepath}/db.spdb`, (err, filedata) => {
            if (err) {
                console.error(err);
            };
            let encryptedString = filedata.toString();
            let passwordHash = encryptedString.slice(0, 30) + encryptedString.slice(filedata.toString().length - 30, filedata.toString().length);
            callBack(passwordHash);
        });
    }
}

function testWrite(){
    let db = new DB(".","somepassword");
    db.update({ 1: 2, 3: 4});
}

function testRead() {
    let db = new DB(".","somepassword");
    db.read(console.log);
}

testRead();