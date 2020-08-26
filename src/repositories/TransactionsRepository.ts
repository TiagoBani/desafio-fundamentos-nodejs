import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceResult = this.transactions.reduce(
      (balance: Balance, current: Transaction) => {
        let { income, outcome } = balance;

        if (current.type === 'income') {
          income += current.value;
        }
        if (current.type === 'outcome') {
          outcome += current.value;
        }
        const total = income - outcome;
        return { income, outcome, total };
      },
      { income: 0, outcome: 0, total: 0 } as Balance,
    );
    return balanceResult;
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
