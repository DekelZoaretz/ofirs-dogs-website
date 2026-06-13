import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffb7c3;
  padding: 10px 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  z-index: 100;
  box-sizing: border-box;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 15px 20px;
    gap: 15px;
  }
`;

export const MainTitle = styled.h1`
  font-size: 44px;
  font-weight: bold;
  color: ${(p) => p.theme.color.mainTitle};
  margin: 0;
  white-space: nowrap;
  
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 900px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 4px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  padding: 8px 24px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 26px;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.isActive ? '#ffffff' : 'transparent')};
  color: ${(p) => (p.isActive ? '#ff4c6b' : '#ffffff')};
  box-shadow: ${(p) => (p.isActive ? '0 4px 10px rgba(255, 76, 107, 0.15)' : 'none')};
  text-shadow: ${(p) => (p.isActive ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.1)')};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  outline: none;

  &:hover {
    color: ${(p) => (p.isActive ? '#ff4c6b' : '#ffe0e6')};
    background: ${(p) => (p.isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.1)')};
  }

  @media (max-width: 600px) {
    flex: 1;
    text-align: center;
    padding: 8px 12px;
  }
`;
