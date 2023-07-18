import crypto from 'crypto';

// Función para hashear una contraseña
export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Genera una salt aleatoria
    const salt = crypto.randomBytes(16).toString('hex')
    
    // Usa scrypt para hashear la contraseña
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString('hex'))
    })
  })
}

// Función para comprobar una contraseña
export async function checkPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString('hex'));
    })
  })
}
