import React from 'react';

export const Header = (props) => {
  return (
    <div>
      <header>
        <h1>Pixel draw</h1>
        <span>You now: {props.username}</span>
        <form method="POST" action="">
          <input type="mail" placeholder="Mail" />
          <input type="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </header>
    </div>
  );
};
