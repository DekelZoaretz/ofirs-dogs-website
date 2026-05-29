import styled, { keyframes } from 'styled-components';
import { IMAGE_BOX_SIZE } from './main.constants';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { transform: scale(0.85); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

export const MainContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffa6b5;
  min-height: calc(100vh - 80px);
`;

export const ImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${IMAGE_BOX_SIZE}, 1fr));
  justify-items: center;
  gap: 20px;
  padding: 40px 20px;
  width: 100%;
  max-width: 1400px;
  box-sizing: border-box;
`;

export const ImageWrapper = styled.img`
  object-fit: cover;
  border: 4px solid white;
  width: ${IMAGE_BOX_SIZE};
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow:
    2.1px 0 12.9px -4px rgb(0 0 0 / 3%),
    7.1px 0px 43.3px -4px rgb(0 0 0 / 4%),
    32px 0px 194px -4px rgb(0 0 0 / 7%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(255, 255, 255, 0.3);
  cursor: zoom-in;

  &:hover {
    border-color: #ffb7c3;
    transform: scale(1.05) rotate(2deg);
    box-shadow:
      2.5px 0 175.5px rgba(0, 0, 0, 0.114),
      8.5px 0 180.9px rgba(0, 0, 0, 0.127),
      38px 0 365px rgba(0, 0, 0, 0.26);
  }
`;

export const MessageText = styled.p`
  font-family: 'Amatic SC', cursive;
  font-size: 32px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.25s ease-out;
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 85vh;
  background-color: white;
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${scaleUp} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ff4c6b;
  border: 3px solid white;
  color: white;
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    background-color: #ff2a4f;
    transform: scale(1.1) rotate(90deg);
  }

  &:active {
    transform: scale(0.95);
  }
`;
