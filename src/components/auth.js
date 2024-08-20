import { auth , googleProvider} from "../service/firebase";
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import logo from '../components/web_light_rd_SI.svg'

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.email);
    console.log(auth?.currentUser?.photoURL);
  const signInWithGoogle = async () => {
    try {
    await signInWithPopup(auth,googleProvider);
    } catch (err){
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
    await signOut(auth);
    } catch (err){
      console.error(err);
    }
  };
  return (
    <div>
      <img src={logo} onClick={signInWithGoogle} />
    </div>
  );
};