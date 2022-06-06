import { LightModeOutlined, ModeNightOutlined, SettingsSuggestOutlined } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useSettings } from "../../contexts";

export default function ThemeToggle() {
    const settings = useSettings();

    function renderIcon(): JSX.Element {
        switch (settings.getTheme()) {
            case "light":
                return <ModeNightOutlined />;
            case "dark":
                return <SettingsSuggestOutlined />;
            default:
                return <LightModeOutlined />;
        }
    }

    function getToggleTitle(): string {
        switch (settings.getTheme()) {
            case "light":
                return "Tema claro";
            case "dark":
                return "Tema escuro";
            default:
                return "Pref. do sistema";
        }
    }

    function switchTheme(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();

        switch (settings.getTheme()) {
            case "light":
                return settings.setTheme("dark");
            case "dark":
                return settings.setTheme("system");
            default:
                return settings.setTheme("light");
        }
    }

    return <Tooltip title="Tema do sistema">
        <Button startIcon={renderIcon()} color="primary" variant="text" onClick={switchTheme}>
            {getToggleTitle()}
        </Button>
    </Tooltip>
}