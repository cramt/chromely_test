import * as React from 'react'
import './Group.css'
import { RouteComponentProps } from 'react-router-dom';

interface Props {
    name: string;
}

export class Group extends React.Component<RouteComponentProps<Props>, {}> {
    constructor(props: RouteComponentProps<Props>) {
        super(props);
        let name = props.match.params.name

    }
    render() {
        return (
            <div>
                <h1>group</h1>
            </div>
        )
    }
}
