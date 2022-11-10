import axios from "axios";
import { toast } from "react-toastify";
import { ApiRoutes } from "../ApiRoutes";
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

export function routeToLogin(error: any) {
  if (error.logout) {
    localStorage.clear();
    window.location.replace("/login");
  }
}

export async function refreshAccessToken(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const _data = {
        refreshToken: JSON.parse(localStorage.getItem("user")!).refreshToken,
      };

      const { data }: any = await axios.post(ApiRoutes.refreshToken, _data);
      if (data.Succeed) {
        let user = JSON.parse(localStorage.getItem("user")!);
        user.token = data.Content.token;
        localStorage.setItem("user", JSON.stringify(user));
        resolve(user.token);
      } else {
        reject("");
      }
    } catch (error: any) {
      reject("");
    }
  });
}
