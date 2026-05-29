import React from 'react';
import { MainLoader } from './loader.styled';

interface LoaderProps {
  size?: number;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 80, className = '' }) => {
  return (
    <MainLoader size={size} className={className}>
      <div />
      <div />
    </MainLoader>
  );
};
