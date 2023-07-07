import { useAuth } from "../contexts/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react"

const SignupForm = () => {
  const { user } = useAuth();

  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState(null)

  // Function to register the user
  const register = async (fields) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    if (res.status !== 200) {
      throw {
        status: res.status,
        message: data.message,
      };
    }
    return navigate("/")
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));

    if (fields['password'] !== fields['password-confirm']) {
      setErrorMessage('Error - passwords do not match')
    } else {
      setErrorMessage(null)
      try {
        await register(fields);
      } catch (err) {
        console.error(err);
      }
    }
    }


  if (user) {
    return <Navigate to={"/home"} />
  }


  return (
    <>
    {errorMessage}
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Enter Username" />
      <input type="password" name="password" placeholder="Enter Password" />
      <input type="password" name="password-confirm" placeholder="Confirm Password" />
      <input type="submit" value="Register" />
    </form>
    </>
  );
};

export default SignupForm;
