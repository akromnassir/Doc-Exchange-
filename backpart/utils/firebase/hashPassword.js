const argon2 = require("argon2");

async function hashPassword(password) {
    try {
        const hash = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 4,
            hashLength: 32,
            saltLength: 16,
        });
        return hash;
    } catch (error) {
        throw new Error(`Failed to hash password: ${error.message}`);
    }
}

async function verifyPassword(password, hash) {
    try {
        return await argon2.verify(hash, password);
    } catch (error) {
        return false;
    }
}

module.exports = { hashPassword, verifyPassword };
