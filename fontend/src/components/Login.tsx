import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { parseSetStaticUser, Statics } from '../statics';

export class Login extends React.Component<RouteComponentProps<{}>, {}> {
    username: HTMLInputElement
    password: HTMLInputElement
    constructor() {
        super();

    }
    render() {
        return (
            <div>
                <label>username</label><input onKeyUp={(e) => { if (e.keyCode === 13) { this.login() } }} onChange={(arg) => { this.username = arg.target }} type="text" />
                <br />
                <label>password</label><input onKeyUp={(e) => { if (e.keyCode === 13) { this.login() } }} onChange={(arg) => { this.password = arg.target }} type="password" />
                <br />
                <button onClick={this.login}>login</button>
            </div>
        )
    }
    login = () => {
        fetch("/api/user/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "username": this.username.value,
                "password": this.password.value
            }
        }).then(response => {
            switch (response.status) {
                case 200:
                    response.json().then(user => {
                        parseSetStaticUser(user).then(() => {
                            console.log(Statics.staticUser)
                            console.log(JSON.stringify(Statics.staticUser, function (key, value) {
                                return (typeof value === 'function') ? value.toString() : value;
                            }))
                            this.props.history.push("/home")
                        })
                    })
                    break;
                case 400:
                    alert("username and password didnt match")
                    break;
                default:
                    alert("wait what?")
                    break;
            }
        })
    }
}
