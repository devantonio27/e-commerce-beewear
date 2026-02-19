"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable, shippingAddressTable } from "@/db/schema";
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

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  if (!cart) {
    throw new Error("Cart not found");
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

  await db
    .update(cartTable)
    .set({ shippingAddressId: shippingAddress.id })
    .where(eq(cartTable.id, cart.id));

  return { shippingAddressId: shippingAddress.id };
};

