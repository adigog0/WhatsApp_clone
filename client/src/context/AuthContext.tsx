import { createContext, useContext, ReactNode, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type Result<T, E> = readonly [T, null] |  readonly [null , E];

type AsyncFn = (...args: any[]) => Promise<any>;

type RequestWrapperFn = <T extends AsyncFn, E extends Error  = Error>(cb: T, ...props: Parameters<T>) => Promise<Result<ReturnType<T>,E>>

type AuthContextType = {
  requestWrapper: RequestWrapperFn 
}

const AuthContextVal = createContext<AuthContextType>({
  requestWrapper: async <T extends AsyncFn>(cb: T, ...props: Parameters<T>) => {
    const res = await cb(props) as ReturnType<T>;

    return [res, null];
  }
});

export function useAuth() {
  return useContext(AuthContextVal);
}

interface AuthContextProps {
  children: ReactNode;
}

export function AuthContext({ children }: AuthContextProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  async function requestWrapper<T extends AsyncFn, E extends Error = Error>(
    cb: T,
    ...props: Parameters<T>
  ): Promise<Result<ReturnType<T>,E>> {
    try {
      const result = await cb(props) as ReturnType<T>;
      setIsAuthenticated(true);
      return [result, null];
    } catch (e) {
      const err = e as E;
      setIsAuthenticated(false);
      navigate("/sign-in", {
        replace: true,
      });
      return [null , err]
    }
  }

  return (
    <AuthContextVal.Provider value={{requestWrapper}}>
      {isAuthenticated && children }
    </AuthContextVal.Provider>
  );
}
