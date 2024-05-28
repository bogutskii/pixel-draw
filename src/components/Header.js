import React from 'react';

export const Header = (props) => {
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    console.log({ email, password });
  };

  return (
    <div>
      <header>
        <h1>Pixel draw</h1>
        <span>You now: {props.username}</span>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Mail" required />
          <input type="password" name="password" placeholder="Password" required />
          <input type="submit" value="Login" />
        </form>
      </header>
    </div>
  );
};
