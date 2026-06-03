export interface Formulario {
  id?: string | number;
  nombre: string;
  apellido?: string;
  email: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string; // ISO date string: YYYY-MM-DD
  genero?: 'masculino' | 'femenino' | 'otro' | 'prefiero_no_decirlo';
  ocupacion?: string;
  comentarios?: string;
  aceptaTerminos: boolean;
}

export type CambiosFormulario = Partial<Formulario>;

export const camposVacios = (f: Partial<Formulario>): string[] => {
  const requeridos: (keyof Formulario)[] = [
    'nombre',
    'email',
    'aceptaTerminos',
  ];
  return requeridos.filter(
    (k) => f[k] === undefined || f[k] === null || f[k] === '',
  ) as string[];
};

export default Formulario;
