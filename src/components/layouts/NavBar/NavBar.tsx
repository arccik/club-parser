import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export default function NavBar() {
  return (
    <AppBar position="relative" color="transparent">
      <Toolbar>
        <SearchIcon sx={{ mr: 1 }} />
        <Typography variant="body1" color="inherit" noWrap>
          <Link href="/">Find Your Place</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
