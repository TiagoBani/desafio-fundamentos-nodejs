import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  constructor(private transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransaction): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value >= balance.total) {
      throw Error(`Outcome transactions bigger or equal total balance`);
    }
    return this.transactionsRepository.create(title, value, type);
  }
}

export default CreateTransactionService;
