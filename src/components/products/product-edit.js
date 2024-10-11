'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const EditProduct = ({ product }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    products_name: '',
    products_category: '',
    products_description: '',
    products_material: '',
    products_quantity: '',
    products_price: '',
  });

  const [message, setMessage] = useState('');
  const [existingImages, setExistingImages] = useState({});
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null]); 

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://127.0.0.1:5000/product/${product.products_id}`, { withCredentials: true });
      const images = response.data.product.image_product || [];
      const imageMapping = {
        main_image: images[0] || '',
        first_additional_image: images[1] || '',
        second_additional_image: images[2] || ''
      };

      setFormData(response.data.product);
      setExistingImages(imageMapping);
    };
    fetchProduct();
  }, [product.products_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onDrop = (index) => (acceptedFiles) => {
    const newUploadedImages = [...uploadedImages];
    const newImagePreviews = [...imagePreviews]; 
    if (acceptedFiles.length > 0) {
      newUploadedImages[index] = acceptedFiles[0];
      newImagePreviews[index] = URL.createObjectURL(acceptedFiles[0]); 
    }
    setUploadedImages(newUploadedImages);
    setImagePreviews(newImagePreviews); 
  };

  const deleteImage = (imageType, index) => {
    setExistingImages(prev => ({ ...prev, [imageType]: '' }));
    const newImages = [...uploadedImages];
    const newPreviews = [...imagePreviews];
    newImages[index] = null;
    newPreviews[index] = null; 
    setUploadedImages(newImages);
    setImagePreviews(newPreviews); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    uploadedImages.forEach((image, index) => {
      if (image) {
        formDataToSend.append(`image_product_${index}`, image);
      }
    });

    try {
      await axios.patch(`http://127.0.0.1:5000/products/${product.products_id}`, formDataToSend, { withCredentials: true });
      setMessage('Producto editado correctamente');
      setTimeout(() => {
        router.push(`/categories/${product.products_category}`);
      }, 2000);
      
    } catch (error) {
      console.error("Error updating product", error);
      setMessage('No ha sido posible editar el producto');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/${product.products_id}`, { withCredentials: true });
      setMessage('Producto eliminado correctamente');
      setTimeout(() => {
        router.push(`/categories/${product.products_category}`);
      }, 2000);
   
    } catch (error) {
      console.error("Error deleting product", error);
      setMessage('No ha sido posible eliminar el producto');
    }
  };

  const DropzoneArea = ({ existingImage, index, imageType }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: onDrop(index),
      accept: {
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png']
      }
    });

    return (
      <div {...getRootProps()} className='dropzone'>
        <input {...getInputProps()} />
        {imagePreviews[index] || existingImage ? (
          <div className='image-wrapper'>
            <img src={imagePreviews[index] || existingImage} alt="Uploaded" />
            <button type="button" onClick={() => deleteImage(imageType, index)}>Remove</button>
          </div>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='edit-product-form'>
      <div className="left-column">
        <input type="text" name="products_name" value={formData.products_name} onChange={handleChange} placeholder="Nombre*" />
        <input type="text" name="products_category" value={formData.products_category} onChange={handleChange} placeholder="Categoría*" />
        <input type="text" name="products_material" value={formData.products_material} onChange={handleChange} placeholder="Material*" />
        <input type="text" name="products_quantity" value={formData.products_quantity} onChange={handleChange} placeholder="Cantidad*" />
        <input type="text" name="products_price" value={formData.products_price} onChange={handleChange} placeholder="Precio* (ej. 15.00)" />
        <textarea name="products_description" value={formData.products_description} onChange={handleChange} placeholder="Descripción*"/>
      </div>
      
      <DropzoneArea existingImage={existingImages.main_image} index={0} imageType='main_image' />
      <DropzoneArea existingImage={existingImages.first_additional_image} index={1} imageType='first_additional_image' />
      <DropzoneArea existingImage={existingImages.second_additional_image} index={2} imageType='second_additional_image' />

      <button type='submit'>Guardar cambios</button>
      </form>

      <button onClick={handleDelete}>Eliminar producto</button>

      {message && <p>{message}</p>}
    </div>
    
  );
};

export default EditProduct;

