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

export function getDataOnlyUser(userId) {
  const token = localStorage.getItem("accessToken");
  console.log(userId);
  return fetch(`http://localhost:8080/users/${userId}`,
   {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}

export function editDataUser(userId, userData) {
  const token = localStorage.getItem("accessToken");
  console.log(userData);
  return fetch(`http://localhost:8080/users/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
}

export function deleteUser(userId) {
  const token = localStorage.getItem("accessToken");
  console.log(userId);
  return fetch(`http://localhost:8080/users/${userId}`,
   {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}
