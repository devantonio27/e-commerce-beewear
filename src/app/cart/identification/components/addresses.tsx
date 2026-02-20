"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
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

        {selectedAddress === "add_new" && <AddressForm />}
      </CardContent>
    </Card>
  );
};

export default Addresses;
