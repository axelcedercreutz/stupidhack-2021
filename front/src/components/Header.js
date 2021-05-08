import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

import MenuButton from '../components/MenuButton';
import useStore from '../store';

const Menu = () => {
  const { setUserId, setUserInfo, userInfo, isLoggedIn } = useStore(
    state => state,
  );

  const history = useHistory();

  const [isOpen, toggleIsOpen] = useState(false);

  const handleLogout = () => {
    window.localStorage.clear();
    setUserId(undefined);
    setUserInfo(undefined);
  };

  const navigate = to => {
    history.push(to);
    toggleIsOpen(false);
  };

  return (
    <Navbar isOpen={isOpen}>
      <Image
        src={process.env.PUBLIC_URL + '/assets/nocccoin-logo.svg'}
        onClick={() => navigate('/')}
      />

      <Spacer />

      {!!userInfo && (
        <>
          <Coins>
            <Icon icon={faCoins} />

            <Typography variant="body2">{userInfo?.nocccoins || 0}</Typography>
          </Coins>
          <Typography variant="body2" style={{ marginRight: 16 }}>
            {userInfo?.username}
          </Typography>
        </>
      )}

      <MenuButton show={isOpen} toggleShow={toggleIsOpen} />

      <MenuList isOpen={isOpen}>
        <MenuListWrapper>
          <MenuItem variant="body1" onClick={() => navigate('/mine')}>
            Start Mining
          </MenuItem>

          <MenuItem variant="body1" onClick={() => navigate('/photo-gallery')}>
            Noccchain
          </MenuItem>

          {isLoggedIn() ? (
            <>
              <MenuItem variant="body1" onClick={() => navigate('/')}>
                Profile
              </MenuItem>

              <MenuItem variant="body1" onClick={() => navigate('/mine')}>
                Mine
              </MenuItem>

              <Hr />

              <MenuItem variant="body1" onClick={() => handleLogout()}>
                Log out
              </MenuItem>
            </>
          ) : (
            <>
              <Hr />

              <MenuItem variant="body1" onClick={() => navigate('/login')}>
                Log in
              </MenuItem>

              <MenuItem variant="body1" onClick={() => navigate('/register')}>
                Register
              </MenuItem>
            </>
          )}
        </MenuListWrapper>
      </MenuList>
    </Navbar>
  );
};

const Navbar = styled.nav`
  position: fixed;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100vw;
  padding: 0.8rem 1rem;
  z-index: 10;
  background-color: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

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
  width: 150px;
  max-width: 30vw;
`;

const Hr = styled.div`
  width: 100%;
  max-width: 100px;
  height: 1px;
  background-color: lightgrey;
  margin: 2rem auto;
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

const MenuItem = styled(Typography)`
  text-decoration: none;
  margin-bottom: 0.5rem;
  padding: 1rem;
  cursor: pointer;

  transition: 0.1s opacity;

  :hover {
    opacity: 0.6;
  }
`;

const Coins = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-right: 1rem;
  color: #555;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

export default Menu;
