import React from 'react';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';

type ChipType = {
  label: string;
  select?: boolean;
  onPress: () => void;
};

export default function Chip(props: ChipType) {
  const {label, select, onPress} = props;
  return (
    <StyledChip select={select || false} onPress={onPress}>
      <StyledChipText select={select || false}>{label}</StyledChipText>
    </StyledChip>
  );
}

type StyledChipType = {
  select: boolean;
};

const StyledChip = styled.TouchableOpacity<StyledChipType>`
  width: 164px;
  height: 48px;

  border-radius: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${props =>
    props.select ? palette.awesome : palette.white};

  border: ${props => (props.select ? 0 : `1px solid ${palette.nero}`)};
`;

const StyledChipText = styled.Text<StyledChipType>`
  font-size: 16px;
  color: ${props => (props.select ? palette.white : '#000')};
`;
