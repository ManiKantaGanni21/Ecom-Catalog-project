import React from 'react'

const CategoryFilter = ({ categories, onSelectCategory }) => {

   
  return (
    <select
      id='categorySelect'
      className="form-select"
      onChange={(e) => onSelectCategory(e.target.value ? Number(e.target.value) : null)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter
