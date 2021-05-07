import React from 'react';
import { Link } from 'react-router-dom';

const Menu = props => {
  const { userInfo, handleLogout } = props;
  const padding = {
    paddingRight: 5,
  };
  const name = {
    paddingRight: 4,
    display: 'inline-block',
  };
  const inlineBlock = {
    display: 'inline-block',
  };
  const gray = {
    backgroundColor: 'lightgray',
    paddingLeft: 8,
  };

  return (
    <div style={gray}>
      <Link style={padding} to="/">
        Home
      </Link>
      <Link style={padding} to="/photo-gallery">
        Photo gallery
      </Link>
      <Link style={padding} to="/mine">
        Start Mining
      </Link>
      {userInfo && (
        <div style={inlineBlock}>
          <p style={name}>{userInfo.username + ' logged in'}</p>
          <button style={padding} onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
