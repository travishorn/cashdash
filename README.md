# CashDash

A personal finance bookkeeping tool.

## Installation

You must have [git](https://git-scm.com/) and [Node.js](https://nodejs.org)
installed.

Open up a terminal and clone this repository.

```sh
git clone https://github.com/travishorn/cashdash
```

Change into the newly created directory.

```sh
cd cashdash
```

Install the dependencies.

```sh
npm install
```

By default, commands will be run in development mode. You'll probably want to
switch to production first.

```sh
# On Linux
export NODE_ENV=production

# On Windows (PowerShell)
$env:NODE_ENV = "production"
```

Migrate the database. This creates the database structure.

```sh
npm run migrate
```

Seed the database. This inserts the necessary built-in data into the database.

```sh
npm run seed
```

**Warning:** this also resets the database. If you have entered any data
previously, it will be deleted when you run that command.

## Usage

Start the web server.

```sh
npm run dev
```

Now go to http://localhost:5173 to see the web UI.

## Data Entry

This project is in very early development. There is a rudimentary web UI but
mainly you will have to use this project with a SQLite library or some external
database management software that can interface with SQLite.

### Defining accounts

All transactions must have a "from" account and a "to" account to describe the
movement of commodities. You must define any account you want to use first.
These can be real accounts held with financial institutions or virtual accounts
you use to categorize expenses.

```sql
INSERT INTO Account (id, parentAccountId, description)
VALUES ('Checking', 'Assets', 'My primary account for managing liquid funds and day-to-day financial transactions.')
```

`id` can be anything you want and should concisely describe the account. For
example, `Checking` for your primary checking account, `Groceries` for an
expense account you would use any time you spend money on groceries, or `Car
Loan` for a liability account where you owe borrowed money for your car.

`parentAccountId` is the `id` of a parent account to place this account under.
For example, `Assets` for a `Checking` account, `Expenses` for a `Groceries`
expense account, or `Liabilities` for a `Car Loan` liability account.

Some built-in top-level accounts are included by default. You should assign one
of these as a parent for each of your accounts. Built-in top-level accounts
include:

- `Assets`: Everything owned with financial value. This includes cash, savings,
  investments, and physical possessions, contributing to overall financial
  worth.
- `Equity`: The residual value in the financial ledger, capturing the difference
  between assets and liabilities.
- `Expenses`: The costs incurred in daily life, such as bills, groceries, and
  other necessary outlays.
- `Income`: The money earned from various sources, like work, investments, or
  side hustles.
- `Liabilities`: Financial obligations and debts. This includes loans, credit
  card balances, and any amounts owed.

`description` should be a good description to remind you what the account is and
what it is used for.

A built-in non-top-level account `Opening Balances` is included by default with
`Equity` as its parent to facilitate starting the ledger.

### Defining commodities

Before you can enter any transactions, you will need to define any commodities
you will be using. The United States dollar (USD) is included by default. For
all other commodities, enter them in the `Commodity` table.

```sql
INSERT INTO Commodity (id, decimalFactor, description)
VALUES ('CAD', 100, 'Canadian dollar')
```

`id` can be anything, but ideally an [ISO
4217](https://en.wikipedia.org/wiki/ISO_4217) currency code would be used if
available.

`decimalFactor` describes an integer by which to divide amounts in order to get
the standard denomination. Amounts are stored in the lowest denomination (for
example: cents for USD). The `decimalFactor` is `100` for USD because you divide
the amount by 100 to get the standard denomination.

`description` describes the commodity if you need to remember what it
represents.

### Defining payees

Every transaction needs an associated payee. This could be the entity paying or
being paid. For example, `ACME Corporation` could be a payee for your employer
who will transfer money to you as a salary. `Walmart` could be a payee who you
transfer money to when you purchase groceries.

```sql
INSERT INTO Payee (id, description)
VALUES ('ACME Corporation', 'Dynamic and innovative multinational company.')
```

`id` is a unique, short name for the payee.

`description` should be a good description to remind you what the payee is.

A built-in `Opening Balances` payee is included by default to facilitate
starting the ledger.

### Entering transactions

```sql
INSERT INTO Transaction (
  id,
  statusId,
  payeeId,
  fromAccountId,
  toAccountId,
  commodityId,
  date,
  amount,
  description
) VALUES (
  '9b56f3ec-26ed-4601-a257-cc5002ca3607',
  'Cleared',
  'Walmart',
  'Checking',
  'Groceries',
  'USD',
  '2024-01-07',
  18000,
  'Groceries for the week'
)
```

`id` is a unique identifier for the transaction. It can be anything. Ideally,
this will be auto-generated in the future.

`statusId` must be either...

- `Cleared`: Transaction has been successfully processed, and funds are securely
  transferred. The financial operation is complete, and the transaction is
  considered finalized.
- `Pending`: Transaction is in progress or awaiting further processing. Funds
  may not have been transferred yet, and additional steps may be required before
  the transaction is considered complete.

`payeeId` is the entity being payed or paying.

`fromAccountId` indicates which account is being debited (money is coming from).

`toAccountId` indicates which account is being credited (money is going to).

`commodityId` indicates the commodity being transferred.

`date` is the date the transaction occurred.

`amount` is the amount of the commodity that was transferred, in terms of the
lowest denomination (for example, cents for USD).

`description` is a good description of the transaction so you can remember why
it occurred or what it involved later.

## Reports

### All transactions, double-entry style

Get a list of all transactions in double-entry style. Notice the amounts always
balance out to zero.

```sql
SELECT          Credit.toAccountId account1,
                Credit.fromAccountId account2,
                Credit.commodityId,
                DATE(Credit.date) date,
                Credit.amount / Commodity.decimalFactor amount
FROM            `Transaction` Credit
JOIN            Commodity
ON              Commodity.id = Credit.commodityId
UNION ALL
SELECT          Debit.fromAccountId account1,
                Debit.toAccountId account2,
                Debit.commodityId,
                DATE(Debit.date) date,
                Debit.amount * -1 / Commodity.decimalFactor amount
FROM            `Transaction` Debit
JOIN            Commodity
ON              Commodity.id = Debit.commodityId
ORDER BY        date,
                account1,
                account2
```

| account1         | account2         | commodityId | date       | amount |
| ---------------- | ---------------- | ----------- | ---------- | -----: |
| Checking         | Opening Balances | USD         | 2024-01-01 |  10000 |
| Opening Balances | Checking         | USD         | 2024-01-01 | -10000 |
| Checking         | Salary           | USD         | 2024-01-05 |   1200 |
| Salary           | Checking         | USD         | 2024-01-05 |  -1200 |
| Checking         | Groceries        | USD         | 2024-01-07 |   -180 |
| Groceries        | Checking         | USD         | 2024-01-07 |    180 |

### Current balances

Get the current balance by account. Notice again the balances always balance out
to zero.

```sql
SELECT          DETransaction.account1 account,
                DETransaction.commodityId,
                SUM(DETransaction.amount) / Commodity.decimalFactor balance
FROM            (
                  SELECT          Credit.toAccountId account1,
                                  Credit.fromAccountId account2,
                                  Credit.commodityId,
                                  Credit.date,
                                  Credit.amount
                  FROM            `Transaction` Credit
                  UNION ALL
                  SELECT          Debit.fromAccountId account1,
                                  Debit.toAccountId account2,
                                  Debit.commodityId,
                                  Debit.date,
                                  Debit.amount * -1 amount
                  FROM            `Transaction` Debit
                ) DETransaction
JOIN            Commodity
ON              Commodity.id  = DETransaction.commodityId
GROUP BY        DETransaction.account1,
                DETransaction.commodityId
ORDER BY        DETransaction.account1,
                DETransaction.commodityId
```

| account          | commodityId | balance |
| ---------------- | ----------- | ------: |
| Checking         | USD         |   11020 |
| Groceries        | USD         |     180 |
| Opening Balances | USD         |  -10000 |
| Salary           | USD         |   -1200 |

## To Do

- Error-handling of forms
- Confirmation/undo form actions
- Reporting views
- Import from CSV system

## License

The MIT License

Copyright 2024 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
