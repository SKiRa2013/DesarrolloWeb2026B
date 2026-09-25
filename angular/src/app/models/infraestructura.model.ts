export interface NodoServidor {
  id: number;
  nombre_host: string;
  direccion_ip: string;
  motor_contenedores: string;
  proxy_inverso: boolean;
  en_produccion: boolean;
  fecha_despliegue: string;
}

export interface IncidenciaServidor {
  id: number;
  servidor: number;
  titulo: string;
  descripcion: string;
  severidad: string;
  estado_res: string;
  fecha_reg: string;
}

export interface Mantenimiento {
  id: number;
  servidor: number;
  titulo_tarea: string;
  descripcion_tecnica: string;
  tipo: string;
  completado: boolean;
  fecha_programada: string;
}