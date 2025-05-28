export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: -85.5,
    date: '2024-03-15',
    type: 'debit',
  },
  {
    id: '2',
    title: 'Salary Deposit',
    amount: 2500.0,
    date: '2024-03-14',
    type: 'credit',
  },
  {
    id: '3',
    title: 'Electric Bill',
    amount: -120.75,
    date: '2024-03-13',
    type: 'debit',
  },
  {
    id: '4',
    title: 'Freelance Payment',
    amount: 350.0,
    date: '2024-03-12',
    type: 'credit',
  },
  {
    id: '5',
    title: 'Restaurant',
    amount: -45.2,
    date: '2024-03-11',
    type: 'debit',
  },
];
