import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

export default function UserEditAddress() {
  const navigate = useNavigate();
  const { addressId } = useParams(); 
  const userId = useSelector(state => state.auth.id);
  
  const [formData, setFormData] = useState({
    addresses_street_one: '',
    addresses_street_two: '',
    addresses_city: '',
    addresses_province: '',
    addresses_country: 'España',
    addresses_postal_code: '',
  });
  
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/addresses/${addressId}`);
        setFormData({
          addresses_street_one: response.data.street_one,
          addresses_street_two: response.data.street_two,
          addresses_city: response.data.city,
          addresses_province: response.data.province,
          addresses_country: response.data.country,
          addresses_postal_code: response.data.postal_code,
        });
      } catch (error) {
        console.error('Error fetching address');
        setMessage('Error al cargar la dirección.');
      }
    };

    fetchAddress();
}, [addressId]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://127.0.0.1:5000/update_address`, {
        ...formData,
        address_id: addressId, 
        customers_id: userId, 
      });
      setMessage('Dirección actualizada correctamente!');
      setTimeout(() => {
        navigate('/user/addresses'); 
      }, 2000);
    } catch (error) {
      console.error('Error updating address:', error);
      setMessage('Error al actualizar la dirección. Inténtalo de nuevo.');
    }
  };


  return (
    <div>
      <h2>Editar Dirección</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Dirección*:
            <input
              type="text"
              name="addresses_street_one"
              value={formData.addresses_street_one}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Piso/Puerta u otro:
            <input
              type="text"
              name="addresses_street_two"
              value={formData.addresses_street_two}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Localidad*:
            <input
              type="text"
              name="addresses_city"
              value={formData.addresses_city}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Provincia*:
            <input
              type="text"
              name="addresses_province"
              value={formData.addresses_province}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Región*:
            <input
              type="text"
              name="addresses_country"
              value={formData.addresses_country}
              onChange={handleChange}
              readOnly
              required
            />
          </label>
        </div>
        <div>
          <label>
            Código postal*:
            <input
              type="text"
              name="addresses_postal_code"
              value={formData.addresses_postal_code}
              onChange={handleChange}
              required
              maxLength={5} 
            />
          </label>
        </div>
        <button type="submit">Actualizar Dirección</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
