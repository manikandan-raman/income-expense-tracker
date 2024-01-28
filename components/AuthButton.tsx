"use client";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthButton() {
  const user = true;
  const router = useRouter();

  const signOutUser = async () => {
    // "use server";
    await signOut(auth);
    return router.push("/login");
  };

  useEffect(() => {
    function authStateHandle() {
      return onAuthStateChanged(auth, (user) => {
        console.log("inside");
        console.log(user, auth.currentUser);
        if (!user) {
          // router.push("/login");
        }
      });
    }

    const unsubscribe = authStateHandle();

    () => unsubscribe();
  }, []);

  return user ? (
    <div className="flex items-center gap-4">
      <button
        className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        onClick={signOutUser}
      >
        Logout
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
