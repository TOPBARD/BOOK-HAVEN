import { User } from "./User";

export interface AuthContextProps {
  storeTokenInLs: (token: string) => void;
  signOutUser: () => void;
  isLoggedIn: boolean;
  user?: User;
  token : string
}
