import * as React from 'react'
import './NewLead.css'
import { RouteComponentProps } from 'react-router-dom';
import { Statics } from '../statics';
import { ArrayInput } from './ArrayInput';
import { LeadModel } from './Leads';

interface Props {
    groupname: string;
}

export class NewLead extends React.Component<RouteComponentProps<Props>, {}> {
    userData: LeadModel = {
        emails: [],
        firstname: "",
        middlenames: "",
        lastname: "",
        company: "",
        phoneNumbers: [],
        sex: false,
        expertise: [],
        companyPosition: "",
        userDefinedData: {}
    }
    constructor(props: RouteComponentProps<Props>) {
        super(props);
        if (Statics.staticUser === null) {
            props.history.push("/login")
        }
    }
    render() {
        return <div>

            <p>emails: <ArrayInput defaultValue={this.userData.emails} onChange={x => {
                this.userData.emails = x
            }} /></p>
            <p>firstname: <input defaultValue={this.userData.firstname} onChange={x => {
                this.userData.firstname = x.currentTarget.value
            }} /></p>
            <p>middlenames: <input defaultValue={this.userData.middlenames} onChange={x => {
                this.userData.middlenames = x.currentTarget.value
            }} /></p>
            <p>lastname: <input defaultValue={this.userData.lastname} onChange={x => {
                this.userData.lastname = x.currentTarget.value
            }} /></p>
            <p>company: <input defaultValue={this.userData.company} onChange={x => {
                this.userData.company = x.currentTarget.value
            }} /></p>
            <p>phonenumbers: <ArrayInput defaultValue={this.userData.phoneNumbers} onChange={x => {
                this.userData.phoneNumbers = x
            }} /></p>
            <p>female: <input defaultChecked={this.userData.sex} type="checkbox" onChange={x => {
                this.userData.sex = x.currentTarget.checked
            }} /></p>
            <p>expertise: <ArrayInput defaultValue={this.userData.expertise} onChange={x => {
                this.userData.expertise = x
            }} /></p>
            <p>company position: <input defaultValue={this.userData.companyPosition} onChange={x => {
                this.userData.companyPosition = x.currentTarget.value
            }} /></p>

            <h3>extra user defined data</h3>
            {Object.getOwnPropertyNames(this.userData.userDefinedData).map(x => {
                return <p>{x}: <input type="text" defaultValue={this.userData.userDefinedData[x]} onChange={e => {
                    this.userData.userDefinedData[x] = e.target.value
                }} /></p>
            })}
            <br />
            <button onClick={() => {
                let newEntry = prompt("name of the new entry")
                if (newEntry === null || newEntry === "") {
                    return;
                }
                this.userData.userDefinedData[newEntry] = "";
                this.setState({});
            }}>add new entry</button>
            <br />
            <br />
            <br />
            <button onClick={() => {
                fetch("/api/lead/addLead", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "emails": JSON.stringify(this.userData.emails),
                        "firstname": this.userData.firstname,
                        "middlenames": this.userData.middlenames,
                        "lastname": this.userData.lastname,
                        "company": this.userData.company,
                        "phone-numbers": JSON.stringify(this.userData.phoneNumbers),
                        "sex": this.userData.sex + "",
                        "expertise": JSON.stringify(this.userData.expertise),
                        "company-position": this.userData.companyPosition,
                        "user-defined-data": JSON.stringify(this.userData.userDefinedData),
                        "group-name": this.props.match.params.groupname
                    },
                }).then(response => {
                    if (response.status === 200) {
                        this.props.history.push("/leads/" + this.props.match.params.groupname)
                    }
                    else {
                        alert("some error happened")
                        console.log(response)
                        response.text().then(console.log)
                    }
                })
            }}>create lead</button>
        </div>
    }
}