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

export async function refreshAccessToken() {
  try {
    const _data = {
      refreshToken: JSON.parse(localStorage.getItem("user")!).refreshToken,
    };
    console.log(_data);

    const { data }: any = await axios.post(ApiRoutes.refreshToken, _data);
    if (data.Succeed) {
      let user = JSON.parse(localStorage.getItem("user")!);
      user.token = data.Content.token;
      localStorage.setItem("user", JSON.stringify(user));
      return user.token;
    } else {
      Toaster(data.message ?? Toast.NO_RESOURCE, Toast.DANGER);
    }
  } catch (error: any) {
    Toaster(error.message ?? Toast.NO_RESOURCE, Toast.DANGER);
  }
}
