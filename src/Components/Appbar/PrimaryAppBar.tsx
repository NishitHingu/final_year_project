import { HTMLAttributes, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Autocomplete, Button, Collapse, Grid, TextField } from "@mui/material";
import { getStockList, useAppDispatch } from "../../app/hooks";
import {
  fetchHistoricalStockData,
  fetchSearchedStockInfo,
  fetchStockNews,
  StockList,
} from "../../features/searchBar/Stock";
import { matchSorter } from "match-sorter";
import CircularProgress from "@mui/material/CircularProgress";

// const StyledNavLink = styled(NavLink)(({ theme }) => ({
//   color: theme.palette.getContrastText(theme.palette.primary.main),
//   textDecoration: "none",
// }));

const CustomFlexCollapse = styled(Collapse)((props) => ({
  display: "flex",
  backgroundColor: "whitesmoke",
  borderBottom: "1pz solid black",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
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

function determineIfStringOrStockList(
  toBeDetermined: StockList | string | null
): toBeDetermined is StockList {
  if ((toBeDetermined as StockList).Ticker) {
    return true;
  } else {
    return false;
  }
}

export default function PrimaryAppBar(props: { name: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [collapseSearch, setCollapseSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentSearchedString, setCurrentSearchedString] = useState("");
  const dispatch = useAppDispatch();
  const searchOptions = getStockList();

  const handleSearch = () => {
    console.log(searchTerm);
    setCollapseSearch(true);
    dispatch(fetchSearchedStockInfo(searchTerm));
    dispatch(fetchHistoricalStockData(searchTerm));
    dispatch(fetchStockNews(searchTerm));
    setSearchTerm("");
  };

  const filterOptionsAutoComplete = (
    options: StockList[],
    { inputValue }: any
  ) => {
    // searching the final list which we get in the options object
    if (inputValue === null) return options;
    let result = options;
    result = matchSorter(result, inputValue, { keys: ["Name", "Ticker"] });
    console.log(result);
    return result;
  };

  const handleSearchChange = (
    event: any,
    newValue: string | StockList | null
  ) => {
    if (newValue === null) {
      setSearchTerm("");
    } else if (determineIfStringOrStockList(newValue)) {
      setSearchTerm(newValue?.Ticker ? newValue?.Ticker : "");
    } else if (typeof newValue === "string") {
      setSearchTerm(newValue);
    }
    console.log(newValue);
  };

  const renderOption = (
    // props is not typedefed as HTMLAttributes<HTMLLIElement> here bcz HTMLAttributes<HTMLLIElement> does not have the key attribute
    // which we need to modify here. props has the key attribute.
    props: any,
    options: StockList
  ) => {
    props.key = options.Ticker;
    return (
      <Box
        component="li"
        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
        {...props}
      >
        {options.Ticker}: {options.Name}
      </Box>
    );
  };

  console.log(searchTerm);
  return (
    <CustomFlexCollapse
      in={collapseSearch}
      collapsedSize={100}
      sx={{ flexGrow: 1 }}
      timeout={1000}
    >
      {/* <Collapse in={collapseSearch} collapsedSize={100} sx={{ flexGrow: 1 }} style={{height: "100vh", backgroundColor:"gray"}}> */}
      {/* <Grid container flexGrow={1} alignItems="center" justifyContent="center"> */}
      <Grid
        container
        alignItems="center"
        justifyContent="space-around"
        marginBottom={collapseSearch ? 0 : 20}
        flexDirection={collapseSearch ? "row" : "column"}
      >
        <Grid item>
          <Typography
            variant={!collapseSearch ? "h3" : "h6"}
            textAlign="center"
            margin={!collapseSearch ? 5 : 2}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Stnks
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
          >
            <Autocomplete
              inputValue={currentSearchedString}
              freeSolo
              // open={true}
              loading={isLoading}
              onChange={handleSearchChange}
              size="medium"
              options={searchOptions}
              onInputChange={(e, value) => setCurrentSearchedString(value)}
              filterOptions={filterOptionsAutoComplete}
              getOptionLabel={(option) => option.Name}
              renderOption={renderOption}
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
              // renderInput={(params) => (
              //   <TextField
              //     {...params}
              //     placeholder="Search"
              //     variant="outlined"
              //     autoFocus
              //     style={{ backgroundColor: "whitesmoke" }}
              //     sx={{ width: 300 }}
              //     InputProps={{
              //       ...params.InputProps,
              //       endAdornment: (
              //         <>
              //           {isLoading ? (
              //             <CircularProgress color="inherit" size={20} />
              //           ) : null}
              //           {params.InputProps.endAdornment}
              //         </>
              //       ),
              //     }}
              //   />
              // )}
            />
            <Grid item style={{ paddingLeft: "2rem" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSearch()}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12} sm={3}>
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
          </Grid> */}
      {/* </Grid> */}
      {/* </Collapse> */}
    </CustomFlexCollapse>
  );
}
