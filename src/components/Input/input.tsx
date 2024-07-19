import React, {InputHTMLAttributes, ReactElement, FC, ChangeEvent, useState} from "react";
import classNames from "classnames";
import {IconProp} from "@fortawesome/fontawesome-svg-core"
import Icon from "../Icon/Icon";

type InputSize = "sm" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**
     * Whether disable Input
     */
    disabled?: boolean;
    /**
     * How large should the input be?
     */
    size?: InputSize;
    /**
     * Whether show icon using for tip
     */
    icon?: IconProp;
    /**
     * Adding prefix using for configure some fix combination
     */
    prefixA?: string | ReactElement;
    /**
     * Adding suffix using for configure some fix combination
     */
    suffix?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input component for user interaction
 */
export const Input: FC<InputProps> = ({
                                          disabled = false,
                                          size = 'sm',
                                          icon,
                                          prefixA,
                                          suffix,
                                          style,
                                          role,
                                          ...restprops
                                      }) => {
    //compute different className according to different attributes
    const cnames = classNames('helene-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prefixA || suffix,
        'input-group-append': !!suffix,
        'input-group-prepend': !!prefixA
    })

    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }
    if ('value' in restprops) {
        delete restprops.defaultValue
        restprops.value = fixControlledValue(restprops.value)
    }

    return (
        //whether adding specific node according to the judgement of attributes
        <div className={cnames} style={style} role={role}>
            {
                prefixA && <div className='helene-input-group-prepend'>{prefixA}</div>
            }
            {icon && <div className='icon-wrapper'><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input className='helene-input-inner' disabled={disabled} {...restprops}/>
            {
                suffix && <div className='helene-input-group-append'>{suffix}</div>
            }
        </div>
    )
}

export default Input