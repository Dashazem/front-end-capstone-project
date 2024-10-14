import React from 'react';

export default function Contact() {
  return (
    <div className='contact-wrapper'>
      <h2>CONTACTO</h2>
      <p>Bienvenido a nuestra tienda de juguetes y accesorios para bebés hechos a mano con ganchillo y agujas.</p>
      <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos:</p>
      
      <div className='contact-list'>
        <ul>
          <li><strong>Email:</strong> crochetknit@gmail.com</li>
          <li><strong>Teléfono:</strong> +34 123 456 789</li>
          <li><strong>Dirección:</strong> Calle Colon, 123, San Sebastián, España</li>
        </ul>
      </div>
      
      <p>Estamos aquí para ayudarte y hacer que la experiencia de tu bebé sea especial con nuestros productos únicos.</p>
    </div>
  );
}
