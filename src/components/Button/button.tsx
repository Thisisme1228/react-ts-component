import classNames from "classnames";
import React from "react";

export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

export interface BaseButtonProps {
    /**
     * Add custom class
     */
    className?: string;
    /**
     * Whether disable Button
     */
    disabled?: boolean;
    /**
     * How large should the button be?
     */
    size?: ButtonSize;
    /**
     * What button type to use
     */
    btnType?: ButtonType;
    /**
     * Button contents
     */
    children?: React.ReactNode;
    /**
     * Whether is hyperlinked
     */
    href?: string,
}

export type ButtonProps =
    BaseButtonProps
    & Partial<React.ButtonHTMLAttributes<HTMLElement> & React.AnchorHTMLAttributes<HTMLElement>>

/** Button component for user interaction*/
export const Button: React.FC<ButtonProps> = ({
                                                  btnType = 'default',
                                                  className,
                                                  disabled = false,
                                                  size,
                                                  children,
                                                  href,
                                                  ...restProps
                                              }) => {
    // btn, btn-lg, btn-primary
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled,
    })
    if (btnType === 'link' && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

export default Button
