import bcrypt from "bcryptjs";

const validatePassword = async function (password: string, candidatePassword: string) {
    const compare = await bcrypt.compare(password, candidatePassword) 
    return compare;
  }

export default validatePassword;