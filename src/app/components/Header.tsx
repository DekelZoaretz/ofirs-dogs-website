import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../hooks";
import { fetchBreedsThunk } from "../features/dogs/dogsSlice";
import BreedSelector from "./BreedSelector";

const HeaderContainer = styled.div`
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

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 15px 20px;
    gap: 10px;
  }
`;

const MainTitle = styled.h1`
  font-size: 54px;
  font-weight: bold;
  color: ${(p) => p.theme.color.mainTitle};
  margin: 0;
  white-space: nowrap;
`;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBreedsThunk());
  }, [dispatch]);

  return (
    <HeaderContainer>
      <MainTitle>{t("main_title")}</MainTitle>
      <BreedSelector />
    </HeaderContainer>
  );
};

export default Header;
