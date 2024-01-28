"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuid } from "uuid";

type Props = {};

export const AddTransactionModal = (props: Props) => {
  const schema = yup.object({
    type: yup.string().required("Please select transaction type"),
    amount: yup.string().required("Please enter amount"),
    date: yup.string().required("Please select date"),
    time: yup.string().required("Please select time"),
  });
  type AddTransactionSchema = yup.InferType<typeof schema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTransactionSchema>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: AddTransactionSchema) => {
    console.log(data);
    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({ ...data, user_id: uuid() }),
    });
    reset();
    const json = await res.json();
    console.log(json);
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-4 ">
      <h1 className="text-2xl">Add Transaction</h1>
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row justify-between flex-wrap w-full mt-2"
      >
        <div className="basis-1/2 mt-4">
          <label htmlFor="transaction_type">Select transaction type</label>
          <select
            className="block bg-background border border-solid border-white w-11/12 rounded-md p-3"
            id="transaction_type"
            {...register("type", { required: true })}
          >
            <option value="">Select</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <p className="mt-2 text-red-400">{errors.type?.message}</p>
        </div>
        <div className="basis-1/2 mt-4">
          <label htmlFor="amount">Amount</label>
          <input
            className="block bg-background border border-solid border-white w-11/12 rounded-md p-3"
            type="text"
            id="amount"
            placeholder="1000"
            {...register("amount", { required: true })}
          />
          <p className="mt-2 text-red-400">{errors.amount?.message}</p>
        </div>
        <div className="basis-1/2 mt-4">
          <label htmlFor="date">Date</label>
          <input
            className="block bg-background border border-solid border-white w-11/12 rounded-md p-3"
            type="date"
            id="date"
            placeholder="01/01/2024"
            {...register("date", { required: true })}
          />
          <p className="mt-2 text-red-400">{errors.date?.message}</p>
        </div>
        <div className="basis-1/2 mt-4">
          <label htmlFor="time">Time</label>
          <input
            className="block bg-background border border-solid border-white w-11/12 rounded-md p-3"
            type="time"
            id="time"
            placeholder="02:00"
            {...register("time", { required: true })}
          />
          <p className="mt-2 text-red-400">{errors.time?.message}</p>
        </div>
        <button
          className="bg-green-700 p-3 rounded-md mt-8 w-1/4 mx-auto"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
