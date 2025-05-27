import { toast, TypeOptions } from "react-toastify";
interface ToastConfig {
  type: TypeOptions | undefined;
  autoClose: number;
}


const errorToast = async (message: string) => {
  const toastConfig: ToastConfig = { type: "error", autoClose: 2000 };

  switch (message) {
    case "RESET_PASSWORD_EXCEED_LIMIT":
      toast.error("Você tentou muitas vezes! Tente mais tarde.", toastConfig);
      break;
    case "EMAIL_NOT_FOUND":
      toast.error("ALOU", toastConfig);
      break;

    case "auth/credential-already-in-use":
      toast.error("E-mail já cadastrado.", toastConfig);
      break;
    case "auth/wrong-password":
      toast.error("Credenciais incorretas.", toastConfig);
      break;
    case "auth/user-not-found":
      toast.error("Credenciais incorretas.", toastConfig);
      break;
    case "auth/too-many-requests":
      toast.error("Há muitas requisições na plataforma.", toastConfig);
      break;
    case "auth/requires-recent-login":
      toast.error(
        "A exclusão de uma conta requer um login recente do usuário.",
        toastConfig
      );
      break;
    case "auth/missing-email":
      toast.error("Digite o seu e-mail.", toastConfig);
      break;
    case "auth/cancelled-popup-request":
      toast.error("Você fechou o pop-up.", toastConfig);
      break;
    case "auth/user-mismatch":
      toast.error("Não é esse o usuário que está logado.", toastConfig);
      break;
    case "auth/invalid-login-credentials":
      toast.error("Credenciais incorretas.", toastConfig);
      break;
    case "auth/account-exists-with-different-credential":
      toast.error("Conta já existe com diferente credencial.", toastConfig);
      break;
    case "auth/invalid-credential":
      toast.error("Credenciais inválidas.", toastConfig);
      break;
    case "recover-user-not-found":
      toast.success("Requisição indisponível", {
        type: "success",
        autoClose: 2000
      });
      break;
    case "non-authenticated-user":
      toast.error("Cadastre-se na plataforma.", toastConfig);
      break;
    case "loading":
      toast.error("Espere o carregamento...", toastConfig);
      break;
    default:
      toast.error(
        "Algum erro aconteceu. Tente novamente mais tarde.",
        toastConfig
      );
      console.log(message);
  }


};

const genericErrorToast = async (message: string) => {
  const toastConfig: ToastConfig = { type: "error", autoClose: 2000 };
  toast.success(message, toastConfig);

};

const successToast = (message: string) => {
  const toastConfig: ToastConfig = { type: "success", autoClose: 2000 };
  toast.success(message, toastConfig);
};

export { errorToast, successToast, genericErrorToast };
