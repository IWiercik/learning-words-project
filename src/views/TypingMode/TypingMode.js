import React, { useContext } from 'react';
import { Title } from 'components/atoms/Title/Title';
import FieldWithInput from 'components/molecules/FieldWithInput/FieldWithInput';
import styled from 'styled-components';
import { Button } from 'components/atoms/Button/Button';
import { AddData } from 'configFirebase/firebase';
import { appContext } from 'providers/Providers';
import { useState } from 'react';
import { alertForEmptyInput } from 'helpers/sweetAlert';
import { BasicContainer } from 'components/molecules/BasicContainer/BasicContainer.style';
import { useSelector } from 'react-redux';

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
`;
const ButtonContainer = styled.div`
  align-self: center;
`;
const TypingMode = () => {
  const wordsDataLength = useSelector((state) => state.wordsDataSlice.engWords).length; // used to get the id of new item
  const initialState = { engWord: '', plWord: '' };
  const [words, setWords] = useState(initialState);
  const ctx = useContext(appContext);

  return (
    <BasicContainer>
      <Wrapper>
        <Title>Typing Mode</Title>
        <FieldWithInput updateValuesMethod={setWords} name="engWord" words={words} textContent="English Word:"></FieldWithInput>
        <FieldWithInput updateValuesMethod={setWords} name="plWord" words={words} textContent="Polish Word:"></FieldWithInput>
        <ButtonContainer>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (words.engWord.length === 0 || words.plWord.length === 0) {
                alertForEmptyInput();
              } else {
                const userEmail = ctx.currentUser.email;
                AddData(userEmail, words, wordsDataLength);
                setWords(initialState);
              }
            }}
          >
            ADD
          </Button>
        </ButtonContainer>
      </Wrapper>
    </BasicContainer>
  );
};
export default TypingMode;
