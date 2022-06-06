import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDialogs, useAPI } from "./";
import { SignInResult } from "./api/auth/signInResult";
import { v4 } from "uuid";

interface AuthContextType {
    token: string | null;

    isAuthenticated: () => Promise<boolean>;
    signIn: (userOrToken: string, password: string) => Promise<boolean>;
    signOut: () => Promise<boolean>;
    authWithProvider: (provider: string) => Promise<boolean>;
}


const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: React.PropsWithChildren<any>) {
    const api = useAPI();
    const navigate = useNavigate();
    const dialogs = useDialogs();

    const [token, setToken] = useState<string | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("ClearMe");
        if (token != null) setToken(token);

        setInitialized(true);
    }, []);

    async function signIn(token: string): Promise<boolean> {
        try {
            if (token.trim() == "")
                await dialogs.showWarning({ title: "Campos vazios!", message: "Os campos de e-mail e senha precisam ser preenchidos!" });
            else {
                const response = await api.auth.signIn(token);
                if (response == SignInResult.success) {
                    await dialogs.showSuccess({ title: "Login realizado com sucesso!" });
                    setToken(token);
                    navigate('/');

                    return true;
                } else {
                    await dialogs.showError({ title: "Erro ao logar!", message: "Não foi possível realizar o login devido a uma falha interna!", });
                }
            }

            return false;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async function signOut(): Promise<boolean> {
        localStorage.removeItem("ClearMe")
        return true;
    }

    async function isAuthenticated(): Promise<boolean> {
        console.log(token);
        if (token == null)
            return false;
        else
            return await api.auth.isSigned();
    }

    async function authWithProvider(provider: string): Promise<boolean> {
        const provider_data = await api.auth.getProviderURL(provider);
        if (provider_data == null) return false;

        const openedWindow = window.open(provider_data.authUrl);

        if (openedWindow) {
            await new Promise((resolve, reject) => {
                const interval = setInterval(() => {
                    try {
                        if (openedWindow.closed) {
                            clearInterval(interval);
                            resolve(true);
                        }
                    }
                    catch (e) {
                        clearInterval(interval);
                        reject(e);
                    }
                }, 1000);
            });

            const validate_data = await api.auth.validateToken(provider, provider_data.checkToken);
            if (!validate_data) { return false; }
            else {
                navigate('/');
                return true;
            }
        }
        return false;
    }

    const value: AuthContextType =
    {
        token, signIn, signOut, isAuthenticated, authWithProvider
    };

    if (!initialized)
        return <h1>Initializing authentication...</h1>;
    else
        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}