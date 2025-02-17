"use client";
import React, { useState } from "react";
import Center from "@repo/ui/Center";
import Card from "@repo/ui/card";
import TextInput from "@repo/ui/TextInput";
import { Button } from "@repo/ui/button";
import {p2pTransfer} from "../app/lib/actions/p2pTransfer"
const SendCard = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <div className='h-[90vh]'>
      <Center>
        <Card title='Send'>
          <div className='min-w-72 pt-2'>
            <TextInput
              placeholder={"Number"}
              label='Number'
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label='Amount'
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className='pt-4 flex justify-center'>
              <Button onClick={async () => {
                await p2pTransfer(Number(amount) * 100, number);
              }}>Send</Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};

export default SendCard;
