import React from 'react';
import { ReactComponent as DeleteIcon } from '../deleteIcon.svg';
import '../styles/components/StopBadge.scss';

interface StopBadgeProps {
  stopName: string;
  onClick: React.MouseEventHandler;
}

const StopBadge: React.FC<StopBadgeProps> = ({ stopName, onClick }) => {
  return (
    <li className='StopBadge'>
      <span onClick={onClick}>
        <DeleteIcon className='StopBadge__delete' />
      </span>
      {stopName}
    </li>
  );
};

export default StopBadge;
