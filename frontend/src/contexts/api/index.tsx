import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useDialogs } from "..";
import AuthAPI from "./auth";

interface APIContextType {
    auth: AuthAPI;
}

const APIContext = createContext<APIContextType>(null!);

export function APIProvider({ children }: React.PropsWithChildren<any>) {
    const dialogs = useDialogs();
    const [initialized, setInitialized] = useState<boolean>(false);
    const [apis, setAPIs] = useState<APIContextType | null>(null);

    useEffect(() => {
        const api = axios.create({ baseURL: "http://localhost:8082/api" });
        api.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error(error);
                dialogs.showError({ title: "Error", message: error.toString() })
            });

        setAPIs({
            auth: new AuthAPI(api),
        });
        setInitialized(true);
    }, []);

    if (!initialized)
        return <h1>Initializing APIs...</h1>
    else if (apis == null)
        return <h1>Failed to load the APIs!</h1>
    else
        return <APIContext.Provider value={apis}>{children}</APIContext.Provider>;
}

export function useAPI() {
    return React.useContext(APIContext);
}