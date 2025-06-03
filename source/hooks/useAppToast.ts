import { toast, TypeOptions } from "react-toastify";

interface ToastConfig {
  type: TypeOptions;
  autoClose: number;
}

const baseConfig: ToastConfig = {
  type: "error",
  autoClose: 2000,
};

const errorToast = (message: string) => {
  switch (message) {
    case "RESET_PASSWORD_EXCEED_LIMIT":
      toast.error("Você tentou muitas vezes! Tente mais tarde.", baseConfig);
      break;
    case "EMAIL_NOT_FOUND":
      toast.error("ALOU", baseConfig);
      break;
    case "auth/credential-already-in-use":
      toast.error("E-mail já cadastrado.", baseConfig);
      break;
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-login-credentials":
      toast.error("Credenciais incorretas.", baseConfig);
      break;
    case "auth/too-many-requests":
      toast.error("Há muitas requisições na plataforma.", baseConfig);
      break;
    case "auth/requires-recent-login":
      toast.error(
        "A exclusão de uma conta requer um login recente do usuário.",
        baseConfig
      );
      break;
    case "auth/missing-email":
      toast.error("Digite o seu e-mail.", baseConfig);
      break;
    case "auth/cancelled-popup-request":
      toast.error("Você fechou o pop-up.", baseConfig);
      break;
    case "auth/user-mismatch":
      toast.error("Não é esse o usuário que está logado.", baseConfig);
      break;
    case "auth/account-exists-with-different-credential":
      toast.error("Conta já existe com diferente credencial.", baseConfig);
      break;
    case "auth/invalid-credential":
      toast.error("Credenciais inválidas.", baseConfig);
      break;
    case "recover-user-not-found":
      toast.info("Requisição indisponível", {
        autoClose: 2000,
      });
      break;
    case "non-authenticated-user":
      toast.error("Cadastre-se na plataforma.", baseConfig);
      break;
    case "loading":
      toast.warning("Espere o carregamento...", {
        autoClose: 2000,
      });
      break;
    default:
      toast.error(
        "Algum erro aconteceu. Tente novamente mais tarde.",
        baseConfig
      );
      console.log("🔴 Unhandled toast error:", message);
  }
};

const genericErrorToast = (message: string) => {
  toast.error(message, { autoClose: 2000 });
};

const successToast = (message: string) => {
  toast.success(message, { autoClose: 2000 });
};

export { errorToast, successToast, genericErrorToast };
  