export interface User {
  uid: string,
  fullName: string,
  dateOfBirth: any,
  sports: string,
  isAdministrator: boolean // Could this be a Role for the AuthUser
}
