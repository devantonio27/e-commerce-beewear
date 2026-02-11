import { z } from "zod";

export const decreaseCartProductQuantityschema = z.object({
  cartItemId: z.uuid(),
});

export type DecreaseCartProductQuantityschema = z.infer<
  typeof decreaseCartProductQuantityschema
>;
