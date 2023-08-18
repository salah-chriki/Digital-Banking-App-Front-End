export interface CustomerAccounts {
  type:          string;
  id:            string;
  balance:       number;
  createdAt:     Date;
  accountStatus: null;
  customerDTO:   CustomerDTO;
  overDraft?:    number;
  interestRate?: number;
}

export interface CustomerDTO {
  id:    number;
  name:  string;
  email: string;
}
