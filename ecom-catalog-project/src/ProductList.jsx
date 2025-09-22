import React from 'react'

const ProductList = ({ products }) => {
  return (
    <div className="row">
      {products.map(product => (
        <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">      
          <div className="card h-100 shadow-sm product-card">
            <img 
              src={product.image || 'https://placehold.co/600x400'} 
              className="card-img-top"
              alt={product.name || 'Product Image'} 
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">{product.name || 'Product Name'}</h5>
              <p className="card-text text-muted">{product.description || 'Product Description'}</p>
              <p className="card-text price-tag">${product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
