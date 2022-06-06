import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts";

export default function DashAppBar() {
    const auth = useAuth();
    const navigate = useNavigate();

    function signOut() {
        auth.signOut();
    }

    return (<AppBar position="static">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
            </Typography>

            <Button color="inherit">
                Logout
            </Button>
        </Toolbar>
    </AppBar>);
}