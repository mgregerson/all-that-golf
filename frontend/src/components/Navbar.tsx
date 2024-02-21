import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { createClient } from '@supabase/supabase-js';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { supabase } from '@/lib/supabase';
import logo from '../assets/logo.png';

interface Setting {
  title: string;
  action?: () => void;
  link?: string;
}

const pages = [
  { title: 'All Golf Courses', link: 'courses' },
  { title: 'My Rounds', link: 'my-rounds' },
  { title: 'New Round', link: 'new-round' },
  { title: 'Add a New Course', link: 'add-course' },
];

const settings: Setting[] = [
  { title: 'Profile', link: '/profile' },
  { title: 'Account', link: '/account' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  // Get the user's profile picture and use it as the photo for the avatar.

  const [session, setSession] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Error logging out:', error.message);
      return;
    }
    console.log('Logged out');
    navigate('/login');
  };

  console.log('session=', session)

  return (
    <AppBar
      sx={{
        backgroundColor: 'green',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        height: 60,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={'/'}>
              <img
                src={logo}
                alt="Logo"
                style={{ maxWidth: 60, maxHeight: 80 }}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link
                    key={page.title}
                    to={page.link}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="a"
            href="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={logo}
                alt="Logo"
                style={{ maxWidth: 60, maxHeight: 80, marginRight: 2 }}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page.title}
                to={page.link}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button
                color="inherit"
                variant="outlined"
                sx={{
                  mr: 1,
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'green',
                  },
                }}
              >
                Sign In
              </Button>
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: 'none', color: 'inherit', marginRight: "10px" }}
            >
              <Button
                color="inherit"
                variant="outlined"
                sx={{
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'green',
                  },
                }}
              >
                Sign Up
              </Button>
            </Link>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                return (
                  <Link
                    to={setting.link!}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={handleCloseUserMenu}
                    key={setting.title}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                );
              })}
              {session && (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
              {!session && (
                <Link
                  to={'/login'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onClick={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
