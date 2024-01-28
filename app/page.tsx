import { TransactionList } from "@/components/TransactionList";
import AuthButton from "../components/AuthButton";
import { redirect } from "next/navigation";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import Link from "next/link";

type SearchParamProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Index({ searchParams }: SearchParamProps) {
  type Transaction = {
    id: string;
    date: string;
    category: string;
    amount: number;
  };
  const incomeData: Transaction[] = [
    {
      id: "1",
      date: "Jan 01, 2024",
      category: "Salary",
      amount: 1000,
    },
    {
      id: "2",
      date: "Jan 02, 2024",
      category: "Rent",
      amount: 1000,
    },
  ];

  const expenseData: Transaction[] = [
    {
      id: "1",
      date: "Jan 01, 2024",
      category: "Fuel",
      amount: 500,
    },
    {
      id: "2",
      date: "Jan 02, 2024",
      category: "Movie",
      amount: 300,
    },
  ];

  const show = searchParams?.show;

  return (
    <div className="flex-1 w-full flex flex-col gap-20">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full px-32 flex justify-between items-center">
          <h3 className="text-xl">Income & Expense Tracker</h3>
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in px-32">
        <main>
          {!show ? (
            <>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-3xl">Hi, Manikandan Raman</h1>
                  <p className="mt-2 text-lg">
                    Look at your current month data below
                  </p>
                </div>
                <Link
                  href="/?show=true"
                  className="bg-green-700 p-3 h-fit rounded-md"
                >
                  + Add Transction
                </Link>
              </div>
              <div className="flex justify-between items-center">
                <select
                  className="bg-black border border-solid border-white p-2 mt-8 rounded-md"
                  name="month"
                  id="month"
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                </select>
                <p className="text-lg">Balance left: Rs. 1200/-</p>
              </div>
              <div className="flex justify-between items-center gap-4">
                <TransactionList
                  title="Income"
                  transactions={incomeData}
                  total={2000}
                />
                <TransactionList
                  title="Expense"
                  transactions={expenseData}
                  total={1200}
                />
              </div>
            </>
          ) : (
            <AddTransactionModal />
          )}
        </main>
      </div>
    </div>
  );
}
