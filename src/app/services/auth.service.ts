import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { LoginData, LoginDto } from '../interfaces/login';
import { ApiService } from './api.service';
import { RegisterData } from '../interfaces/register';
import { UserPostRes, User } from '../interfaces/usuario';
import { Router } from '@angular/router';
import { ResponseData } from '../interfaces/responses';
import { decodeToken } from '../utils/token';
import { TokenClaims } from '../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  router = inject(Router);
  logoutTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(){
    super();
    const tokenLocalstorage = localStorage.getItem("token");
    this.token.set(tokenLocalstorage || null);
  }

  user = computed<User|null>(()=> {
    if(!this.token()) return null;
    const tokenDecodificado:TokenClaims = decodeToken(this.token()!);
    const user:User = {
      firstName: tokenDecodificado.given_name,
      lastName: tokenDecodificado.family_name,
      email: 'Correo',
    }
    return user;
  })

  vencimientoToken = effect(()=> {
    if(!this.token()) return this.logout();
    const tokenDecodificado = decodeToken(this.token()!);
    if(!tokenDecodificado.exp || new Date(tokenDecodificado.exp*1000) < new Date()){
      this.logout();
    } else {
      if(this.logoutTimer) clearTimeout(this.logoutTimer) //Frena cálculo anterior
      this.logoutTimer = setTimeout(() => {
        this.logout()
      }, tokenDecodificado.exp*1000 - new Date().getTime());
    }
  })

  token = signal<string | null>(null);

  guardarTokenLocalstorage = effect(()=> 
    this.token() ? 
    localStorage.setItem("token",this.token()!) :
    localStorage.removeItem("token")
  );

  async login(loginData:LoginData):Promise<ResponseData>{
    const res = await this.post("authentication/authenticate",loginData)
    if(!res) return {
      success: false,
      message: "Error de conexión"
    }
    if(res.status === 503 || res.status === 401) return{
      success: false,
      message: "Usuario o contraseña incorrectos"
    }
    if(res.ok) {
      const token = await res.text();
      if(token) this.token.set(token);
      localStorage.setItem("token",token); 
      return {
        success: true,
        message: "Sesión iniciada con éxito"
      }
    }
    return {
      success: false,
      message: "Error indeterminado"
    }
  }

  logout(){
    this.token.set(null);
    this.router.navigate(["/"]);
  }
async register(registerData: RegisterData): Promise<ResponseData<User | undefined>> {
  const params: RegisterData = {
    firstName: registerData.firstName,
    lastName: registerData.lastName,
    password: registerData.password,
    email: registerData.email
  };

  let res: Response | null | undefined = null;

  try {
    res = await this.post("Users", params);
  } catch (error) {
    console.error("Error enviando solicitud:", error);
    return {
      success: false,
      message: "Error de conexión con el servidor"
    };
  }

  if (!res) {
    return {
      success: false,
      message: "No se pudo conectar con el servidor"
    };
  }

  if (res.ok) {
    try {
      const data = await res.json().catch(() => ({}));

      return {
        success: true,
        message: "Usuario creado con éxito",
        data
      };
    } catch (error) {
      console.warn("No se pudo parsear la respuesta JSON:", error);
      return {
        success: true,
        message: "Usuario creado con éxito"
      };
    }
  }

  if (res.status >= 400 && res.status < 500) {
    const errorText = await res.text();
    return {
      success: false,
      message: errorText || "Error de validación. Verificá los datos ingresados."
    };
  }

  return {
    success: false,
    message: `Error del servidor (${res.status})`
  };
}


}
