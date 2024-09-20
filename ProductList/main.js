const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1000,
    category: "Electronics",
    discount: 10
  },
  { id: 2, name: "Shoes", price: 200, category: "Fashion", discount: 0 },
  {
    id: 3,
    name: "Smartphone",
    price: 800,
    category: "Electronics",
    discount: 5
  },
  { id: 4, name: "T-shirt", price: 50, category: "Fashion" },
  { id: 5, name: "Fridge", price: 1200, category: "Appliances", discount: 20 }
];

function getFilteredProducts(
  products,
  minPrice,
  maxPrice,
  categoryFilter,
  sortBy
) {
  let result = products.filter(
    (product) =>
      product.category === categoryFilter &&
      product.price >= minPrice &&
      product.price <= maxPrice
  );
  const productList = result.map((product) => {
    return {
      ...product,
      price: product.price - (product.price * product.discount) / 100
    };
  });
  return productList.sort((a, b) => a[sortBy] - b[sortBy]);
}

console.log(getFilteredProducts(products, 100, 1000, "Electronics", "price"));
// [
// product.price - (product.price * product.discount) / 100;
//   { id: 3, name: "Smartphone", price: 760, category: "Electronics" }, // 5% discount applied
//   { id: 1, name: "Laptop", price: 900, category: "Electronics" } // 10% discount applied
// ];
