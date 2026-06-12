import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import { auth } from "../utils/firebase/firebase-init";
import { UserData } from "../types/DB";

export function useCurrentUser() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserData | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);

      if (user) {
        const userProfile = await downloadOneDoc("users", user.uid);
        setProfile(userProfile || null);
      } else {
        setProfile(null);
      }
    });
  }, []);

  return { authUser, setAuthUser, profile, setProfile };
}
