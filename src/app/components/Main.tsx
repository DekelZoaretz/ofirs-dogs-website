import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from './Loader';
import { ApiService } from '../services/apiService';

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #ffedf0;
  padding: 20px;
`;

const ImageWrapper = styled.img`
  object-fit: contain;
  height: 300px;
  width: 300px;
`;

interface MainProps {
}

const Main: React.FC<MainProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [imagesList, setImagesList] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const { data: { message: breedImagesList } }  = await ApiService.fetchBreedImageList('hound');
            setImagesList(breedImagesList);
            setIsLoading(false);
        })();
    }, []);

    return (
        <MainContainer>
            {isLoading ? <Loader size={250}/> : <ImagesWrapper>{imagesList.map((value) => <ImageWrapper key={value} src={value}/>)}</ImagesWrapper>}
        </MainContainer>
    );
};

export default Main;