import React from 'react';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: #ffedf0;
`;

const MainTitle = styled.h1`
    font-size: 54px;
    font-weight: bold;
    color: ${(p) => p.theme.color.mainTitle};
`;

const Header: React.FC = () => {

  const { t } = useTranslation();

  return (
    <HeaderContainer>
      <MainTitle>{t('main_title')}</MainTitle>
    </HeaderContainer>
  );
}

export default Header;
