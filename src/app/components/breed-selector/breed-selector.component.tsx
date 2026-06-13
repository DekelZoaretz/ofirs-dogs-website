import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedBreed } from '../../features/dogs/dogs.slice';
import { setSelectedCatBreed } from '../../features/cats/cats.slice';
import {
  SelectorWrapper,
  SearchInput,
  DropdownContainer,
  DropdownMenu,
  DropdownOption,
  SelectedValue,
  ClearButton,
} from './breed-selector.styled';

export const BreedSelector: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  
  const { breeds: dogBreeds, selectedBreed: selectedDogBreed } = useAppSelector(
    (state) => state.dogs,
  );
  const { breeds: catBreeds, selectedBreed: selectedCatBreed } = useAppSelector(
    (state) => state.cats,
  );

  const breeds = activeTab === 'dogs' ? dogBreeds : catBreeds;
  const selectedBreed = activeTab === 'dogs' ? selectedDogBreed : selectedCatBreed;

  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allOptions = [
    { value: 'all', label: activeTab === 'dogs' ? t('all_breeds_dogs') : t('all_breeds_cats') },
    ...breeds.map((breed) => ({
      value: breed.value,
      label: t(breed.value, breed.label),
    })),
  ];

  const filteredOptions = allOptions.filter((option) =>
    option.label.toLowerCase().includes(searchInput.toLowerCase())
  );

  const selectedLabel =
    allOptions.find((option) => option.value === selectedBreed)?.label || '';

  const handleSelect = (value: string) => {
    if (activeTab === 'dogs') {
      dispatch(setSelectedBreed(value));
    } else {
      dispatch(setSelectedCatBreed(value));
    }
    setIsOpen(false);
    setSearchInput('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchInput('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchInput('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectorWrapper>
      <DropdownContainer ref={dropdownRef}>
        <SelectedValue onClick={() => setIsOpen(!isOpen)} data-testid="breed-selector-toggle">
          {selectedLabel}
        </SelectedValue>
        {isOpen && (
          <>
            <SearchInput
              type="text"
              placeholder={activeTab === 'dogs' ? t('select_breed_dogs') : t('select_breed_cats')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              autoFocus
              data-testid="breed-search-input"
            />
            {searchInput && (
              <ClearButton onClick={handleClear} data-testid="breed-search-clear">✕</ClearButton>
            )}
            <DropdownMenu data-testid="breed-dropdown-menu">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <DropdownOption
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    isSelected={option.value === selectedBreed}
                    data-testid={`breed-option-${option.value}`}
                  >
                    {option.label}
                  </DropdownOption>
                ))
              ) : (
                <DropdownOption disabled data-testid="breed-no-results">
                  {t('no_results') || 'No results found'}
                </DropdownOption>
              )}
            </DropdownMenu>
          </>
        )}
      </DropdownContainer>
    </SelectorWrapper>
  );
};
