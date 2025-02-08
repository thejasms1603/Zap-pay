"use client"
import { UseBalance } from "@repo/store/UseBalance";
const page = () => {
  const balance = UseBalance();
  return (
    <h1>hi there {balance}</h1>
  )
}

export default page