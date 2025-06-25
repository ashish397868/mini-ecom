const productHandler = async (skip = 0, limit = 10) => {
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return null;
  }
};

const getProductById = async (id) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return null;
  }
};

export { productHandler, getProductById };