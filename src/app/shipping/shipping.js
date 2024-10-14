import React from 'react';

export default function Shipping() {
  return (
    <div className='shipping-wrapper'>
      <h2>POLÍTICA DE ENVÍOS Y DEVOLUCIONES</h2>

      <div className='shipping-container'>
        <p>
          En nuestra tienda, ofrecemos envíos a toda la península de España para que puedas disfrutar de nuestros juguetes y accesorios para bebés hechos a mano con ganchillo y agujas.
        </p>
        <p>
          <strong>Tenga en cuenta</strong> que actualmente no realizamos envíos a las Islas Baleares, Canarias, Ceuta y Melilla.
        </p>
      </div>
      
      <div className='shipping-container'>
        <h3>Precios y Tiempos de Entrega</h3>
        <p>
          - <strong>Envío gratuito</strong> para todos los pedidos.
        </p>
        <p>
          - <strong>Tiempo de entrega:</strong> Los pedidos se procesan en un plazo de 1-3 días hábiles y se entregan en un plazo de 3-5 días hábiles después del envío.
        </p>
      </div>
      
      <div className='shipping-container'>
        <h3>Política de Devoluciones</h3>
        <p>
          Si no estás satisfecho con tu compra, puedes devolverla dentro de los 30 días posteriores a la recepción. Asegúrate de que el producto esté en su estado original y sin usar.
        </p>
        <p>
          Para iniciar el proceso de devolución, contáctanos a través de nuestro correo electrónico o número de teléfono, y te guiaremos a través de los pasos necesarios.
        </p>
      </div>
      
    </div>
  );
}
