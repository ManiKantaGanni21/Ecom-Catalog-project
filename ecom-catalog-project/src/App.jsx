import { useEffect, useState } from 'react'
import './App.css'
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import ReactDOM from "react-dom/client";


function root() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  return root;
}
root().render(<App />);
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSortChange = (event) => setSortOrder(event.target.value);
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId ? Number(categoryId) : null);
  };

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory && product.category.id !== selectedCategory) return false;
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
    
    fetch('http://localhost:8080/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className="container py-4">
      {/* Gradient header */}
      <h1 className="text-center mb-5 heading-gradient">🛍️ Products Catalog</h1>

      {/* Filters Row */}
      <div className="row align-items-center mb-4 g-3">
        <div className="col-md-3 col-sm-12">
          <CategoryFilter categories={categories} onSelectCategory={handleSelectCategory} />
        </div>
        <div className="col-md-5 col-sm-12">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="🔍 Search for products..."
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-4 col-sm-12">
          <select className="form-select shadow-sm" onChange={handleSortChange}>
            <option value="asc">⬇️ Sort by Price: Low to High</option>
            <option value="desc">⬆️ Sort by Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div>
        {filteredProducts.length ? (
          <ProductList products={filteredProducts} />
        ) : (
          <p className="text-center text-muted">⚠️ No products found</p>
        )}
      </div>
    </div>
  )
}

export default App
