import * as React from 'react'
import './ShvenNavBar.css'
import { RouteComponentProps } from 'react-router-dom';
import { Statics } from '../statics';
import { flattenArray } from '../utilities';

//complete ripoff https://codepen.io/Shven/pen/chKqD

interface ShvenNavBarProps {
    menuItems: MenuItem[]
}

export interface MenuItem {
    label: JSX.Element;
    children?: MenuItem[];
}

export class ShvenNavBar extends React.Component<ShvenNavBarProps, {}> {

    constructor() {
        super();

    }
    render() {
        return (
            <div>

                <input type="checkbox" id="menu" name="menu" className="menu-checkbox" />
                <div className="menu">
                    <label className="menu-toggle" htmlFor="menu"><span>Toggle</span></label>
                    <ul>
                        {(() => {
                            let key = 0;
                            const process = (menuItem: MenuItem): JSX.Element => {
                                let id = key;
                                key++;
                                if (!(menuItem.children === undefined || menuItem.children.length === 0)) {
                                    let labels = menuItem.children.map(process)
                                    let menuId = "menu-" + id;
                                    return <li key={id}>
                                        <label htmlFor={menuId} children={menuItem.label} />
                                        <input type="checkbox" id={menuId} name={menuId} className="menu-checkbox" />
                                        <div className="menu">
                                            <label className="menu-toggle" htmlFor={menuId}><span>Toggle</span></label>
                                            <ul children={labels} />
                                        </div>
                                    </li>
                                }
                                else {
                                    return <li key={id} children={menuItem.label} />
                                }
                            }
                            return this.props.menuItems.map(process)
                        })()}
                    </ul>
                </div>
            </div>
        )
    }
}

export function closeNavBar() {
    let checkboxes = document.getElementsByClassName("menu-checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
        (checkboxes.item(i) as HTMLInputElement).checked = false;
    }

}