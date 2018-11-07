import * as React from 'react'
import './Lead.css'
import { RouteComponentProps } from 'react-router-dom';
import { Statics } from '../statics';
import { LeadData } from './Leads';

interface Props {
    leadid: string;
}

export class Lead extends React.Component<RouteComponentProps<Props>, {}> {
    lead: LeadData;
    constructor(props: RouteComponentProps<Props>) {
        super(props);
        if (Statics.staticUser === null) {
            props.history.push("/login")
        }
    }
    componentDidMount() {
        fetch("/api/lead/getLead", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "lead-id": this.props.match.params.leadid
            }
        }).then(x => x.json()).then(x => { this.lead = x; this.setState({}) }).catch(console.log)
    }
    render() {
        if (!this.lead) {
            return (
                <p>loading</p>
            )
        }
        else {
            console.log(this.lead)
            return <div>
                <p>firstname: {this.lead.firstname}</p>
                {this.lead.middlenames === "" ? "" :
                    <p>{"middlename" + (this.lead.middlenames.split(" ").length === 1 ? "" : "s")}: {this.lead.middlenames}</p>}
                <p>lastname: {this.lead.lastname}</p>
                <p>email: {this.lead.emails.join(", ")}</p>
                <p>phone numbers: {this.lead.phoneNumbers.join(", ")}</p>
                <p>sex: {(this.lead.sex ? "fe" : "") + "male"}</p>
                <p>company: {this.lead.company}</p>
                <p>company position: {this.lead.companyPosition}</p>
                <p>expertise: {this.lead.expertise.join(", ")}</p>
                {Object.getOwnPropertyNames(this.lead.userDefinedData ? this.lead.userDefinedData : {}).map((value, index) => {
                    if (Array.isArray(this.lead.userDefinedData[value])) {
                        return <p>{value + ": " + this.lead.userDefinedData[value].join(", ")}</p>
                    }
                    return <p>{value + ": " + this.lead.userDefinedData[value]}</p>
                })}
                <button onClick={() => {
                    if (confirm("are you sure you wanna delete this?")) {
                        fetch("/api/lead/deleteLead", {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                "id": this.lead._id
                            },
                        }).then(x => {
                            window.history.back();

                        }).catch(console.log)
                    }
                }}>delete</button>
            </div>
        }
    }
}