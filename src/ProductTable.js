import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Ensure your CSS file is correctly imported

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [status, setStatus] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://api.udhhyog.com/v1/test')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);

        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error(error));
  }, []);

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (priceRange) {
      if (priceRange === 'Low') {
        filtered = filtered.filter(product => product.price < 50);
      } else if (priceRange === 'Medium') {
        filtered = filtered.filter(product => product.price >= 50 && product.price <= 100);
      } else if (priceRange === 'High') {
        filtered = filtered.filter(product => product.price > 100);
      }
    }

    if (status !== null) {
      filtered = filtered.filter(product => product.status === (status ? 'Active' : 'Inactive'));
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, priceRange, status, searchTerm, products]);

  const toggleSelectProduct = (productId) => {
    setSelectedProduct(prev => (prev === productId ? null : productId));
  };

  const toggleStatusFilter = () => {
    if (status === null) setStatus(true);
    else if (status) setStatus(false);
    else setStatus(null);
  };

  return (
    <div className="container">
    <header className="header">
        <h1>Product Dashboard</h1>
        <div className="nav-item">
        <div className="nav">
          <button>Dashboard</button>
        </div>
        <div className="nav">
          <button>Products</button>          
        </div>
        <div className="nav">
          <button>Settings</button>          
        </div>

        </div>
      </header>
      <div className="filters">
        <div className="filter-item">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="">Price Range</option>
            <option value="Low">Low (Under $50)</option>
            <option value="Medium">Medium ($50-$100)</option>
            <option value="High">High (Over $100)</option>
          </select>
        </div>

        <div className="filter-item">
          <div className="status-toggle" onClick={toggleStatusFilter}>
            <div className={`toggle-button ${status === null ? 'neutral' : status ? 'active' : 'inactive'}`}>
              <div className="toggle-circle"></div>
            </div>
            <span>{status === null ? 'Status' : status ? 'Active' : 'Inactive'}</span>
          </div>
        </div>

        <div className="filter-item search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">&#128269;</span>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr style={{border: 'none'}}>
              <th style={{border: 'none'}}>Select</th>
              <th style={{border: 'none'}}>Product ID</th>
              <th style={{border: 'none'}}>Product Name</th>
              <th style={{border: 'none'}}>Category</th>
              <th style={{border: 'none'}}>Price</th>
              <th style={{border: 'none'}}>Status</th>
            </tr>
          </thead>
          <tbody style={{ border: 'none' }}>
            {filteredProducts.map((product) => (
              <tr
                key={product.product_id}
                className={selectedProduct === product.product_id ? 'selected-row' : ''}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProduct === product.product_id}
                    onChange={() => toggleSelectProduct(product.product_id)}
                  />
                </td>
                <td style={{border: 'none'}}>{product.product_id}</td>
                <td style={{border: 'none'}}>{product.product_name}</td>
                <td style={{border: 'none'}}>{product.category}</td>
                <td style={{border: 'none'}}>${product.price.toFixed(2)}</td>
                <td style={{border: 'none'}}>
                  <span className={`status ${product.status}`}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;