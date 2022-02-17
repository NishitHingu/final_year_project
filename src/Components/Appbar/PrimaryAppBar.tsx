import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { getStockList, useAppDispatch } from "../../app/hooks";
import { fetchHistoricalStockData, fetchSearchedStockInfo, fetchStockNews } from "../../features/searchBar/Stock";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  textDecoration: "none",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  flexGrow: 1,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
    flexGrow: 0,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "inherit",
  // '& .MuiInputBase-input': {
  //   width: '100%',
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //   transition: theme.transitions.create('width'),
  //   [theme.breakpoints.up('sm')]: {
  //     width: '15rem',
  //   },
  //   [theme.breakpoints.up('md')]: {
  //     '&:focus': {
  //       width: '20rem',
  //     },
  //   }
  // },
}));

export default function PrimaryAppBar(props: { name: string }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useAppDispatch();
  const searchOptions = getStockList();
  const history = useHistory();

  const handleSearch = () => {
    console.log(searchTerm);
    dispatch(fetchSearchedStockInfo(searchTerm));
    dispatch(fetchHistoricalStockData(searchTerm));
    dispatch(fetchStockNews(searchTerm));
    setSearchTerm("");
    history.push("/stock");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ padding: "0.25rem 1rem" }}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={9}>
            <Grid
              container
              flexDirection="row"
              alignItems="center"
              justifyContent="space-around"
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Stnks
              </Typography>
              <Autocomplete
                value={searchTerm}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setSearchTerm(newValue);
                  }
                  console.log(newValue);
                }}
                size="small"
                options={searchOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    hiddenLabel
                    style={{ backgroundColor: "whitesmoke" }}
                    variant="outlined"
                    placeholder="Search…"
                    sx={{ width: 300 }}
                  />
                )}
              />
              <div style={{ flexGrow: 1, paddingLeft: "2rem" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSearch()}
                >
                  Search
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Grid container justifyContent="space-around" alignItems="center">
              <StyledNavLink activeStyle={{ fontSize: "1.2rem" }} to="/home">
                Home
              </StyledNavLink>
              <StyledNavLink activeStyle={{ fontSize: "1.2rem" }} to="/stock">
                Stock
              </StyledNavLink>
              <StyledNavLink activeStyle={{ fontSize: "1.2rem" }} to="/about">
                About
              </StyledNavLink>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}
