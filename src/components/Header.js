import React, { useState } from 'react'
import { AppBar, Button, Tabs, Toolbar, Typography, Tab } from "@mui/material"
import { Box } from '@mui/system'
import { Link } from "react-router-dom";
import { authActions } from '../store';
import {useDispatch, useSelector} from "react-redux";
import { useStyles } from './utils';
const Header = () => {
    const classes=useStyles();
    const dispatch = useDispatch();
    const [value, setValue] = useState();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    return (
        <AppBar position='stickys' sx={
            { background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(108,108,218,1) 76%, rgba(0,212,255,1) 100%);" }
        }>
            <Toolbar>
                <Typography className='classes.font' variant='h4'>Blogify</Typography>

                {isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
                    <Tabs indicatorColor="secondary" textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                        <Tab className={classes.font} LinkComponent={Link} to="/blogs" label="All Blogs" /> {/*"value"th tab will be highlighted*/}
                        <Tab className={classes.font} LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                        <Tab className={classes.font} LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
                    </Tabs>
                </Box>}

                <Box display="flex" marginLeft="auto">
                {!isLoggedIn && <> <Button variant="contained"
                        LinkComponent={Link} to="/auth"
                        sx={{ margin: 1, borderRadius: 10 }}
                        color="warning"
                    >Login
                    </Button>
                    <Button variant="contained"
                        LinkComponent={Link} to="/auth"
                        sx={{ margin: 1, borderRadius: 10 }}
                        color="warning"
                    >SignUp
                    </Button> </>}

                    {isLoggedIn && 
                    (<Button 
                        onClick={() => dispatch(authActions.logout())}
                        variant="contained"
                        LinkComponent={Link} to="/auth"
                        sx={{ margin: 1, borderRadius: 10 }}
                        color="warning"
                    >LogOut
                    </Button>) }
                </Box> 
            </Toolbar>
        </AppBar>
    )
}

export default Header