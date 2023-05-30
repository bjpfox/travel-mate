import { useAuth } from "../contexts/AuthProvider";
import { Link, Navigate } from "react-router-dom";

const LoginForm = () => {
  const { login, logout, user } = useAuth();
  console.log('useris now', user)
  console.log('login is',login)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    try {
      await login(fields);
    } catch (err) {
      console.error(err);
    }
  };

  // Check this
  console.log('abc', user)
  if (user) {
    console.log('user is:   ', user)
    return <Navigate to={"/Home"} />
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Enter Username" />
      <input type="password" name="password" placeholder="Enter Password" />
      <input type="submit" value="Login" />
    </form>
    Not registered?  <Link to="/signup">Sign up here</Link>
    </>
  );
};

export default LoginForm;
