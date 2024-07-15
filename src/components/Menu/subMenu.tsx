import React, {useContext, FunctionComponentElement, useState} from "react";
import classNames from 'classnames';
import {MenuContext} from "./menu";
import {MenuItemProps} from "./menuItem";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon/Icon";

export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string,
    children: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, className, children}) => {
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpened)
    const classes = classNames('menu-item submenu-item', classNames, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick,
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
        },
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
        },
    } : {}
    const renderChildren = () => {
        return React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            const {displayName} = childElement.type
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {index: `${index}-${i}`});
            } else {
                console.error('warning Menu has a child which is not a Menuitem component');
            }
        })
    }
    const subMenuClasses = classNames('submenu', {
        'menu-opened': menuOpen
    })
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon={faChevronDown} className='arrow-icon' size="sm"/>
            </div>
            <ul className={subMenuClasses}>
                {renderChildren()}
            </ul>
        </li>
    )
}

SubMenu.displayName = 'SubMenu';

export default SubMenu