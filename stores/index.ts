import { createContext, useContext } from "react";
import AuthService from "../services/auth.service";
import CustomersService from "../services/customers.service";
import DogsService from "../services/dogs.service";
import TrainersService from "../services/trainers.service";
import CustomersStore from "./customers.store";
import DogsStore from "./dogs.store";
import TrainersStore from "./trainers.store";
import UserStore from "./user.store";

// https://dev.to/cakasuma/using-mobx-hooks-with-multiple-stores-in-react-3dk4

export class RootStore {
  userStore: UserStore;
  dogsStore: DogsStore;
  trainersStore: TrainersStore;
  customersStore: CustomersStore;

  constructor() {
    const authService = new AuthService();
    const dogsService = new DogsService();
    const trainersService = new TrainersService();
    const customersService = new CustomersService();

    this.userStore = new UserStore(this, authService);
    this.dogsStore = new DogsStore(this, dogsService);
    this.trainersStore = new TrainersStore(this, trainersService);
    this.customersStore = new CustomersStore(this, customersService);
  }
}

export const StoresContext = createContext(new RootStore());
export const useStores = () => useContext(StoresContext);
