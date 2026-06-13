import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchImagesThunk, loadMoreImages } from '../../features/dogs/dogs.slice';
import { fetchCatImagesThunk, loadMoreCatImages } from '../../features/cats/cats.slice';
import { Loader } from '../loader/loader.component';
import {
  MainContainer,
  ImagesWrapper,
  ImageWrapper,
  MessageText,
  ModalBackdrop,
  ModalContent,
  ModalImage,
  CloseButton,
} from './main.styled';
import { SCROLL_THRESHOLD } from './main.constants';

export const Main: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  
  const dogState = useAppSelector((state) => state.dogs);
  const catState = useAppSelector((state) => state.cats);

  const { visibleImages, status } =
    activeTab === 'dogs' ? dogState : catState;

  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'dogs') {
      dispatch(fetchImagesThunk(dogState.selectedBreed));
    } else {
      dispatch(fetchCatImagesThunk(catState.selectedBreed));
    }
  }, [activeTab, dogState.selectedBreed, catState.selectedBreed, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      if (clientHeight + scrollTop >= scrollHeight - SCROLL_THRESHOLD) {
        if (activeTab === 'dogs') {
          dispatch(loadMoreImages());
        } else {
          dispatch(loadMoreCatImages());
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, activeTab]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModalImage(null);
      }
    };

    if (activeModalImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalImage]);

  const handleImageClick = (srcUrl: string) => {
    setActiveModalImage(srcUrl);
  };

  const handleBackdropClick = () => {
    setActiveModalImage(null);
  };

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCloseClick = () => {
    setActiveModalImage(null);
  };

  return (
    <MainContainer>
      {status === 'loading' && <Loader size={250} />}

      {status === 'failed' && (
        <MessageText>
          {activeTab === 'dogs' ? t('error_loading_dogs') : t('error_loading_cats')}
        </MessageText>
      )}

      {status === 'succeeded' && (
        <ImagesWrapper>
          {visibleImages.map((srcUrl) => (
            <ImageWrapper
              key={srcUrl}
              src={srcUrl}
              alt={activeTab === 'dogs' ? 'Cute doggy' : 'Cute kitty'}
              loading="lazy"
              onClick={() => handleImageClick(srcUrl)}
            />
          ))}
        </ImagesWrapper>
      )}

      {activeModalImage && (
        <ModalBackdrop onClick={handleBackdropClick}>
          <ModalContent onClick={handleModalContentClick}>
            <CloseButton onClick={handleCloseClick}>✕</CloseButton>
            <ModalImage
              src={activeModalImage}
              alt={activeTab === 'dogs' ? 'Doggy zoomed' : 'Kitty zoomed'}
            />
          </ModalContent>
        </ModalBackdrop>
      )}
    </MainContainer>
  );
};
