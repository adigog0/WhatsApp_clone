import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <GoogleOAuthProvider clientId="254870272544-3vbnj44f7vel9dosb7i4nlae1smdqgag.apps.googleusercontent.com">
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider
                    autoHideDuration={3000}
                    maxSnack={3}
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "top",
                    }}
                >
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </SnackbarProvider>
            </QueryClientProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);
