import React, {createContext, useState} from 'react';
import classNames from 'classnames';
import {BaseAlertProps} from "../Alert/alert";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: number) => void;

export interface BaseMenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    children?: React.ReactNode;
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({index: 0})

export type MenuProps = BaseMenuProps & Partial<React.HTMLAttributes<HTMLElement>>

const Menu: React.FC<MenuProps> = (props) => {
    const {className, mode = 'horizontal', style, defaultIndex = 0, children, onSelect, ...restProps} = props;
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
    })
    const handleClick = (index: number) => {
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive,
        onSelect: handleClick,
    }
    const ulProps = {
        className: classes,
        style,
        ...restProps
    }
    return (
        <ul {...ulProps}>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    )
}

export default Menu;