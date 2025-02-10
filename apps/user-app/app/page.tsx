"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Appbar from "@repo/ui/Appbar";

function Page(): JSX.Element {
  const { data: session } = useSession();

  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session?.user} />
    </div>
  );
}

export default Page;
