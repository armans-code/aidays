"use client";
import { useAuth } from "@clerk/nextjs";
import React from "react";

function SignOut() {
  const { signOut } = useAuth();
  return (
    // TODO: fix styling
    <p onClick={() => signOut()} className="cursor-pointer underline">
      Sign out
    </p>
  );
}

export default SignOut;
