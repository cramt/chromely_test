import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { routes } from './routes';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { Launcher } from './components/Launcher';


//const isDevelopment = process.env.NODE_ENV !== 'production'
const isDevelopment = true
//color #1A6798
//color pallet http://paletton.com/#uid=13v0u0ksctQhvC4mwvluwnYzxiW
//TODO: implement this peice of shit https://www.npmjs.com/package/react-big-calendar
render()

function render() {
    ReactDOM.render(
        <Launcher callback={() => {
            ReactDOM.render(
                <AppContainer>
                    <BrowserRouter children={routes} />
                </AppContainer>,
                document.getElementById('app-container')
            )
        }} />,
        document.getElementById('app-container')
    )
}

/*
if (isDevelopment && module && module.hot) {
    console.log('enabling hot load')
    module.hot.accept('./components/App', () => {
        render()
    })
}
*/