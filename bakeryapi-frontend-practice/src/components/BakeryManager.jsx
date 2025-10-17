import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; 
import config from './config.js';

const BakeryManager = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    id: '',
    itemName: '',
    category: '',
    price: '',
    availableQuantity: '',
    bakedDate: '',
    description: ''
  });
  const [categoryToFetch, setCategoryToFetch] = useState('');
  const [fetchedItems, setFetchedItems] = useState([]);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const baseUrl = `${config.url}`;

  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setItems(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      setMessage('Failed to fetch bakery items.');
      setItems([]);
    }
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in item) {
      if (!item[key] || item[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addItem = async () => {
    if (!validateForm()) return;
    try {
      const payload = { ...item, id: parseInt(item.id) };
      await axios.post(`${baseUrl}/add`, payload);
      setMessage('Bakery item added successfully.');
      fetchAllItems();
      resetForm();
      setShowModal(false);
    } catch (error) {
      setMessage('Error adding bakery item.');
      console.error(error);
    }
  };

  const updateItem = async () => {
    if (!validateForm()) return;
    try {
      const payload = { ...item, id: parseInt(item.id) };
      await axios.put(`${baseUrl}/update`, payload);
      setMessage('Bakery item updated successfully.');
      fetchAllItems();
      resetForm();
      setShowModal(false);
    } catch (error) {
      setMessage('Error updating bakery item.');
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllItems();
    } catch (error) {
      setMessage('Error deleting bakery item.');
      console.error(error);
    }
  };

  const getItemsByCategory = async () => {
    if (!categoryToFetch) return;
    try {
      const res = await axios.get(`${baseUrl}/category/${categoryToFetch}`);
      setFetchedItems(Array.isArray(res.data) ? res.data : res.data.data || []);
      setMessage('');
    } catch (error) {
      setFetchedItems([]);
      setMessage('No items found in this category.');
    }
  };

  const handleEdit = (i) => {
    setItem(i);
    setEditMode(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setItem({
      id: '',
      itemName: '',
      category: '',
      price: '',
      availableQuantity: '',
      bakedDate: '',
      description: ''
    });
    setEditMode(false);
  };

  return (
    <div className="dashboard-container">
      {message && <div className="alert">{message}</div>}

      <header>
        <h1>Bakery Manager</h1>
        <button className="btn-primary" onClick={() => { setShowModal(true); resetForm(); }}>
          Add New Item
        </button>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editMode ? 'Edit Bakery Item' : 'Add Bakery Item'}</h2>
            <div className="modal-form">
              <input type="number" name="id" placeholder="ID" value={item.id} onChange={handleChange} />
              <input type="text" name="itemName" placeholder="Item Name" value={item.itemName} onChange={handleChange} />
              <input type="text" name="category" placeholder="Category" value={item.category} onChange={handleChange} />
              <input type="number" name="price" placeholder="Price" value={item.price} onChange={handleChange} />
              <input type="number" name="availableQuantity" placeholder="Available Quantity" value={item.availableQuantity} onChange={handleChange} />
              <input type="date" name="bakedDate" value={item.bakedDate} onChange={handleChange} />
              <textarea name="description" placeholder="Description" value={item.description} onChange={handleChange} />
            </div>
            <div className="modal-buttons">
              {!editMode ?
                <button className="btn-primary" onClick={addItem}>Add</button> :
                <button className="btn-success" onClick={updateItem}>Update</button>
              }
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Fetch by Category */}
      <section className="fetch-section">
        <h2>Fetch Items by Category</h2>
        <div className="fetch-box">
          <input type="text" placeholder="Enter Category" value={categoryToFetch} onChange={e => setCategoryToFetch(e.target.value)} />
          <button className="btn-primary" onClick={getItemsByCategory}>Fetch</button>
        </div>
        {Array.isArray(fetchedItems) && fetchedItems.length > 0 &&
          <div className="interview-grid">
            {fetchedItems.map(i => (
              <div className="card" key={i.id}>
                <h3>{i.itemName}</h3>
                <p><b>Category:</b> {i.category}</p>
                <p><b>Price:</b> {i.price}</p>
                <p><b>Available Quantity:</b> {i.availableQuantity}</p>
                <p><b>Baked Date:</b> {i.bakedDate}</p>
                <p><b>Description:</b> {i.description}</p>
              </div>
            ))}
          </div>
        }
      </section>

      {/* All Items */}
      <section className="all-interviews">
        <h2>All Bakery Items</h2>
        <div className="interview-grid">
          {Array.isArray(items) && items.map(i => (
            <div className="card" key={i.id}>
              <h3>{i.itemName}</h3>
              <p><b>Category:</b> {i.category}</p>
              <p><b>Price:</b> {i.price}</p>
              <p><b>Available Quantity:</b> {i.availableQuantity}</p>
              <p><b>Baked Date:</b> {i.bakedDate}</p>
              <p><b>Description:</b> {i.description}</p>
              <div className="card-buttons">
                <button className="btn-success" onClick={() => handleEdit(i)}>Edit</button>
                <button className="btn-danger" onClick={() => deleteItem(i.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BakeryManager;
