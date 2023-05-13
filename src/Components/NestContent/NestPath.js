import React from 'react';
  
import styled from "styled-components";

const PathContainer = styled.div`
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const PathItem = styled.span`
  color: #333333;
  &:not(:last-child)::after {
    content: ">";
    margin: 0 5px;
  }
`;

export const NestPath = (props) => {
  return (
    <PathContainer>
      {props.path.map((item, index) => (
        <PathItem key={index}>{item}</PathItem>
      ))}
    </PathContainer>
  );
};