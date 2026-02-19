import z from "zod";

export const createShippingAddressSchema = z.object({
  email: z.email("Email inválido."),
  fullName: z.string().min(1, "Nome completo é obrigatório.").trim(),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório.")
    .refine(
      (val) => val.replace(/\D/g, "").length === 11,
      "CPF deve conter 11 dígitos.",
    ),
  phone: z
    .string()
    .min(1, "Celular é obrigatório.")
    .refine(
      (val) => val.replace(/\D/g, "").length === 11,
      "Celular deve conter 11 dígitos.",
    ),
  zipCode: z
    .string()
    .min(1, "CEP é obrigatório.")
    .refine(
      (val) => val.replace(/\D/g, "").length === 8,
      "CEP deve conter 8 dígitos.",
    ),
  address: z.string().min(1, "Endereço é obrigatório.").trim(),
  number: z.string().min(1, "Número é obrigatório.").trim(),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório.").trim(),
  city: z.string().min(1, "Cidade é obrigatória.").trim(),
  state: z.string().min(1, "Estado é obrigatório.").trim(),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
