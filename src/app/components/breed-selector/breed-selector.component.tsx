import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedBreed } from '../../features/dogs/dogs.slice';
import { SelectorWrapper, StyledSelect } from './breed-selector.styled';

export const BreedSelector: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { breeds, selectedBreed } = useAppSelector((state) => state.dogs);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedBreed(event.target.value));
  };

  return (
    <SelectorWrapper>
      <StyledSelect value={selectedBreed} onChange={handleChange}>
        <option value="all">{t('all_breeds')}</option>
        {breeds.map((breed) => (
          <option key={breed.value} value={breed.value}>
            {t(breed.value, breed.label)}
          </option>
        ))}
      </StyledSelect>
    </SelectorWrapper>
  );
};
