import axios from "axios";
// alternate api:https://api.escuelajs.co/api/v1/products?offset=0&limit=20
async function productsData() {
  const products = await axios.get(
    "https://fakestoreapi.com/products"
  );
  return products;
}


export default productsData;
