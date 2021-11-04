// import { new as _new } from 'cryptr'; 
// import { hashSync, compareSync } from 'bcrypt';
const Cryptr = require("cryptr");
const bcrypt = require("bcryptjs");

class Encrypt {
    constructor(key) {
        this.cryptr = new Cryptr(key);
    }

    encrypt(data) {
        return this.cryptr.encrypt(data);
    }

    decrypt(data) {
        return this.cryptr.decrypt(data);
    }

    hashPassword(password) {
        return bcrypt.hashSync(password,10);
    }

    isPasswordValid(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}

module.exports = Encrypt;