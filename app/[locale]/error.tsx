'use client';

import React from 'react'

const ErrorPage = () => {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Something went wrong</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Sorry, an unexpected error has occurred. Please try again later.
      </p>
      <button
          onClick={() => window.location.reload()}
          className='cursor-pointer'
          style={{
            padding: '0.75rem 1.5rem',
            background: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>

    </div>
  )
}

export default ErrorPage