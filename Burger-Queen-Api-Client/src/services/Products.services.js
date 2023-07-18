export function getAllProducts() {
  const token = localStorage.getItem("accessToken");

  return fetch("http://localhost:8080/products", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}

export function createNewProduct(data) {
  const token = localStorage.getItem("accessToken");

  const body = {
    id: data.id,
    name: data.name,
    price: data.price,
    image: data.image,
    type: data.type,
    dateEntry: data.dataEntry,
  };

  return fetch("http://localhost:8080/products", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function editDataProducts(productData) {
  const token = localStorage.getItem("accessToken");
  return fetch(`http://localhost:8080/products/${productData.id}`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
}

export function getDataOnlyProduct(productId) {
    const token = localStorage.getItem("accessToken");
    return fetch(`http://localhost:8080/products/${productId}`,
     {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  }

  export function deleteProduct(productId) {
    const token = localStorage.getItem("accessToken");
    console.log(productId);
    return fetch(`http://localhost:8080/products/${productId}`,
     {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  }

 