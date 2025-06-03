import { Currency } from './currency';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'income' | 'payment';
}

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
];

export const balances = [
  {
    currency: 'USD',
    amount: 1234.56,
    symbol: '$',
  },
  {
    currency: 'ARS',
    amount: 1234567.89,
    symbol: '$',
  },
  {
    currency: 'EUR',
    amount: 987.65,
    symbol: '€',
  },
  {
    currency: 'GBP',
    amount: 789.12,
    symbol: '£',
  },
  {
    currency: 'BRL',
    amount: 5678.9,
    symbol: 'R$',
  },
  {
    currency: 'MXN',
    amount: 23456.78,
    symbol: '$',
  },
];
