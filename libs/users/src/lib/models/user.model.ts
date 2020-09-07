export interface User {
  uid: string,
  fullName: string
  sports: number[]
  isAdministrator: boolean // Could this be a Role for the AuthUser
}
