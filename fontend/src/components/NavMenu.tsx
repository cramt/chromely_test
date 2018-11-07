import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./NavMenu.css"
import { Statics, updateGroups, setStaticUser } from '../statics';
import { ShvenNavBar, MenuItem, closeNavBar } from './ShvenNavBar';
import Cookies from 'universal-cookie';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        let menuItems: MenuItem[] = ([] as MenuItem[]).concat(Statics.staticUser === null ? [
            {
                label: <NavLink onClick={closeNavBar} to={'/login'} exact activeClassName='active'>
                    Login
        </NavLink>
            },
            {
                label: (<NavLink onClick={closeNavBar} to={'/register'} activeClassName='active'>
                    Register
        </NavLink>),
            }
        ] : [
                {
                    label: <NavLink to={"/login"} onClick={() => {
                        setStaticUser(null);
                        let c = new Cookies()
                        c.remove("username")
                        c.remove("apiKey")
                        closeNavBar()
                    }}>
                        Logout
                </NavLink>
                },
                {
                    label: (<a>Leads</a>),
                    children: Statics.staticGroups.map(x => {
                        return {
                            label: <NavLink onClick={closeNavBar} to={"/leads/" + x.name} activeClassName="active">
                                {x.name}
                            </NavLink>
                        }
                    })
                },
                {
                    label: (<a>Groups</a>),
                    children: Statics.staticGroups.map(x => {
                        return {
                            label: <NavLink onClick={closeNavBar} to={"/group/" + x.name} activeClassName="active">
                                {x.name}
                            </NavLink>
                        }
                    }).concat([{
                        label: <a style={{ cursor: "pointer" }} onClick={() => {
                            let name = prompt("the name of your new group")
                            if (name === null || name === "") {
                                return;
                            }
                            fetch("/api/group/create", {
                                method: "POST",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    "groupname": name
                                }
                            }).then(x => {
                                if (x.status !== 200) {
                                    console.log(new Error("status code: " + x.status))
                                }
                                else {
                                    x.json().then(newGroup => {
                                        updateGroups(Statics.staticGroups.concat([newGroup]))
                                        this.setState({})
                                    })
                                }
                            }).catch(console.log)
                        }}>+ create new</a>
                    }])
                }
            ])
        return <ShvenNavBar menuItems={menuItems} />
    }
}