import styled from 'styled-components';

export const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

export const StyledSelect = styled.select`
  appearance: none;
  padding: 10px 20px 10px 40px;
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

  /* Custom dropdown arrow positioned correctly for RTL */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff4c6b'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: left 15px center;
  background-size: 20px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 76, 107, 0.15);
  }

  &:focus {
    border-color: #ff4c6b;
  }
`;
