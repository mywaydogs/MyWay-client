import { createContext, useContext } from "react";
import AuthService from "../services/auth.service";
import UserStore from "./user.store";

// https://dev.to/cakasuma/using-mobx-hooks-with-multiple-stores-in-react-3dk4

export class RootStore {
  userStore: UserStore;

  constructor() {
    const authService = new AuthService();

    this.userStore = new UserStore(this, authService);
  }
}

export const StoresContext = createContext(new RootStore());
export const useStores = () => useContext(StoresContext);
