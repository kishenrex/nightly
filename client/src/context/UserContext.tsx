import { createContext, useState } from "react";

interface UserContextType {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: UserContextType = {
    user: 'testuser@example.com',
    setUser: () => {},
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = (props: any) => {
    const [user, setUser] = useState(initialState.user);
       
  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
