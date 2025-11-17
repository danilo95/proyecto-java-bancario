

import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email invalido, intenta de nuevo'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener un minimo de 6 digitos')
});

