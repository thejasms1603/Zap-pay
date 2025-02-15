import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json());

app.post("/hdfcwebhook", async (req, res) => {
  const paymentInfo : {token: string, userId: string, amount: string} = {
    // TODO : Add zod validation
    // check if this request actually came from hdfc bank, use a webhook secret here
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  //update balance in db, add txn
  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInfo.userId)
        },
        data: {
          amount: {
            increment: Number(paymentInfo.amount)
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.status(200).json({
      message: "Transaction Completed Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "An error occured while performing the transaction!",
    });
  }
});

//balance
// on ramp transaction
app.listen(3003);