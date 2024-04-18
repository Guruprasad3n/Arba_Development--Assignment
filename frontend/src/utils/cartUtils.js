export const addToCart = (product, setProducts) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItemIndex = cartItems.findIndex(
    (item) => item._id === product._id
  );

  if (existingItemIndex !== -1) {
    const updatedItems = [...cartItems];
    updatedItems[existingItemIndex].count += 1;
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  } else {
    const updatedItems = [...cartItems, { ...product, count: 1 }];
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  }

  setProducts((prevProducts) =>
    prevProducts.map((prevProduct) =>
      prevProduct._id === product._id
        ? { ...prevProduct, inCart: true }
        : prevProduct
    )
  );
};

export const removeFromCart = (productId, setProducts) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItemIndex = cartItems.findIndex(
    (item) => item._id === productId
  );

  if (existingItemIndex !== -1) {
    const updatedItems = [...cartItems];
    updatedItems[existingItemIndex].count -= 1;

    if (updatedItems[existingItemIndex].count <= 0) {
      updatedItems.splice(existingItemIndex, 1);
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  }
  setProducts((prevProducts) =>
    prevProducts.map((prevProduct) =>
      prevProduct._id === productId
        ? { ...prevProduct, inCart: false }
        : prevProduct
    )
  );
};
