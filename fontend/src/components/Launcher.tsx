import * as React from 'react'
import Cookies from 'universal-cookie';
import { parseSetStaticUser } from '../statics';
import { urlBase64ToUint8Array, serviceWorkerCheck, startWebWorker } from '../utilities';

interface ThisProps {
    callback: () => void
}

export class Launcher extends React.Component<ThisProps, {}> {
    constructor(props: ThisProps) {
        super(props);

    }
    render() {

        return (
            <div>

            </div>
        )
    }
    componentDidMount() {
        serviceWorkerCheck()
        let c = new Cookies()
        let isCookieAllowed = c.get("isCookieAllowed") || null;
        if (isCookieAllowed === null) {
            if (confirm("By clicked \"ok\" you allow cookies to be used on this site")) {
                c.set("isCookieAllowed", "1", { expires: new Date("Fri, 31 Dec 9999 23:59:59 GMT") })
                isCookieAllowed = "1"
            }
            else {
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                return;
            }
        }
        let apiKey = c.get("apiKey") || null
        let username = c.get("username") || null
        if (apiKey === null || username === null) {
            this.props.callback()
            return;
        }
        fetch("/api/user/checkApiKey", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "key": apiKey,
                "username": username
            },
        }).then(response => {
            if (response.status === 200) {
                response.json().then(x => {
                    parseSetStaticUser(x).then(() => {
                        this.props.callback()
                    })
                })
            }
            else {
                this.props.callback()
            }
        })
    }
}
