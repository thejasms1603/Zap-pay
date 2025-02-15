"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import TextInput from "@repo/ui/TextInput";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col border border-slate-500 shadow-md w-96 h-96 p-4'>
        <div className='flex flex-col w-full  py-3 space-y-4'>
          <TextInput
            placeholder='Enter your Number'
            label='Number'
            onChange={(value) => setUsername(value)}
          />
          <TextInput
            placeholder='Enter your password'
            label='Password'
            onChange={(value) => setPassword(value)}
          />
        </div>

        <button
          className='p-2 m-2 bg-red-500 text-white rounded-lg'
          onClick={async () => {
            await signIn("google");
          }}
        >
          Login With Google
        </button>

        <button
          className='p-2 m-2 bg-gray-800 text-white rounded-lg'
          onClick={async () => {
            await signIn("github");
          }}
        >
          Login With GitHub
        </button>

        <button
          className='p-2 m-2 bg-blue-500 text-white rounded-lg'
          onClick={async () => {
            const res = await signIn("credentials", {
              username,
              password,
              redirect: false,
            });

            if (res?.error) {
              console.error("Login failed:", res.error);
              return;
            }

            router.push("/");
          }}
        >
          Login With Email
        </button>
      </div>
    </div>
  );
};

export default SignIn;
