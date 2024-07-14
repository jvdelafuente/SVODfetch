import { useState } from 'react';

import '../styles/login.css'


export default function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here (e.g., API call, authentication)
    console.log('Login attempt with email:', email, 'and password:', password);
  };
  return (
    <div className="login-img-bg">
      <div className="login-container">
        <div className="login-form-container">

    <form className="login-form-card" onSubmit={handleSubmit}>
      <label htmlFor="email">E-mail:</label>
      <input
      className='login-form-input'
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
      className='login-form-input'
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <a href="/home"><button type="submit">Sign in</button></a>
      <p> Simulate login and view the page by clicking  <a href="/home">here</a>.</p>
      </form>
        </div>
        <div className="login-title-container">
        <h1>Must-watch </h1> <h1>entertainment for <span>everyone</span>.</h1>
        </div>
      </div>
    </div>
  )
}
