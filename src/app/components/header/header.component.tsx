import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBreedsThunk } from '../../features/dogs/dogs.slice';
import { fetchCatBreedsThunk } from '../../features/cats/cats.slice';
import { setActiveTab, TabType } from '../../features/ui/ui.slice';
import { BreedSelector } from '../breed-selector/breed-selector.component';
import {
  HeaderContainer,
  MainTitle,
  RightSection,
  TabsContainer,
  TabButton,
} from './header.styled';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.ui.activeTab);

  useEffect(() => {
    dispatch(fetchBreedsThunk());
    dispatch(fetchCatBreedsThunk());
  }, [dispatch]);

  const handleTabChange = (tab: TabType) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <HeaderContainer>
      <MainTitle>
        {activeTab === 'dogs' ? t('main_title_dogs') : t('main_title_cats')}
      </MainTitle>
      
      <RightSection>
        <TabsContainer>
          <TabButton
            isActive={activeTab === 'dogs'}
            onClick={() => handleTabChange('dogs')}
            data-testid="tab-dogs"
          >
            {t('tab_dogs')}
          </TabButton>
          <TabButton
            isActive={activeTab === 'cats'}
            onClick={() => handleTabChange('cats')}
            data-testid="tab-cats"
          >
            {t('tab_cats')}
          </TabButton>
        </TabsContainer>
        
        <BreedSelector />
      </RightSection>
    </HeaderContainer>
  );
};
