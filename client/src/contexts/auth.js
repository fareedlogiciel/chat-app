import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { getUser, signIn as sendSignInRequest } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("state", state);

  // useEffect(() => {
  //   (async function () {
  //     const result = await getUser();
  //     if (result.isOk) {
  //       setUser(result.data);
  //     }
  //     setLoading(false);
  //   })();
  // }, []);

  const signIn = useCallback(async (data) => {
    try {
      const result = await sendSignInRequest(data);
      if (result?.isOk) {
        setUser(result?.data);
      }
      return result;
    } catch (err) {
      setUser({});
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, loading }}
      {...props}
    />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
