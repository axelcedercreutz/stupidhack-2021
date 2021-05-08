import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import MenuButton from '../components/MenuButton';
import useStore from '../store';

const Menu = () => {
  const { setUserId, setUserInfo, isLoggedIn } = useStore(state => state);

  const [isOpen, toggleIsOpen] = useState(false);

  const handleLogout = () => {
    window.localStorage.clear();
    setUserId(undefined);
    setUserInfo(undefined);
  };

  return (
    <Navbar isOpen={isOpen}>
      <Image src={process.env.PUBLIC + 'assets/nocccoin-logo.svg'} />

      <Spacer />

      <MenuButton show={isOpen} toggleShow={toggleIsOpen} />

      <MenuList isOpen={isOpen}>
        <MenuListWrapper>
          <MenuItem to="/">Home</MenuItem>

          <MenuItem to="/photo-gallery">Photo Gallery</MenuItem>

          <MenuItem to="/mine">Start Mining</MenuItem>
        </MenuListWrapper>
      </MenuList>
    </Navbar>
  );
};

const Navbar = styled.nav`
  position: fixed;
  display: flex;
  flex-flow: row nowrap;
  width: 100vw;
  padding: 1rem;
  z-index: 10;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  &:before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    transform: scaleY(${p => (p.isOpen ? '1' : '0')});
    transform-origin: center top;
    z-index: -1;
    transition: transform 800ms ease-in-out;
    pointer-events: ${p => (p.isOpen ? 'auto' : 'none')};
    overflow: hidden;
  }
`;

const Spacer = styled.div`
  flex: 1;
  height: 100%;
`;

const Image = styled.img`
  max-width: 200px;
`;

const MenuList = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: auto;
  padding: 0.2rem;

  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: ${p => (p.isOpen ? 1 : 0)};
  transform: translateY(${p => (p.isOpen ? 0 : 4)}rem);
  transition: transform 800ms ease-in-out, opacity 300ms ease-in-out;
  transition-delay: ${p => (p.isOpen ? 200 : 0)}ms;
  pointer-events: ${p => (p.isOpen ? 'auto' : 'none')};
  z-index: -1;
`;

const MenuListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const MenuItem = styled(Link)`
  margin-bottom: 0.5rem;
  padding: 1rem;
`;

export default Menu;
