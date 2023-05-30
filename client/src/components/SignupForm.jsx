import { useAuth } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";

const SignupForm = () => {
  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    try {
      await login(fields);
    } catch (err) {
      console.error(err);
    }
  };

  if (user) {
    return <Navigate to={"/home"} />
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Enter Username" />
      <input type="password" name="password" placeholder="Enter Password" />
      <input type="submit" value="Login" />
    </form>
    Not registered? Sign up here
    </>
  );
};

export default SignupForm;
