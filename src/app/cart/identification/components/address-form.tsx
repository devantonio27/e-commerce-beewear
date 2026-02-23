"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateShippingAddress } from "@/hooks/mutations/use-create-shipping-address";

interface AddressFormProps {
  onAddressCreated?: (shippingAddressId: string) => void;
}

const addressFormSchema = z.object({
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

type AddressFormValues = z.infer<typeof addressFormSchema>;

const AddressForm = ({ onAddressCreated }: AddressFormProps) => {
  const createShippingAddressMutation = useCreateShippingAddress();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      phone: "",
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  async function onSubmit(values: AddressFormValues) {
    try {
      const result = await createShippingAddressMutation.mutateAsync(values);
      toast.success("Endereço cadastrado com sucesso.");
      form.reset();
      onAddressCreated?.(result.shippingAddressId);
    } catch {
      toast.error("Erro ao cadastrar endereço.");
    }
  }

  return (
    <Card className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="grid gap-4 pt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu email."
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome completo." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      format="###.###.###-##"
                      mask="_"
                      placeholder="000.000.000-00"
                      value={field.value}
                      onValueChange={(values) =>
                        field.onChange(values.formattedValue)
                      }
                      onBlur={field.onBlur}
                      customInput={Input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <PatternFormat
                      format="(##) #####-####"
                      mask="_"
                      placeholder="(00) 00000-0000"
                      value={field.value}
                      onValueChange={(values) =>
                        field.onChange(values.formattedValue)
                      }
                      onBlur={field.onBlur}
                      customInput={Input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <PatternFormat
                      format="#####-###"
                      mask="_"
                      placeholder="00000-000"
                      value={field.value}
                      onValueChange={(values) =>
                        field.onChange(values.formattedValue)
                      }
                      onBlur={field.onBlur}
                      customInput={Input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o endereço." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="Número" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input placeholder="Complemento (opcional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o bairro." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a cidade." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o estado." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              disabled={createShippingAddressMutation.isPending}
            >
              Salvar endereço
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AddressForm;
