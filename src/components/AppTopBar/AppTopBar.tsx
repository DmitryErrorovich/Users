import React from 'react';
import { AppBar, Button, Switch, Typography } from "@material-ui/core";
import get from 'lodash/get';
import { ISignInInitialState } from 'types/signIn';
import { useMemo } from 'react';

interface IProps {
    handleThemeChange: () => void;
    darkState: boolean;
    signInInfo: ISignInInitialState;
    logOut: () => void;
}

export const AppTopBar = ({ handleThemeChange, darkState, signInInfo, logOut }: IProps) => {
    console.log({ signInInfo })
    const isAuth = useMemo(() => !!get(signInInfo, 'token'), [signInInfo.token]);

    const handlelogOut = async () => {
        localStorage.removeItem('token')
        await logOut();
    }

    return (
        <AppBar>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Switch checked={darkState} onChange={handleThemeChange} />
                    <Typography>Change theme</Typography>
                </div>
                {isAuth
                    ? <Button onClick={handlelogOut} color="inherit" variant="outlined" >Log Out</Button>
                    : <Button href='/sign_in' color="inherit" variant="outlined" >Log In</Button>
                }
            </div>
        </AppBar>
    )
}