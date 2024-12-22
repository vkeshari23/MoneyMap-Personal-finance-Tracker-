import bcrypt from 'bcrypt';

export const hashedPassword = async(password)=>{
    try {
         const saltRounds = 12
          return  await bcrypt.hash(password,saltRounds)   
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword = async(password,hash)=>{
    try {
        return await bcrypt.compare(password,hash)
    } catch (error) {
        console.log(error);
    }
}
