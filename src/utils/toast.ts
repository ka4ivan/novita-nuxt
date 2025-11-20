import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export const customToast = (message: string, type: string) => {
  toast[type](message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 4000,
    hideProgressBar: true,
    transition: "slide",
  });
};
