import bcrypt from "bcryptjs";

const validatePassword = async function (password: string, candidatePassword: string) {
    const compare = await bcrypt.compare(candidatePassword, password) 
    return compare;
  }

export default validatePassword;