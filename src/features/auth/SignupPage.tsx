import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sessionStorage.setItem('shopwise_user', JSON.stringify({ name, email }));
    window.dispatchEvent(new Event('shopwise-auth-change'));
    setSignedUp(true);
  };

  if (signedUp) {
    return (
      <section className="auth-page" role="status">
        <h1>Signup successful</h1>
        <p>Welcome, <strong>{name}</strong>!</p>
        <Link className="btn" to="/cart">Continue to cart</Link>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <h1>Create account</h1>
      <form className="form" onSubmit={submit}>
        <label htmlFor="signup-name">Full name</label>
        <input id="signup-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />

        <label htmlFor="signup-email">Email</label>
        <input id="signup-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

        <label htmlFor="signup-password">Password</label>
        <input id="signup-password" type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required />

        <button className="btn" type="submit">Sign up</button>
      </form>
    </section>
  );
}
