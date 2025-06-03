
# 📝 TaskSphere - Gestão Colaborativa de Projetos

Aplicação web desenvolvida com **Next.js**, **TypeScript** e **Firebase** para gestão colaborativa de projetos e tarefas, com foco em autenticação, controle de acesso e boas práticas de desenvolvimento frontend.

---

## 🚀 Funcionalidades

✅ Autenticação de usuários com Firebase Authentication  
✅ Cadastro de novos usuários com validação  
✅ Tela inicial com listagem de projetos onde o usuário é **criador ou colaborador**  
✅ Cadastro, edição e exclusão de projetos  
✅ Regras de permissão: somente criadores podem editar ou excluir projetos  
✅ Formulários com **validação robusta** utilizando **React Hook Form** e **Zod**  
✅ Sugestão de colaboradores utilizando API externa (`randomuser.me`)  
✅ Layout responsivo com **TailwindCSS**  
✅ Gerenciamento de tarefas: criação e listagem  
✅ Estrutura organizada por componentes, hooks e serviços

---

## ❗ Funcionalidades pendentes

🔲 Filtros e busca na listagem de tarefas  
🔲 Exclusão e edição de tarefas

---

## 🛠️ Tecnologias

- ✅ **Next.js** - Framework React para SSR e SSG  
- ✅ **TypeScript** - Tipagem estática  
- ✅ **React Hook Form** - Controle de formulários  
- ✅ **Zod** - Validação de schemas  
- ✅ **Firebase** - Auth e Firestore Database  
- ✅ **React Query** - Gerenciamento de requisições e cache  
- ✅ **TailwindCSS** - Estilização  
- ✅ **React Icons** - Ícones  
- ✅ **randomuser.me** - API externa para sugestão de colaboradores

---

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone git@github.com:lvasconcelos20/task-project.git
cd tasks-project
npm  install
npm  run dev
