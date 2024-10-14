import React from 'react';
import Image from 'next/image';
import aboutImage from '../../../static/assets/images/about-page/about-image.jpg';

export default function AboutUsPage() {
  return (
    <div className='about-wrapper'>
      <div className='about-image-wrapper'>
        <Image
          src={aboutImage}
          alt="About-page image"
          fill
          objectFit="cover"
          priority
        />
      </div>

      <div className='about-text-wrapper'>
        <h2>ACERCA DE NOSOTROS</h2>

        <div className='about-text'>
        <p>
          Somos una tienda en línea dedicada a la venta de productos hechos a mano, 
          como juguetes y accesorios para bebés. 
        </p>

        <p>
          La historia de nuestra empresa comienza con dos amigas apasionadas por la 
          artesanía y el diseño. Juntas, decidimos convertir nuestra pasión en un 
          negocio, creando productos únicos y especiales para los más pequeños. 
        </p>
    
        <p>
          Cada uno de nuestros productos está hecho con amor y dedicación, 
          garantizando calidad y singularidad en cada pieza. Agradecemos su apoyo 
          y esperamos que disfruten de nuestros productos tanto como nosotros disfrutamos 
          creándolos.
        </p>
        </div>
      </div>
    </div>
  );
}
