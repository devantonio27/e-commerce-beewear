<h1 align="center">🐝 Beewear E-commerce</h1>

<p align="center">
  Uma plataforma de e-commerce moderna, rápida e escalável, focada em performance e experiência do usuário (UX).
</p>

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com foco em produtividade e tecnologias modernas do ecossistema React:

- **[Next.js (App Router)](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[React Query](https://tanstack.com/query/latest)**
- **[Zod](https://zod.dev/)**
- **Server Actions (Next.js)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[Drizzle ORM](https://orm.drizzle.team/)**

---

## 🏗️ Conceitos Aplicados

- **Arquitetura Client/Server Components:** Separação clara entre componentes de interface e renderização do lado do servidor via Next.js App Router.
- **Type Safety de ponta a ponta:** Uso conjunto e tipado do TypeScript, Zod e Drizzle ORM.
- **Otimizações de Renderização:** Estratégias de cache com React Query e controle de invalidação de dados.
- **Separação de Preocupações (SoC):** Divisão de lógicas complexas em _Actions_, _Hooks_ customizados e _Componentes UI_.
- **Mobile-first Design:** Layout responsivo focado inicialmente em dispositivos móveis, escalando suavemente para desktop.

---

## 📂 Estrutura de Pastas

A arquitetura do projeto foi pensada para facilitar a manutenção e escalabilidade:

```text
src/
├── actions/      # Next.js Server Actions para mutações
├── app/          # Rotas e páginas (App Router)
├── components/   # Componentes globais e de UI
├── db/           # Configurações do Drizzle ORM e schemas
├── helpers/      # Funções utilitárias e de formatação
├── hooks/        # Custom React hooks (React Query etc.)
├── lib/          # Configurações de bibliotecas externas
└── providers/    # Contextos e provedores globais (QueryClient, Autenticação)
```

---

## ✨ Funcionalidades Principais

- Catálogo de produtos com listas organizadas.
- Carrinho de compras complexo e sincronizado com o banco de dados.
- Layout totalmente responsivo (mobile e desktop).
- Funcionalidade de checkout integrado.
- Autenticação de usuários.
- Visualização detalhada de produtos e variações.

---

## 🛡️ Segurança

- Validação rigorosa de formulários e inputs via **Zod**.
- Tipagem garantida em tempo de execução para as Server Actions.
- Banco de dados protegido contra injeção de SQL nativamente pelo **Drizzle ORM**.
- Validação de segurança sobre rotas sensíveis como carrinho e manipulação de pedidos.

---

## 🔍 Code Review

Constantes melhorias são aplicadas no projeto. Algumas das melhorias destacadas em codes reviews recentes incluem:

- **Refatoração UI:** Migração e adaptação constante de layouts para tornar a experiência cross-device perfeita.
- **Correções Críticas de Schema Zod/Drizzle:** Remoção de bugs silenciosos e tipagens flexíveis para assegurar consistência de dados estritos.
- **Otimização de Código de Produção:** Limpeza rigorosa de imports ociosos e logs sensíveis ao longo do ciclo de vida da aplicação.
- **Padronização:** Organização concisa nas _Query Keys e Mutation Keys_ do React Query para afinar o cache e gerenciamento de estado cliente/servidor.

---

## ⚡ Desafios Enfrentados

No decorrer do desenvolvimento, soluções técnicas sofisticadas foram aplicadas para resolver gargalos críticos de um e-commerce:

- **Gerenciamento de Estado do Carrinho:** Modelar uma interface otimista reagindo instantaneamente, ao mesmo tempo em que o banco sincronizava em background.
- **Sincronização Cliente/Servidor:** Estabelecer a comunicação robusta usando Server Actions sem perder a performance e fluxo na camada de componentes cliente.
- **Organização de Mutations e Queries:** Controlar a invalidação de cache para evitar múltiplas buscas desnecessárias sempre que um item sofria alteração de quantidade ou era removido.

---

## 📋 Melhorias Futuras

- [ ] Implementar sistema robusto de Rate Limiting para maior resiliência de API.
- [ ] Adicionar testes E2E ou unitários para fluxos fundamentais (como checkout).
- [ ] Aprimoramento contínuo de atributos ARIA para maior acessibilidade.
- [ ] Criar testes robustos com Optimistic Updates nativos do React Query no carrinho.

---

## 🟢 Deploy

O projeto está disponível para acesso na URL abaixo:

🔗 **[Acesso ao Beewear E-commerce (Placeholder)](#https://e-commerce-beewear.vercel.app/)**

---

## 💡 Sobre o Projeto

O "Beewear E-commerce" começou como um projeto de estudo avançado e portfólio. Seu propósito é provar a capacidade de construir sistemas transacionais completos, aliando uma Interface de Usuário bem cuidada, escalada e perfomática com um Back-end moderno confiável. É uma demonstração viva da aplicação de práticas avançadas de desenvolvimento com o atual ecossistema Fullstack React/Next.js.

---

## 👤 Autor

**Antonio Carlos**  
Desenvolvedor Fullstack

- **GitHub:** [https://github.com/devantonio27](https://github.com/devantonio27)
- **LinkedIn:** [https://www.linkedin.com/in/antonio-carlos-melo-b542a7281/](#https://www.linkedin.com/in/antonio-carlos-melo-b542a7281/)

---

## 📄 Licença

Este projeto é de código aberto e está licenciado sob os termos da licença [MIT](./LICENSE).
