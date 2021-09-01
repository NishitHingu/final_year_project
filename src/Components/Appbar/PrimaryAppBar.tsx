import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { styled, alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';

const StyledNavLink = styled(NavLink)(({theme}) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  textDecoration: "none",
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    flexGrow: 0,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    width: '100%',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '15rem',
    },
    [theme.breakpoints.up('md')]: {
      '&:focus': {
        width: '20rem',
      },
    }
  },
}));

export default function PrimaryAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{padding: "0.25rem 1rem"}}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={9}>
            <Grid container flexDirection="row" alignItems="center" justifyContent="space-around">
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
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Stnks
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <div style={{ flexGrow: 1 }}></div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Grid container justifyContent="space-around" alignItems="center">
              <StyledNavLink activeStyle={{fontSize: "1.2rem"}} to='/home'>Home</StyledNavLink>
              <StyledNavLink activeStyle={{fontSize: "1.2rem"}} to='/stock'>Stock</StyledNavLink>
              <StyledNavLink activeStyle={{fontSize: "1.2rem"}} to='/about'>About</StyledNavLink>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}
