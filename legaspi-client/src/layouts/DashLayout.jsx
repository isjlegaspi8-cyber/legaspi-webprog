import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Button from '@mui/material/Button';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 260;
const dashboardNavItems = [
  {
    label: 'Dashboard',
    title: 'Dashboard',
    to: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'Reports',
    title: 'Reports',
    to: '/dashboard/reports',
    icon: AssessmentIcon,
  },
  {
    label: 'Users',
    title: 'Users',
    to: '/dashboard/users',
    icon: PeopleIcon,
  },
];

const pendragonTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#facc15' },
    secondary: { main: '#c084fc' },
    background: { default: '#020617', paper: '#09101f' },
    text: { primary: '#f8fafc', secondary: '#cbd5e1' },
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    button: { textTransform: 'none' },
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: '#090b14',
  boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    background: '#090b14',
    color: '#f8fafc',
    borderRight: '1px solid rgba(255,255,255,0.08)',
  },
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.12),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.18),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const getPageTitle = (pathname) => {
  const match = dashboardNavItems.find((item) => item.to === pathname);
  return match ? match.title : 'Welcome';
};

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => navigate('/');

  return (
    <ThemeProvider theme={pendragonTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', background: '#020617' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 4, color: '#facc15' }}
            >
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, letterSpacing: '0.18em', fontWeight: 800, color: '#f8fafc' }}
            >
              PENDRAGON CONTROL
            </Typography>
            <Search sx={{ width: 'min(420px, 100%)' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                borderColor: '#fbbf24',
                color: '#f8fafc',
                textTransform: 'uppercase',
                px: 3,
                borderRadius: '999px',
                '&:hover': {
                  borderColor: '#fde68a',
                  background: 'rgba(255,255,255,0.06)',
                },
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Typography
              variant="overline"
              sx={{ color: '#fbbf24', letterSpacing: '0.35em', fontWeight: 700 }}
            >
              PENDRAGON
            </Typography>
            <IconButton onClick={handleDrawerClose} sx={{ color: '#f8fafc' }}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          <List>
            {dashboardNavItems.map(({ label, to, icon: Icon }) => (
              <ListItem key={to} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to={to}
                  selected={location.pathname === to}
                  sx={{
                    minHeight: 50,
                    px: 2.5,
                    justifyContent: open ? 'initial' : 'center',
                    color: location.pathname === to ? '#fbbf24' : '#e2e8f0',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(245,158,11,0.14)',
                      color: '#fbbf24',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(245,158,11,0.08)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: location.pathname === to ? '#fbbf24' : '#cbd5e1',
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={label} sx={{ opacity: open ? 1 : 0, color: 'inherit' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
          <DrawerHeader />
          <Box
            sx={{
              borderRadius: '2rem',
              background: 'linear-gradient(180deg, rgba(15,23,42,0.96), rgba(9,11,20,0.94))',
              p: 3,
              minHeight: 'calc(100vh - 96px)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.45)',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashLayout;
