import React from 'react';
import styled from 'styled-components';

const MenuButton = ({ show, toggleShow }) => (
  <Wrapper onClick={() => toggleShow(x => !x)}>
    <Line show={show} />
    <Line show={show} />
    <Line show={show} />
    <Line show={show} />
  </Wrapper>
);

const Wrapper = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1.5rem;
  height: 1rem;
  padding: 0;
  background-color: transparent;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 0.12rem;
  border-radius: 999px;
  background-color: grey;
  transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.15);

  &:nth-of-type(1) {
    top: 0;
    ${p => p.show && `transform: translateY(0.5rem);`}
    opacity: ${p => (p.show ? 0 : 1)};
  }

  &:nth-of-type(2) {
    top: 50%;
    ${p => p.show && `transform: rotate(-45deg);`};
  }

  &:nth-of-type(3) {
    top: 50%;
    ${p => p.show && `transform: rotate(45deg);`};
  }

  &:nth-of-type(4) {
    top: 100%;
    ${p => p.show && `transform: translateY(-0.5rem);`};
    opacity: ${p => (p.show ? 0 : 1)};
  }
`;

export default MenuButton;
