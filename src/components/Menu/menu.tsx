import React, {createContext, useState} from 'react';
import {MenuItemProps} from './menuItem';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface BaseMenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    children?: React.ReactNode;
    defaultOpenSubMenus?: string[],
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode,
    defaultOpenSubMenus?: string[],
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

export type MenuProps = BaseMenuProps & Partial<React.HTMLAttributes<HTMLElement>>

const Menu: React.FC<MenuProps> = (props) => {
    const {
        className,
        mode = 'horizontal',
        style,
        defaultIndex = '0',
        children,
        onSelect,
        defaultOpenSubMenus = [],
        ...restProps
    } = props;
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    })
    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive,
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    }
    const ulProps = {
        className: classes,
        style,
        ...restProps
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            //by this way you can access a series of child component properties
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const {displayName} = childElement.type
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, {index: index.toString()});
            } else {
                console.error('warning Menu has a child which is not a Menuitem component');
            }
        })
    }
    return (
        <ul {...ulProps}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

export default Menu;