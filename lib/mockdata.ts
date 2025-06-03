import { Currency } from '@/components/home/CurrencySelector';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'income' | 'payment';
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: -85.5,
    date: '2024-03-15',
    type: 'payment',
  },
  {
    id: '2',
    title: 'Salary Deposit',
    amount: 2500.0,
    date: '2024-03-14',
    type: 'income',
  },
  {
    id: '3',
    title: 'Electric Bill',
    amount: -120.75,
    date: '2024-03-13',
    type: 'payment',
  },
  {
    id: '4',
    title: 'Freelance Payment',
    amount: 350.0,
    date: '2024-03-12',
    type: 'payment',
  },
  {
    id: '5',
    title: 'Restaurant',
    amount: -45.2,
    date: '2024-03-11',
    type: 'payment',
  },
];

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
