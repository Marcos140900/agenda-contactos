export interface Contact{
  id: number,
  isFavorite?: boolean
  groupIds: number[]
  firstName: string,
  lastName: string,
  phone: string,
  address?: string,
  email?: string,
  imageUrl?: string,
  company?: string,
  description?: string,
}


export type NewContact = Omit<Contact,"id" |"isFavorite" | "groupIds">;


export interface ContactGetDto {
  id: number;
  firstName: string;
  lastName: string;
  address?: string;
  number: string;
  email: string;
  image?: string;
  company?: string;
  description?: string;
  userId: number;
  isFavorite?: boolean
  groupIds: number[]
}

export interface ContactPostDto {
  FirstName:  string;
  LastName?: string;
  Address?: string;
  Number?: string;
  Email?: string;
  Image?: string;
  Company?: string;
  Description?: string
}

export const CONTACTO_NUEVO_VACIO:NewContact = {
  firstName: "",
  lastName: "",
  phone: "",
}

export const CONTACTO_VACIO:Contact = {
  ...CONTACTO_NUEVO_VACIO,
  groupIds: [],
  id:0
}