/** Datos de usuario */
export interface User {
  email: string,
  firstName: string,
  lastName: string
}

export type State = "Active" | "Archived" | "Confirmed";

/** User para enviar al backend */
export interface UserPostDto{
  FirstName: string,
  LastName: string,
  Password: string,
  Email: string,
}

/** Respuesta del back de post/put un USER */
export interface UserPostRes{
  Id: number,
  FirstName: string,
  LastName: string,
  Email: string,
  State: State,
}

/** User como viene del backend */
export interface UserGetDto{
  Id: number,
  FirstName: string,
  LastName: string,
  Email: string,
  State: State,
}