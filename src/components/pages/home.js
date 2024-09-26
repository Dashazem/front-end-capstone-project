'use client';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Image from 'next/image';
import juguetes from '../../../static/assets/images/home-page/juguetes.jpg';
import mordedores from '../../../static/assets/images/home-page/mordedores.jpg';
import moviles from '../../../static/assets/images/home-page/moviles.jpg';
import patucos from '../../../static/assets/images/home-page/patucos.jpg';


export default class Home extends Component {
  render() {
    return (
      <div className='category-wrapper'>
        
        <div className='category-container'>
          <div className='category-image'>
            <NavLink to="/categories/juguetes">
                <Image
                  src={juguetes}
                  alt="Juguetes image"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
            </NavLink>
          </div>
          
          <div className='category-right-text'>
            <p>Descubre nuestra colección de<br/><NavLink to="/categories/juguetes">JUGUETES AMIGURUMI</NavLink></p>
          </div>
        </div>
        
        <div className='category-container'>
          <div className='category-left-text'>
            <p>¡No te pierdas nuestros<br/><NavLink to="/categories/mordedores">MORDEDORES</NavLink> !</p>
          </div>
          
          <div className='category-image'>
            <NavLink to="/categories/mordedores">
                <Image
                  src={mordedores}
                  alt="Mordedores image"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
            </NavLink>
          </div>
        </div>

        <div className='category-container'>
          <div className='category-image'>
            <NavLink to="/categories/patucos">
                <Image
                  src={patucos}
                  alt="Patucos image"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
            </NavLink>
          </div>

          <div className='category-right-text'>
            <p>Mantén los pies de tu bebé cálidos y cómodos con nuestros<br /><NavLink to="/categories/patucos">PATUCOS</NavLink></p>
          </div>
        </div>

        <div className='category-container'>
          <div className='category-left-text'>
            <p>Añade un toque de magia a la habitación de tu bebé con nuestros<br/><NavLink to="/categories/moviles">MÓVILES DE CUNA</NavLink></p>
          </div>

          <div className='category-image'>
            <NavLink to="/categories/moviles">
              <Image
                src={moviles}
                alt="Moviles image"
                layout="fill"
                objectFit="cover"
                priority
              />
            </NavLink>
          </div>
        </div>

        <div class="ver-todo-section">
          <div class="heading">
            <NavLink to="/products">Ver Todo</NavLink>
          </div>
        </div>

      </div>  
    );
  }
}