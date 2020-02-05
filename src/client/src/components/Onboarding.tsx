import React from 'react';
import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <div>
      <p>Looks like you have no routes listed.</p>
      <Link to='/route/create'>
        <button>Create Route</button>
      </Link>
      <Link to='/route/create/multi'>
        <button>Upload CSV</button>
      </Link>
    </div>
  );
};

export default Onboarding;
