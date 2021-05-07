import React from 'react';
import { Link } from 'react-router-dom';

const Menu = props => {
  const { user } = props;
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
      {user !== null && (
        <div style={inlineBlock}>
          <p style={name}>{user.name + ' logged in'}</p>
          <button style={padding} onClick={() => {}}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
