export const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
}

export const isValidPassword = (password: string) => {
    return password.length > 5;
}