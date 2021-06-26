// @flow
import React from 'react';

export const Header = () => {
  return (
    <div>
      <header>
        <h1>Pixel draw</h1>
        <form method="POST" action="">
          <input type="mail" placeholder="Mail" />
          <input type="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </header>
    </div>
  );
};
