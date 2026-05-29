import styled from 'styled-components';

export const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: auto;
`;

export const SelectedValue = styled.div`
  appearance: none;
  padding: 10px 35px 10px 40px;
  font-family: 'Amatic SC', cursive;
  font-size: 24px;
  font-weight: bold;
  color: #ff4c6b;
  background-color: #ffffff;
  border: 2px solid white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  direction: rtl;
  text-align: right;
  user-select: none;
  min-width: 200px;
  display: flex;
  align-items: center;
  position: relative;

  /* Custom dropdown arrow positioned correctly for RTL */
  &::before {
    content: '';
    position: absolute;
    left: 15px;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff4c6b'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 76, 107, 0.15);
  }

  &:focus {
    border-color: #ff4c6b;
  }
`;

export const SearchInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px;
  font-family: inherit;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  direction: rtl;
  text-align: right;

  &:focus {
    border-color: #ff4c6b;
    box-shadow: 0 0 5px rgba(255, 76, 107, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #ff4c6b;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 5px;
`;

export const DropdownOption = styled.div<{ isSelected?: boolean; disabled?: boolean }>`
  padding: 12px 15px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) =>
    props.isSelected ? 'rgba(255, 76, 107, 0.1)' : 'white'};
  color: ${(props) => (props.disabled ? '#999' : '#333')};
  direction: rtl;
  text-align: right;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? 'white' : 'rgba(255, 76, 107, 0.15)'};
  }

  ${(props) =>
    props.isSelected &&
    `
    color: #ff4c6b;
    font-weight: bold;
  `}
`;
