import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FC, ReactNode, useEffect } from 'react';

import { clearUserState } from 'store/slices/userSlice';
import { clearAppState } from 'store/slices/appSlice';
import { RootState } from 'store/store';

import { MetamaskRequired } from 'components/MetamaskRequired';
import { ConnectAccount } from 'components/ConnectAccount';
import { Notifications } from "../views/Notifications";
import { UserProfile } from "../views/UserProfile";
import { Bookmarks } from "../views/Bookmarks";
import { Messages } from "../views/Messages";
import { NftView } from "../views/NftView";
import { SignUp } from 'components/SignUp';
import { Lists } from "../views/Lists";
import { App } from 'App';


type RequireAuthProps = { children: ReactNode };
const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
    const user = useSelector((state: RootState) => state.user.user);

    return <>{user === null ? <Navigate to={"/auth"} replace={true} /> : children}</>
}

type RequireMetamaskProps = { children: ReactNode };
const RequireMetamask: FC<RequireMetamaskProps> = ({ children }) => {
    const { ethereum } = window;

    return <>{!ethereum ? <Navigate to={"/metamask-required"} replace={true} /> : children}</>
}

type RequireMetamaskAccountProps = { children: ReactNode };
const RequireMetamaskAccount: FC<RequireMetamaskAccountProps> = ({ children }) => {
    const currentMetamaskAccount = useSelector((state: RootState) => state.app.currentMetamaskAccount);

    return <>{!currentMetamaskAccount ? <Navigate to={"/connect-metamask-account"} replace={true} /> : children}</>
}

type RequiredFlowProps = { children: ReactNode };
const RequiredFlow: FC<RequiredFlowProps> = ({ children }) => {
    return <RequireMetamask>
        <RequireMetamaskAccount>
            <RequireAuth>
                {children}
            </RequireAuth>
        </RequireMetamaskAccount>
    </RequireMetamask>
}

// !DEV! - Remove this when we have a real state management system
const PurgeComp: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearUserState());
        dispatch(clearAppState());
    });
    return <></>
}

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<RequiredFlow><App /></RequiredFlow>}>
                    <Route path={"/notifications"} element={<Notifications />} />
                    <Route path={"/bookmarks"} element={<Bookmarks />} />
                    <Route path={"/messages"} element={<Messages />} />
                    <Route path={"/nft"} element={<NftView />} />
                    <Route path={"/lists"} element={<Lists />} />

                    <Route path={"/user/:id"} element={<UserProfile />} />
                </Route>
                <Route path={"metamask-required"} element={<MetamaskRequired />} />
                <Route path={"connect-metamask-account"} element={<RequireMetamask><ConnectAccount /></RequireMetamask>} />
                <Route path={"auth"} element={<RequireMetamask><RequireMetamaskAccount><SignUp /></RequireMetamaskAccount></RequireMetamask>} />

                <Route path={"purge"} element={<PurgeComp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;