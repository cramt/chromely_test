export function flattenArray<T>(arr: any[]): T[] {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten)
    })
}
export function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function serviceWorkerCheck() {
    return;
    if ('serviceWorker' in navigator) {
        (async () => {
            let scripts = (await navigator.serviceWorker.getRegistrations()).map(x => {
                let scriptURLarray = x.active.scriptURL.split("/")
                return scriptURLarray[scriptURLarray.length - 1]
            })
            if (scripts.indexOf("sw.js") !== 0 || true) {
                const publicKey: Uint8Array = urlBase64ToUint8Array((await (await fetch("/api/sw/getPublicKey", {
                    method: "POST"
                })).json()).public_key)
                const register = await navigator.serviceWorker.register("/sw.js", {
                    scope: "/"
                })
                const subscription = await register.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: publicKey
                })
                await fetch("/api/sw/subscribe", {
                    method: "POST",
                    headers: {
                        "subobject": JSON.stringify(subscription)
                    }
                })
            }
        })().catch(console.log)
    }
}

export function startWebWorker(func: () => void): Worker {
    let code = func.toString()
    code = code.substring(code.indexOf("{") + 1, code.indexOf("}"))
    const blob = new Blob([code], { type: "application/javascript" });
    const worker_script = URL.createObjectURL(blob);
    return new Worker(worker_script)
}