import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {

    const router = useHistory();
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {logout} = useActions();

    return (
        <Layout.Header>
            <Row justify={'end'}>
                {
                    isAuth
                    ?
                        <>
                            <div style={{color: 'white'}}>
                                {user.username}
                            </div>

                            <Menu theme={'dark'} mode={'horizontal'} selectable={false}>
                                <Menu.Item
                                    onClick={logout}
                                    key={1} style={{width: 100}}
                                >
                                    Log out
                                </Menu.Item>
                            </Menu>
                        </>
                    :
                        <Menu theme={'dark'} mode={'horizontal'} selectable={false}>
                            <Menu.Item
                                onClick={() => router.push(RouteNames.LOGIN)}
                                key={1} style={{width: 100}}
                            >
                                Login
                            </Menu.Item>
                        </Menu>
                }

            </Row>
        </Layout.Header>
    );
};

export default Navbar;
