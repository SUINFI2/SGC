const {bcrypt}=require('bcrypt');
async function hashPassword(){
  const myPassword='admin123';
  const hash = await bcrypt.hash(myPassword);
  console.log(hash)
}

hashPassword();
