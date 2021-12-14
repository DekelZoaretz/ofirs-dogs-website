import React from 'react';
import styled from 'styled-components';

const MainLoader = styled.div<{ size: number }>`
  display: inline-block;
  position: relative;
  width: ${(p) => `${p.size}px`};
  height: ${(p) => `${p.size}px`};

  div {
    position: absolute;
    border: 4px solid #fd1efd;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      top: ${(p) => `${p.size / 2}px`};
      left: ${(p) => `${p.size / 2}px`};
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0;
      left: 0;
      width: ${(p) => `${p.size}px`};
      height: ${(p) => `${p.size}px`};
      opacity: 0;
    }
  }
`;

interface LoaderProps {
    size?: number;
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 80, className = '' }) => {
    return (
        <MainLoader size={size} className={className}>
            <div />
            <div />
        </MainLoader>
    );
};

export default Loader;
