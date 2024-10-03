import React, { useState } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useSearch } from "../context/search";



const drawerWidth = 240;
const navItems = ['Design', 'Components', 'Develop', 'Resource', 'Blog'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
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
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));



function Header(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [data, setData] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [error, setError] = useState('');
    const [heading, setHeading] = useState("")
    const navigate = useNavigate();
    const [values, setValues] = useSearch();


    // Function to trigger the search
    const handleSearch = async () => {
        if (!searchWord) {
            setError('Please enter a word to search.');
            return;
        }
        console.log('Search term:', searchWord);
        try {
            const posting = await axios.post(`http://localhost:5000/api/words`, { word: searchWord });
            console.log(posting.data)
            const response = await axios.get(`http://localhost:5000/api/words/${searchWord}`);
            console.log(response.data.word);
            if (response.data.entries.length > 0) {
                setData(response.data.entries);
                setValues({ ...values, results: response.data.entries });

                setError('');
                setHeading(response.data.word)
            } else {
                setData(null);
                setError('No results found.');
            }

        } catch (error) {
            console.error("error");
        }
        // Trigger your search logic here, such as calling an API or filtering data
    };

    // Handle pressing Enter in the search input
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Trigger search when Enter is pressed
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        VOCABULARY APP
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: "auto" }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                    <Search sx={{ ml: 'auto' }}>                        <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                        <StyledInputBase
                            type="text"
                            placeholder="Search..."
                            value={searchWord}
                            onChange={(e) => {
                                setValues({ ...values, keyword: e.target.value })
                                setSearchWord(e.target.value);
                            }}
                            onKeyUp={handleKeyPress}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
                <Toolbar />
                <Typography>
                    {data.length > 0 &&
                        <h1> Results for "{heading}"</h1>


                    }

                    {data.length > 0 && (

                        <div className="showResults">

                            {data.map((item, index) => (

                                <div className='card' key={index}
                                    onClick={() => navigate(`/details/${item.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className='image'>
                                        <img
                                            src="./image.jpg"
                                            alt='image'
                                            width={"80%"}
                                            height={"100%"}
                                        />
                                    </div>
                                    <div className='details'>
                                        <h5>HTTPS: </h5>
                                        <h4>Data {item.matchString}-{item.label}</h4>
                                        {/* <p>{item.label}</p> */}
                                        <p>Build beautiful Design,usuable products faster.material design is a adaptable system.
                                            backed by open source code-that helps the team build high quality digital experiences {item.matchType}</p>
                                    </div>



                                </div>

                            ))}
                        </div>
                    )}

                </Typography>
            </Box>
        </Box>
    );
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Header;
