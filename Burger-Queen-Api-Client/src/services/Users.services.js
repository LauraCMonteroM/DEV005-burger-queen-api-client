export function createUser (email, password, role, token){
    const body = {
        "email": email,
        "password": password,
        "role": role,
      }
    return fetch('http://localhost:8080/users',
     {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + token ,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
     })
}

export function getData (){
  const token = localStorage.getItem('accessToken');

  return fetch('http://localhost:8080/users',
  {
     method: 'GET',
     headers: {
       "Authorization": "Bearer "+ token ,
       "Content-Type": "application/json",      
     },    
   
}
)
}
