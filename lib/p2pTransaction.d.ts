export type P2PTransaction = {
  to: P2PUser;
  money: Money;
};

type P2PUser = {
  alias: string | null;
  email: string | null;
};
