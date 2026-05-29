import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchImagesThunk, loadMoreImages } from '../../features/dogs/dogsSlice';
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
  const { selectedBreed, visibleImages, status } = useAppSelector(
    (state) => state.dogs,
  );

  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchImagesThunk(selectedBreed));
  }, [selectedBreed, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      if (clientHeight + scrollTop >= scrollHeight - SCROLL_THRESHOLD) {
        dispatch(loadMoreImages());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

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

      {status === 'failed' && <MessageText>{t('error_loading')}</MessageText>}

      {status === 'succeeded' && (
        <ImagesWrapper>
          {visibleImages.map((srcUrl) => (
            <ImageWrapper
              key={srcUrl}
              src={srcUrl}
              alt="Cute doggy"
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
            <ModalImage src={activeModalImage} alt="Doggy zoomed" />
          </ModalContent>
        </ModalBackdrop>
      )}
    </MainContainer>
  );
};
