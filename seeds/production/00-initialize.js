/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex("Transaction").del();

  await knex("Account").del();
  await knex("Account").insert([
    {
      id: "Assets",
      description:
        "Everything owned with financial value. This includes cash, savings, investments, and physical possessions, contributing to overall financial worth.",
    },
    {
      id: "Equity",
      description:
        "The residual value in the financial ledger, capturing the difference between assets and liabilities.",
    },
    {
      id: "Expenses",
      description:
        "The costs incurred in daily life, such as bills, groceries, and other necessary outlays.",
    },
    {
      id: "Income",
      description:
        "The money earned from various sources, like work, investments, or side hustles.",
    },
    {
      id: "Liabilities",
      description:
        "Financial obligations and debts. This includes loans, credit card balances, and any amounts owed.",
    },
    {
      id: "Opening Balances",
      parentAccountId: "Equity",
      description: "The starting point for the financial period.",
    },
  ]);

  await knex("Commodity").del();
  await knex("Commodity").insert([
    { id: "USD", decimalFactor: 100, description: "United States dollar" },
  ]);

  await knex("Status").del();
  await knex("Status").insert([
    {
      id: "Cleared",
      description:
        "Transaction has been successfully processed, and funds are securely transferred. The financial operation is complete, and the transaction is considered finalized.",
    },
    {
      id: "Pending",
      description:
        "Transaction is in progress or awaiting further processing. Funds may not have been transferred yet, and additional steps may be required before the transaction is considered complete.",
    },
  ]);

  await knex("Payee").del();
  await knex("Payee").insert([
    {
      id: "Opening Balances",
      description: "The starting point for the financial period.",
    },
  ]);
};
