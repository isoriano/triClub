export interface IUser {
  uid: string;
  displayName: string;
  email: string;
  dateOfBirth: any,
  sports: string
  loading?: boolean;
  saving?: boolean;
  error?: string;
}

export class User {
  constructor(public uid?: string, public displayName?: string, public email?: string, public dateOfBirth?: any, public sports?: string, public updatedOn?: Date) { }
}
