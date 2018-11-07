import * as React from 'react'
import './Home.css'
import { RouteComponentProps } from 'react-router-dom';
import { Statics } from '../statics';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(props: RouteComponentProps<{}>) {
        super();
        if (Statics.staticUser === null) {
            props.history.push("/login")
        }
    }
    render() {
        return (
            <div>
                <img src={require("../../logo.png")} width="700px" height="300px" />
            </div>
        )
    }
}
