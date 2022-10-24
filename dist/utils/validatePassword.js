import bcrypt from "bcryptjs";
const validatePassword = async function (password, candidatePassword) {
    const compare = await bcrypt.compare(candidatePassword, password);
    return compare;
};
export default validatePassword;
