'use client'
import React from 'react';

export default function Contact() {
  return (
    <div style={{
      background: '#f8f9fa',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '40px',
          color: '#333'
        }}>
          Contact Us
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginTop: '50px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>📞 Phone</h3>
            <p style={{ fontSize: '1.2rem', color: '#333' }}>01799887766</p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>📍 Address</h3>
            <p style={{ fontSize: '1.1rem', color: '#333' }}>Flat 3A, Road 15, Uttara, Dhaka</p>
          </div>
        </div>
      </div>
    </div>
  );
}