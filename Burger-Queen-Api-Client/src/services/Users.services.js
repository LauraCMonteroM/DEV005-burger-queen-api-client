export function createUser(data) {
  const token = localStorage.getItem("accessToken");

  const body = {
    "email": data.email,
    "password": data.password,
    "role": data.role,
  }; 

  return fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,      
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function getData() {
  const token = localStorage.getItem("accessToken");

  return fetch("http://localhost:8080/users", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}

export function editDataUser() {
  const token = localStorage.getItem("accessToken");

  return fetch("http://localhost:8080/users", {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}
