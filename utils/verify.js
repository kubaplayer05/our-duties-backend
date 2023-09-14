export const verifyPassword = (password) => {
    const re = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$")
    return re.test(password)
}

