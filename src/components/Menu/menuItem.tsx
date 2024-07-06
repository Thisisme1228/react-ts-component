import React, {useContext} from "react";
import classNames from "classnames";
import {MenuContext} from './menu'

export interface BaseMenuItemProps {
    index: number,
    disabled?: boolean,
    className?: string,
    style?: React.CSSProperties,
    children: React.ReactNode,
}

export type MenuItemProps = BaseMenuItemProps & Partial<React.HTMLAttributes<HTMLElement>>

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {index, disabled, className, style, children, ...restProps} = props;
    const context = useContext(MenuContext);
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handleClick = () => {
        if (context.onSelect && !disabled) {
            context.onSelect(index)
        }
    }
    const liProps = {
        className: classes,
        style,
        onClick: handleClick,
        ...restProps
    }
    return (
        <li {...liProps}>
            {children}
        </li>
    )
}

//react property helps identify type
MenuItem.displayName = 'MenuItem';

export default MenuItem;