import bcrypt from "bcryptjs";

const createHash = async( password: string ) => {
    const salts = await bcrypt.genSalt( 10 );
    return bcrypt.hash( password, salts );
}

const isValidPassword = async( user: any, password: string ) => bcrypt.compare( password, user.password );

export { createHash, isValidPassword };