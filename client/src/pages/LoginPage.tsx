import React, { useState } from 'react';

function LoginPage(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    // Simulate authentication
    if (username === 'user' && password === 'password') {
      alert('Login successful!');
      // Redirect to the main app or perform other actions
    } else {
      alert('Invalid username or password.');
    }
  };

return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e)   => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;