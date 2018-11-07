import * as React from 'react'
import './Leads.css'
import { RouteComponentProps } from 'react-router-dom';
import { Statics } from '../statics';

interface Props {
    groupname: string;
    search?: string;
}

export interface LeadModel {
    emails: string[];
    firstname: string;
    middlenames: string;
    lastname: string;
    company: string;
    phoneNumbers: string[];
    sex: boolean;
    expertise: string[];
    companyPosition: string;
    userDefinedData: any;
}

export interface LeadData extends LeadModel {
    _id: string;
    __v: number;
}

export class Leads extends React.Component<RouteComponentProps<Props>, {}> {
    leads: LeadData[];
    constructor(props: RouteComponentProps<Props>) {
        super(props);
        if (Statics.staticUser === null) {
            props.history.push("/login")
        }
        props.match.params.search = props.match.params.search || null;
        /*
        fetch("/api/lead/addLead", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                emails: JSON.stringify(["a", "b"]),
                firstname: "person",
                middlenames: "",
                lastname: "McPersonface",
                company: "McCompanyface",
                "phone-numbers": JSON.stringify(["2432432", "5343453"]),
                sex: "true",
                expertise: JSON.stringify(["coding 'n stuff", "shitposting"]),
                "company-position": "that gay boi",
                "user-defined-data": JSON.stringify({ REEEEE: 23 }),
                "group-name": props.match.params.groupname
            }
        }).then(x => {
            x.json().then(console.log)
        })
        */
    }
    updateLeads(searchTerm: string) {
        if (searchTerm === "") {
            searchTerm = undefined
        }
        fetch("/api/lead/getGroupsLeads", {
            method: "POST",
            headers: Object.assign({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "group-name": this.props.match.params.groupname,
            }, this.props.match.params.search ? { "search-term": this.props.match.params.search } : {})
        }).then(x => x.json()).then(x => { this.leads = this.leadsParser(x); this.setState({}) }).catch(console.log)
    }
    componentDidMount() {
        this.updateLeads("")
    }
    leadsParser(str: string): LeadData[] {
        return str as any as LeadData[]
    }
    leadUIMapper: UIMapper = {
        name(lead) {
            return lead.firstname + (lead.middlenames === " " ? "" : " " + lead.middlenames + " ") + lead.lastname
        },
        email(lead) {
            return lead.emails.join(", ")
        },
        "phone numbers": (lead) => {
            return lead.phoneNumbers.join(", ")
        },
        company(lead) {
            return lead.company
        },
        sex(lead) {
            return lead.sex ? "female" : "male"
        },
        expertise(lead) {
            return lead.expertise.join(", ")
        },
        "company position": (lead) => {
            return lead.companyPosition;
        },
        "more": (lead) => {
            return <button onClick={() => {
                this.props.history.push("/lead/" + lead._id)
            }}>more</button>
        }
    }
    tableMapperFilter = (() => {
        let re = {} as TableMapperFilter
        Object.getOwnPropertyNames(this.leadUIMapper).forEach(x => {
            re[x] = true
        })
        return re
    })()
    render() {
        return <div>
            {Object.getOwnPropertyNames(this.leadUIMapper).map((value, index) => {
                return <div key={index}>
                    <input type="checkbox" defaultChecked={true} onChange={(e) => {
                        this.tableMapperFilter[value] = e.target.checked
                        this.setState({})
                    }} />
                    <label>{value}</label>
                </div>
            })}
            <input type="text" defaultValue={this.props.match.params.search || ""} onChange={(e) => {
                this.props.match.params.search = e.currentTarget.value
                this.setState({})
                this.updateLeads(this.props.match.params.search)
            }} onBlur={(e) => {
                this.props.history.push("/leads/" + this.props.match.params.groupname + (e.currentTarget.value === "" ? "" : ("/" + e.currentTarget.value)))
            }} onKeyUp={(e) => {
                if (e.keyCode === 13) {
                    this.props.history.push("/leads/" + this.props.match.params.groupname + (e.currentTarget.value === "" ? "" : ("/" + e.currentTarget.value)))
                }
            }} />
            <br />
            <button onClick={() => {
                this.props.history.push("/newLead/" + this.props.match.params.groupname)
            }}>new lead</button>
            {(() => {
                if (!this.leads) {
                    return <p>loading</p>
                }
                if (this.leads.length === 0) {
                    return <p>no leads</p>
                }
                return <div>
                    <table className="greyGridTable">
                        <thead>
                            <tr>
                                {Object.getOwnPropertyNames(this.leadUIMapper).map((value, index) => {
                                    if (this.tableMapperFilter[value]) {
                                        return <th key={index}>{value}</th>
                                    }
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.leads.map((lead, lIndex) => {
                                return <tr key={lIndex}>
                                    {Object.getOwnPropertyNames(this.leadUIMapper).map((tableMap, index) => {
                                        if (this.tableMapperFilter[tableMap]) {
                                            return <td key={index}>{this.leadUIMapper[tableMap](lead)}</td>
                                        }
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            })()}
        </div>

    }
}
interface UIMapper {
    [key: string]: (lead: LeadData) => string | JSX.Element
}
interface TableMapperFilter {
    [key: string]: boolean
}