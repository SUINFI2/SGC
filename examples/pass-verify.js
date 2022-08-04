const {bcrypt}=require('bcrypt');
async function verifyPassword(){
  const myPassword='admin123';
  const hash='admin123';
  const isMatch = await bcrypt.compare(myPassword,hash);
  console.log(hash)
}

veryPassword();
