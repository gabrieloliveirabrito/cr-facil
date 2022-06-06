import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, { createContext } from "react";
import { Typography } from "@mui/material";

interface DialogsProps {
    title: string;
    message?: string;
    onClose?: VoidFunction;
}

interface DialogsType {
    showInfo: (props: DialogsProps) => void;
    showSuccess: (props: DialogsProps) => void;
    showError: (props: DialogsProps) => void;
    showWarning: (props: DialogsProps) => void;
}

const DialogsContext = createContext<DialogsType>(null!);

export function DialogsProvider({ children }: React.PropsWithChildren<any>) {
    const swal = withReactContent(Swal);

    async function showInfo(props: DialogsProps) {
        await swal.fire({
            title: <Typography><strong>{props.title}</strong></Typography>,
            html: props.message && <Typography>{props.message}</Typography>,
            icon: "info",
        });
        props.onClose && props.onClose();
    }

    async function showSuccess(props: DialogsProps) {
        await swal.fire({
            title: <Typography><strong>{props.title}</strong></Typography>,
            html: props.message && <Typography>{props.message}</Typography>,
            icon: "success",
        });

        props.onClose && props.onClose();
    }

    async function showError(props: DialogsProps) {
        await swal.fire({
            title: <Typography><strong>{props.title}</strong></Typography>,
            html: props.message && <Typography>{props.message}</Typography>,
            icon: "error",
        });
        props.onClose && props.onClose();
    }

    async function showWarning(props: DialogsProps) {
        await swal.fire({
            title: <Typography><strong>{props.title}</strong></Typography>,
            html: props.message && <Typography>{props.message}</Typography>,
            icon: "warning",
        });
        props.onClose && props.onClose();
    }

    const value: DialogsType = {
        showInfo: showInfo,
        showSuccess: showSuccess,
        showError: showError,
        showWarning: showWarning,
    };

    return <DialogsContext.Provider value={value}>{children}</DialogsContext.Provider>;
}

export function useDialogs() {
    return React.useContext(DialogsContext);
}