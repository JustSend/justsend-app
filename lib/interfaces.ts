export type Amount = number;

export type Currency = string;

export type TransactionType = 'SEND' | 'RECEIVE' | 'DEPOSIT' | 'WITHDRAW';

export interface Transaction {
  id: string;
  amount: Amount;
  currency: Currency;
  createdAt: string;
  type: TransactionType;
  email: string; // email of the other party (sender or receiver)
}
