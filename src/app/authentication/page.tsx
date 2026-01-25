"use client";

import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SingInForm from "./components/sing-in-form";
import SingUpForm from "./components/sing-up-form";

const Authentication = () => {
  return (
    <>
      <Header />

      <div className="flex w-full flex-col gap-6 p-5">
        <Tabs defaultValue="sing-in">
          <TabsList>
            <TabsTrigger value="sing-in">Entrar</TabsTrigger>
            <TabsTrigger value="sing-up">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sing-in" className="w-full">
            <SingInForm />
          </TabsContent>
          <TabsContent value="sing-up" className="w-full">
            <SingUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Authentication;
