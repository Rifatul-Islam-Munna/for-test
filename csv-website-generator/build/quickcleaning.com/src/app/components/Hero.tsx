
import React from 'react';

export default function Hero() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '100px 20px',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>
        Quick Cleaning
      </h1>
      <p style={{
        fontSize: '1.2rem',
        maxWidth: '600px',
        lineHeight: '1.6'
      }}>
        Quick Professional cleaning services
      </p>
      <button style={{
        background: '#ff6b6b',
        color: 'white',
        border: 'none',
        padding: '15px 30px',
        fontSize: '1.1rem',
        borderRadius: '25px',
        marginTop: '30px',
        cursor: 'pointer',
        transition: 'transform 0.3s'
      }}>
        Get Started Today
      </button>
    </div>
  );
}
