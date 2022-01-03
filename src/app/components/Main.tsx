import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from './Loader';
import { ApiService } from '../services/apiService';

const IMAGE_BOX_SIZE = '300px';

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffedf0;
  margin-top: 60px;
`;

const ImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${IMAGE_BOX_SIZE}, 1fr));
  justify-items: center;
  gap: 10px;
  padding: 20px;
  width: 100%;
`;

const ImageWrapper = styled.img`
  object-fit: contain;
  height: ${IMAGE_BOX_SIZE};
  width: ${IMAGE_BOX_SIZE};
  padding: 10px;
  border-radius: 10px;
  box-shadow: 2.1px 0 12.9px -4px rgb(0 0 0 / 3%), 7.1px 0px 43.3px -4px rgb(0 0 0 / 4%), 32px 0px 194px -4px rgb(0 0 0 / 7%);
  
  &:hover {
    border: 1px solid #d7d7d7;
    box-shadow:
            2.5px 0 175.5px rgba(0, 0, 0, 0.114),
            8.5px 0 180.9px rgba(0, 0, 0, 0.127),
            38px 0 365px rgba(0, 0, 0, 0.26)
  ;

  }
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