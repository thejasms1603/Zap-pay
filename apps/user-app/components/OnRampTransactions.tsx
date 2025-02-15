import Card from "@repo/ui/card";

const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title='Recent Transactions'>
        <div className='text-center py-8'>No Recent Transactions</div>
      </Card>
    );
  }
  return (
    <Card title='Recent Transactions'>
      <div className='pt-2'>
        {transactions.map((t, index) => (
          <div key={index} className='flex justify-between'>
            <div>
              <div className='text-sm'>Received INR</div>
              <div>
                {" "}
                {t.time ? t.time.toDateString() : "Invalid Date"}
              </div>
            </div>
            <div className='flex flex-col justify-center text-green-600'>
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OnRampTransactions;