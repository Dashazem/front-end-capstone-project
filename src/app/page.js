import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import juguetes from '../../static/assets/images/home-page/juguetes.jpg';
import mordedores from '../../static/assets/images/home-page/mordedores.jpg';
import moviles from '../../static/assets/images/home-page/moviles.jpg';
import patucos from '../../static/assets/images/home-page/patucos.jpg';


export default function Home() {
    return (
      <div className='category-wrapper'>
        
        <div className='category-container'>
          <div className='category-image'>
            <Link href="/products/juguetes">
              <Image
                src={juguetes}
                alt="Juguetes image"
                fill
                sizes="(max-width: 600px) 100vw, 50vw"
                priority
              />
            </Link>
          </div>
          
          <div className='category-right-text'>
            <p>Descubre nuestra colección de<br/><Link href="/products/juguetes">JUGUETES AMIGURUMI</Link></p>
          </div>
        </div>
        
        <div className='category-container'>
          <div className='category-left-text'>
            <p>¡No te pierdas nuestros<br/><Link href="/products/mordedores">MORDEDORES</Link> !</p>
          </div>
          
          <div className='category-image'>
            <Link href="/products/mordedores">
                <Image
                  src={mordedores}
                  alt="Mordedores image"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                  priority
                />
            </Link>
          </div>
        </div>

        <div className='category-container'>
          <div className='category-image'>
            <Link href="/products/patucos">
                <Image
                  src={patucos}
                  alt="Patucos image"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                  priority
                />
            </Link>
          </div>

          <div className='category-right-text'>
            <p>Mantén los pies de tu bebé cálidos y cómodos con nuestros<br /><Link href="/products/patucos">PATUCOS</Link></p>
          </div>
        </div>

        <div className='category-container'>
          <div className='category-left-text'>
            <p>Añade un toque de magia a la habitación de tu bebé con nuestros<br/><Link href="/products/moviles">MÓVILES DE CUNA</Link></p>
          </div>

          <div className='category-image'>
            <Link href="/products/moviles">
              <Image
                src={moviles}
                alt="Moviles image"
                fill
                sizes="(max-width: 600px) 100vw, 50vw"
                priority
              />
            </Link>
          </div>
        </div>

        <div class="ver-todo-section">
          <div class="heading">
            <Link href="/products">Ver Todo</Link>
          </div>
        </div>

      </div>  
    );
  
}