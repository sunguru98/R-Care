import React from 'react';
import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <div className='Form'>
      <h1 style={{ textAlign: 'center' }}>
        Get started with your first route.
      </h1>
      <div style={{ width: '90%', display: 'flex', justifyContent: 'center' }}>
        <Link to='/route/create'>
          <button
            style={{ width: '100%', cursor: 'pointer' }}
            className='Button big'>
            Create Route
          </button>
        </Link>
        <Link style={{ marginLeft: '2rem' }} to='/route/create/multi'>
          <button
            style={{ width: '100%', cursor: 'pointer' }}
            className='Button big yellow'>
            Upload CSV
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Onboarding;
