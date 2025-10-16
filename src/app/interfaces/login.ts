/** Datos para iniciar sesión, dentro de la app*/
export interface LoginData {
  email:string,
  password:string
}

/** Datos para enviar al backend al iniciar sesión */
export interface LoginDto {
  UserName:string,
  Password:string
}