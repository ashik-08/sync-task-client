import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster />
    </HelmetProvider>
  </AuthProvider>
);
