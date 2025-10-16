import { Contact, ContactGetDto } from "./contact"


export type NewGroup = Omit<Group, "id" | "contacts">


export interface Group{
  id: number,
  contacts: Contact[]
  name: string,
  description?: string,
}


export interface GroupGetDto {
  id: number,
  name: string,
  ownerId: number
  description?: string,
  contacts?: ContactGetDto[]
}


export interface GroupPostDto {
  Name: string;
  Description?: string;
}


export const GRUPO_VACIO: Group = {
  name: "",
  id: 0,
  contacts: []
};