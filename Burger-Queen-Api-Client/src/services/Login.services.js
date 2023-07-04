export function loginAdmin(data) {
    console.log('holaaaaaaaaaaaaaaaaaaaaaa' ,data);
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify({ email: data.email, password: data.password }),  // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
}