import { auth , googleProvider} from "../service/firebase";
import {signInWithPopup, signOut } from "firebase/auth";
import logo from '../components/web_light_rd_SI.svg'

export const Auth = () => {
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
      <img className='transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg' src={logo} alt="sign-in" onClick={signInWithGoogle} />
    </div>
  );
};