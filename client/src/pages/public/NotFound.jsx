import React from 'react';
import { Link } from 'react-router-dom';
import path from '../../utils/path';

const NotFound = () => (
  <div className="flex flex-col">
    <img
      src="https://striketraining.com.au/wp-content/uploads/2021/03/coming-soon.jpg"
      alt="not-found"
    />
    <Link to={`/${path.HOME}`} className="underline hover:text-blue-600 flex items-center">
      Go Home
    </Link>
    <div className='h-[100px]'></div>
  </div>
);

export default NotFound;
