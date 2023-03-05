import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function signOutUser() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}
