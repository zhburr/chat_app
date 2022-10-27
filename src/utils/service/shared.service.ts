import { toast } from "react-toastify";
import { Toast } from "../enums/toast.enum";

export function Toaster(message: string, type: string) {
  if (type === Toast.DANGER) {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
      pauseOnHover: true,
      theme: "dark",
    });
  } else {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      pauseOnHover: true,
      theme: "dark",
    });
  }
}
