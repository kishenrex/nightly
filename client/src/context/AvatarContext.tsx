import { createContext, useState } from "react";
import { avatarList } from "../styles/Avatars";

interface AvatarContextType {
    avatar: string;
    setAvatar: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: AvatarContextType = {
    avatar: avatarList[0].url,
    setAvatar: () => {},
};

export const AvatarContext = createContext<AvatarContextType>(initialState);

export const AvatarProvider = (props: any) => {
    const [avatar, setAvatar] = useState(initialState.avatar);
       
  return (
    <AvatarContext.Provider
      value={{
        avatar: avatar,
        setAvatar: setAvatar,
      }}
    >
      {props.children}
    </AvatarContext.Provider>
  );
};
