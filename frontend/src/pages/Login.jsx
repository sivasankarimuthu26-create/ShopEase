import { useState } from "react";
import { useAuth } from "../context/AuthContext";


function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed.");
        return;
      }

      login(data.token, data.user.role);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
           autoComplete="email"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
  type="password"
  value={password}
  onChange={(event) => setPassword(event.target.value)}
  autoComplete="current-password"
  required
/>
        </div>

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;