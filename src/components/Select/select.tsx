import React, {FC, useState, KeyboardEvent, useRef, useEffect} from "react";
import Input from "../Input";
import Icon from '../../components/Icon'
import classNames from "classnames";
import {faChevronDown, faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";

type selectionType = 'multiple' | 'single';

interface DataSourceObject {
    value: string,
    disabled: boolean,
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface SelectProps {
    /**
     * Default tip
     * */
    placeholder?: string;
    /**
     * Optional data list
     * */
    fetchData: () => DataSourceType[];
    /**
     * Set mode of Select
     * */
    mode?: selectionType
}

export const Select: FC<SelectProps> = ({fetchData, mode = 'single', placeholder = "please select", ...restProps}) => {
    const [dataList, setDataList] = useState(fetchData())
    const [toggle, setToggle] = useState(false)
    const [inputValue, setInputValue] = useState<DataSourceType[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const componentRef = useRef<HTMLDivElement>(null)

    useClickOutside(componentRef, () => {
        setToggle(false)
    })

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [inputValue, toggle]);

    const switchDropList = () => {
        setToggle(!toggle)
    }

    const handleTag = () => {
        setToggle(!toggle)
    }

    const handleSelect = (item: DataSourceType) => {
        if (mode === 'single') {
            setInputValue([item])
            switchDropList()
        } else {
            if (inputValue.includes(item)) {
                setInputValue(inputValue.filter((element: DataSourceType) => element.value !== item.value))
            } else {
                setInputValue([...inputValue, item])
            }
        }
    }

    const classesWrapper = classNames('helene-select', {'menu-is-open': toggle})

    return <div className={classesWrapper} ref={componentRef}>
        <div className="helene-select-input" onClick={switchDropList}>
            <Input
                ref={inputRef}
                size='lg'
                readOnly
                placeholder={(mode === 'multiple' && inputValue.length > 0) ? '' : placeholder}
                icon={faChevronDown}
                value={mode === 'single' ? inputValue[0]?.value : ''}
            />
        </div>
        {
            mode === 'multiple' && <div className='helene-selected-tags' onClick={handleTag}>
                {
                    inputValue.map((item: DataSourceType) => <div className='helene-tag'>
                        {item.value}
                        <Icon icon={faXmark} onClick={(e: React.MouseEvent) => {
                            e.stopPropagation()
                            handleSelect(item);
                        }}/>
                    </div>)
                }
          </div>
        }
        {
            toggle && <ul className='helene-select-dropdown'>
                {
                    dataList.map((item: DataSourceType, index) => {
                        const valueList = inputValue.map((item: DataSourceType) => item.value)
                        const classes = classnames(
                            'helene-select-item',
                            {
                                'is-selected': valueList.includes(item.value),
                                'is-disabled': item.disabled
                            })
                        return <li
                            className={classes}
                            key={'value-' + index}
                            onClick={() => !item.disabled && handleSelect(item)}
                        >
                            {item.value}
                            {valueList.includes(item.value) && <Icon icon={faCheck}/>}
                        </li>
                    })
                }
          </ul>
        }
    </div>
}

export default Select