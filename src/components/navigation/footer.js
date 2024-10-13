'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  
  return (
    <div className='footer-wrapper'>
      <div className='category-links'>
        <div className='category-link'><Link href='/about-us'>ACERCA DE NOSOTROS</Link></div>
        <div className='category-link'><Link href='/contact'>CONTACTO</Link></div>
        <div className='category-link'><Link href='/shipping'>ENVÍOS Y DEVOLUCIONES</Link></div>
      </div>
    </div>
  );
  
}