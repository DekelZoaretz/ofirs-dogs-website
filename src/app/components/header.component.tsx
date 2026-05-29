import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../hooks';
import { fetchBreedsThunk } from '../features/dogs/dogsSlice';
import { BreedSelector } from './breed-selector.component';
import { HeaderContainer, MainTitle } from './header.styled';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBreedsThunk());
  }, [dispatch]);

  return (
    <HeaderContainer>
      <MainTitle>{t('main_title')}</MainTitle>
      <BreedSelector />
    </HeaderContainer>
  );
};
