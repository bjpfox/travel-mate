import { useAuth } from "../contexts/AuthProvider";

const Logout = () => {
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    try {
      await logout(fields);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="logout-btn" type="submit" value="Logout" />
    </form>
  );
};

export default Logout;
