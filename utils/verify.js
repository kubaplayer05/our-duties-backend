export const verifyPassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/
    return password.match(re)
}

