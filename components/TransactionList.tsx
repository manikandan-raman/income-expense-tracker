import React from "react";

type Props = {
  title: string;
  transactions: {
    id: string;
    date: string;
    category: string;
    amount: number;
  }[];
  total: number;
};

export const TransactionList = ({ title, transactions, total }: Props) => {
  return (
    <div className="flex flex-col justify-between w-[50%] mt-8">
      <p className="text-lg">{title}</p>
      <div className="mt-2 flex justify-between items-center p-8 gap-16 border border-solid border-white">
        <p className="basis-1/3">Date</p>
        <p className="basis-1/3">Category</p>
        <p className="basis-1/3">Amount</p>
      </div>
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex justify-between items-center p-8 gap-16 border border-solid border-white"
        >
          <p className="basis-1/3">{transaction.date}</p>
          <p className="basis-1/3">{transaction.category}</p>
          <p className="basis-1/3">Rs. {transaction.amount}/-</p>
        </div>
      ))}
      <p className="mt-2 text-lg">
        Total {title}: Rs. {total}/-
      </p>
    </div>
  );
};
