import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { parseSetStaticUser } from '../statics';

export class Register extends React.Component<RouteComponentProps<{}>, {}> {
    email: HTMLInputElement
    username: HTMLInputElement
    password1: HTMLInputElement
    password2: HTMLInputElement
    constructor() {
        super();

    }
    render() {
        return (
            <div>
                <label>email</label>
                <input onKeyUp={(e) => { if (e.keyCode === 13) { this.login() } }} onChange={(arg) => { this.email = arg.target }} type="text" />
                <br />
                <label>username</label>
                <input onKeyUp={(e) => { if (e.keyCode === 13) { this.login() } }} onChange={(arg) => { this.username = arg.target }} type="text" />
                <br />
                <label>password</label>
                <input onKeyUp={(e) => { if (e.keyCode === 13) { this.login() } }} onChange={(arg) => { this.password1 = arg.target }} type="password" />
                <br />
                <label>repeat password</label>
                <input onKeyUp={(e) => { if (e.keyCode === 13) { this.login() } }} onChange={(arg) => { this.password2 = arg.target }} type="password" />
                <br />
                <button onClick={this.login}>login</button>
            </div>
        )
    }
    login = () => {
        if (this.password1.value !== this.password2.value) {
            alert("the passwords gotta match")
            return
        }
        fetch("/api/user/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "email": this.email.value,
                "username": this.username.value,
                "password": this.password1.value
            }
        }).then(response => {
            switch (response.status) {
                case 200:
                    response.json().then(user => {
                        parseSetStaticUser(user).then(() => {
                            this.props.history.push("/home")
                        })
                    })
                    break;
                case 406:
                    alert("username or email already taken")
                    break;
                default:
                    alert("wait what?, status code: " + response.status)
                    break;
            }
        })
    }
}
