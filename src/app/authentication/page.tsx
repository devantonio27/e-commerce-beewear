"use client";

import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

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
            <SignInForm />
          </TabsContent>
          <TabsContent value="sing-up" className="w-full">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Authentication;
