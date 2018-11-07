interface User {
    apiKey: string;
    apiKeyExpiration: Date;
    email: string;
    username: string;
    __v: number;
    _id: string;
}
interface Group {
    name: string;
    users: string[];
    admin: string;
    leads: string[];
    __v: number;
    _id: string;
}
let staticUser: User;
let staticGroups: Group[];
let onUserChangeCallbacks: ((user: User) => void)[] = []
export class Statics {
    static get staticUser(): User | null {
        return staticUser || null
    }
    static onUserChange(cb: (user: User) => void): void {
        onUserChangeCallbacks[onUserChangeCallbacks.length] = cb
    }
    static get staticGroups(): Group[] | null {
        return staticGroups || null;
    }
}

export function updateGroups(groups: Group[]) {
    staticGroups = groups
}

export function parseSetStaticUser(user: any): Promise<{}> {
    return new Promise((resolve, reject) => {
        tryParseSetStaticUser(user).then(x => {
            if (!x) {
                reject(new Error("the object given couldnt be parsed"))
            }
            else {
                resolve()
            }
        })
    })
}
export async function tryParseSetStaticUser(user: any): Promise<boolean> {
    if (
        typeof user.apiKey === "string" &&
        (typeof user.apiKeyExpiration === "string" ||
            user.apiKeyExpiration instanceof Date) &&
        typeof user.email === "string" &&
        typeof user.username === "string" &&
        typeof user.__v === "number" &&
        typeof user._id === "string"
    ) {
        if (typeof user.apiKeyExpiration === "string") {
            user.apiKeyExpiration = new Date(user.apiKeyExpiration)
        }
        await setStaticUser(user)
        return true
    }
    return false
}
export function setStaticUser(user: User): Promise<{}> {
    return Promise.all([new Promise((resolve, reject) => {
        staticUser = user
        onUserChangeCallbacks.forEach(x => x(user))
        resolve()
    }), new Promise((resolve, reject) => {
        fetch("/api/user/getUsersGroups", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "username": user.username
            },
        }).then(x => {
            if (x.status !== 200) {
                reject("status code: " + x.status)
            }
            else {
                x.json().then(y => {
                    staticGroups = y
                    console.log(staticGroups)
                    resolve()
                })
            }
        }).catch(reject)
    })])
}