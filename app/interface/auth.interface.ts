import UserInterface from "./user.interface";

export default interface AuthInterface {
  quantityRegistered: number;
  quantityLogged: number;
  loginUser: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  logoutUser: (email: string) => void;
  getUserByEmail: (email: string) => void;
  user: UserInterface | null;
  updateUserByEmail: (email: string) => void;
  name: string;
  setName: (name: string) => void;
  lastname: string;
  setLastname: (lastname: string) => void;
  country: string;
  setCountry: (country: string) => void;
  state: string;
  setState: (state: string) => void;
  address: string;
  setAddress: (address: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  registerUser: () => void;
  role: string;
  changeImage: (email: string) => void;
  image: string;
  setImage: (image: string) => void;
}