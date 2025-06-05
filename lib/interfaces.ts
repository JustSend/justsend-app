export type Amount = number;

export type Currency = string;

export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'PAYMENT';

export interface Transaction {
  id: string;
  amount: Amount;
  currency: Currency;
  createdAt: string;
  type: TransactionType;
}
