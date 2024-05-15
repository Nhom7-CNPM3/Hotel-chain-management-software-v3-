'use server'

export default async function generateRandomPassword() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+";
    const charactersLength = 8;
  
    const uniqueCharacters = [...Array.from(new Set(characters))];
  
    let password = "";
  
    for (let i = 0; i < charactersLength; i++) {
      const randomIndex = Math.floor(Math.random() * uniqueCharacters.length);
      password += uniqueCharacters[randomIndex];
    }
  
    return password;
  };