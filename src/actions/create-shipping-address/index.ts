"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  type CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "./schema";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

export const createShippingAddress = async (data: CreateShippingAddressSchema) => {
  createShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [shippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: data.fullName.trim(),
      street: data.address.trim(),
      number: data.number.trim(),
      complement: data.complement?.trim() || null,
      city: data.city.trim(),
      state: data.state.trim(),
      neighborhood: data.neighborhood.trim(),
      zipCode: onlyDigits(data.zipCode),
      country: "BR",
      phone: onlyDigits(data.phone),
      email: data.email.trim().toLowerCase(),
      cpfOrCnpj: onlyDigits(data.cpf),
    })
    .returning();

  return { shippingAddressId: shippingAddress.id };
};

