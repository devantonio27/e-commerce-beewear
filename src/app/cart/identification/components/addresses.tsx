"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import { useCart } from "@/hooks/queries/use-cart";
import { useShippingAddresses } from "@/hooks/queries/use-shipping-addresses";

import AddressForm from "./address-form";

interface addressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
}

const Addresses = ({ shippingAddresses }: addressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { data: addresses } = useShippingAddresses({
    initialData: shippingAddresses,
  });
  const { data: cart } = useCart();

  useEffect(() => {
    const shippingAddressId = cart?.shippingAddress?.id;
    if (
      selectedAddress === null &&
      shippingAddressId &&
      addresses?.some((a) => a.id === shippingAddressId)
    ) {
      setSelectedAddress(shippingAddressId);
    }
  }, [cart, addresses, selectedAddress]);

  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();

  const handleAddressCreated = (shippingAddressId: string) => {
    updateCartShippingAddressMutation.mutate(
      { shippingAddressId },
      {
        onSuccess: () => {
          toast.success("Endereço selecionado para entrega.");
        },
        onError: () => {
          toast.error("Erro ao vincular endereço ao carrinho.");
        },
      },
    );
  };

  const handleValueChange = (value: string) => {
    setSelectedAddress(value);
    if (value !== "add_new" && addresses?.some((a) => a.id === value)) {
      updateCartShippingAddressMutation.mutate(
        { shippingAddressId: value },
        {
          onSuccess: () => {
            toast.success("Endereço selecionado para entrega.");
          },
          onError: () => {
            toast.error("Erro ao vincular endereço ao carrinho.");
          },
        },
      );
    }
  };

  const handleGoToPayment = () => {
    if (!selectedAddress || selectedAddress === "add_new") return;
    updateCartShippingAddressMutation.mutate(
      { shippingAddressId: selectedAddress },
      {
        onSuccess: () => {
          toast.success("Endereço selecionado para entrega.");
        },
        onError: () => {
          toast.error("Erro ao vincular endereço ao carrinho.");
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={handleValueChange}>
          {addresses?.map((address) => (
            <Card key={address.id}>
              <CardContent>
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <div className="flex flex-col gap-1">
                    <Label htmlFor={address.id}>{address.recipientName}</Label>
                    <span className="text-muted-foreground text-sm">
                      {address.street}, {address.number}
                      {address.complement ? `, ${address.complement}` : ""}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {address.neighborhood} - {address.city}/{address.state}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      CEP {address.zipCode}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {address.email} • {address.phone}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectedAddress === "add_new" && (
          <AddressForm onAddressCreated={handleAddressCreated} />
        )}

        {selectedAddress &&
          selectedAddress !== "add_new" &&
          addresses?.some((a) => a.id === selectedAddress) && (
            <div className="mt-4">
              <Button
                className="w-full"
                onClick={handleGoToPayment}
                disabled={updateCartShippingAddressMutation.isPending}
              >
                Ir para pagamento
              </Button>
            </div>
          )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
