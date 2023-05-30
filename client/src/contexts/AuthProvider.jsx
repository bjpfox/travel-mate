import { createContext, useContext, useState, useEffect } from "react";

// Create a context and call the Context object that gets returned AuthContext
const AuthContext = createContext({});


// Export a function called useAuth, which returns the current value of the Context object
export const useAuth = () => {
  return useContext(AuthContext);
};

// Export a function called AuthProvider, which takes the 'children' object from whatever is passed to it 
export const AuthProvider = ({ children }) => {

  // create a state variable called user, initialise it to null
  const [user, setUser] = useState(false);


  // when component mounts, check if a user is logged in
  // and if so set the current user to the logged in user
  useEffect(() => {
    // Check if current user is logged in
    const loginCheck = async () => {
      console.log("i checked ifuser was logged in")
      const res = await fetch("/api/session");
      const userObject = await res.json();
      if (res.status === 200) {
        setUser(userObject);
        console.log('result was user: ', userObject)
      }
    }
    loginCheck()
  }, []);

  // Create a function called login which logs in current user
  const login = async (fields) => {
    const res = await fetch("/api/session", {
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
    setUser(data);
    console.log('user is logged in: ', data)
  };

  // Create function called logout which Log out current user
  const logout = async () => {
    const res = await fetch("/api/session", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status !== 200) {
      throw {
        status: res.status,
        message: data.message,
      };
    }
    setUser(null);
    console.log('user is logged out: ', data)
  };

  // Return the children, with Authcontext.Provider wrapped around them
  // AuthContext Provider is passed the user, login and logout 
  // so children will have now access to these
  console.log('userobjectis: ', user)
  return (
    <AuthContext.Provider value={{login, logout, user }}>
      {children}
      {/* {console.log('user now:', user) && children} */}
    </AuthContext.Provider>
  );
};
