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

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [existingImages, setExistingImages] = useState({});
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null]); 

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://back-end-capstone-project.onrender.com/product/${product.products_id}`, { withCredentials: true });
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
      await axios.patch(`https://back-end-capstone-project.onrender.com/products/${product.products_id}`, formDataToSend, { withCredentials: true });
      setSuccessMessage('Producto editado correctamente');
      setTimeout(() => {
        router.push(`/products/${product.products_category.toLowerCase()}`);
      }, 2000);
      
    } catch (error) {
      console.error("Error updating product", error);
      setErrorMessage('No ha sido posible editar el producto');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://back-end-capstone-project.onrender.com/${product.products_id}`, { withCredentials: true });
      setSuccessMessage('Producto eliminado correctamente');
      setTimeout(() => {
        router.push(`/products/${product.products_category.toLowerCase()}`);
      }, 2000);
   
    } catch (error) {
      console.error("Error deleting product", error);
      setErrorMessage('No ha sido posible eliminar el producto');
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
            <button type="button" className='btn'  onClick={() => deleteImage(imageType, index)}>Remove</button>
          </div>
        ) : (
          <p>Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar archivos.</p>
        )}
      </div>
    );
  };

  return (
    <div className='edit-product-wrapper'>
      <form onSubmit={handleSubmit}>
        <div className='edit-product-container'>
          <div className="edit-product-inputs">
            <input type="text" name="products_name" value={formData.products_name} onChange={handleChange} placeholder="Nombre*" />
            <select 
                name="products_category"
                value={formData.products_category}
                onChange={handleChange}
                className='select-element'
              >
                <option value='Juguetes'>Juguetes</option>
                <option value='Patucos'>Patucos</option>
                <option value='Moviles'>Moviles</option>
                <option value='Mordedores'>Mordedores</option>
            </select>
            
            <input type="text" name="products_material" value={formData.products_material} onChange={handleChange} placeholder="Material*" />
            <input type="text" name="products_quantity" value={formData.products_quantity} onChange={handleChange} placeholder="Cantidad*" />
            <input type="text" name="products_price" value={formData.products_price} onChange={handleChange} placeholder="Precio* (ej. 15.00)" />
            <textarea name="products_description" value={formData.products_description} onChange={handleChange} placeholder="Descripción*"/>
          </div>
          
          <div className='right-column'>
            <div className='edit-product-uploaders'>
              <DropzoneArea existingImage={existingImages.main_image} index={0} imageType='main_image' />
              <DropzoneArea existingImage={existingImages.first_additional_image} index={1} imageType='first_additional_image' />
              <DropzoneArea existingImage={existingImages.second_additional_image} index={2} imageType='second_additional_image' />
            </div>
            
            <div className='edit-product-button'>
              <button type='submit' className='btn'>Guardar cambios</button>

              <button className='btn' onClick={handleDelete}>Eliminar producto</button>

              {successMessage && <div className='success-message'><p>{successMessage}</p></div>}
              {errorMessage && <div className='error-message'><p>{errorMessage}</p></div>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

