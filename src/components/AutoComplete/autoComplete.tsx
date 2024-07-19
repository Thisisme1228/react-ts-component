import React, {FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef} from "react";
import Input, {InputProps} from "../Input/input";
import classnames from "classnames";
import Icon from "../Icon/Icon";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject {
    value: string,
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**
     * User-defined filter function, parameter is input value, return a Synchronized array or asynchronous promise that has been filtered based on input value
     */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>,
    /**
     * Trigger callback when click selected item from recommendation list
     */
    onSelect?: (item: DataSourceType) => void,
    /**
     * Support user-defined dropdown list, return reactElement
     */
    renderTemplate?: (item: DataSourceType) => ReactElement,
}

/** AutoComplete component for user interaction*/
export const AutoComplete: FC<AutoCompleteProps> = ({
                                                        onSelect,
                                                        fetchSuggestions,
                                                        value,
                                                        renderTemplate,
                                                        ...restProps
                                                    }) => {

    const [inputValue, setInputValue] = useState(value)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debounceValue = useDebounce(inputValue, 500)
    useClickOutside(componentRef, () => {
        setSuggestions([])
    })

    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            const result = fetchSuggestions(debounceValue)
            if (result instanceof Promise) {
                setLoading(true)
                result.then(data => {
                    setSuggestions(data)
                    setLoading(false)
                })
            } else {
                setSuggestions(result)
            }
        } else {
            setSuggestions([])
        }
        setHighlightIndex(-1)
    }, [debounceValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value)
        triggerSearch.current = true
    }

    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) index = suggestions.length - 1
        setHighlightIndex(index)
    }

    const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleClick(suggestions[highlightIndex])
                }
                break
            case 38:
                highlight(highlightIndex - 1)
                break
            case 40:
                highlight(highlightIndex + 1)
                break
            case 27:
                setSuggestions([])
                break
            default:
                break
        }
    }

    const handleClick = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const renderContent = (item: DataSourceType) => {
        if (renderTemplate) {
            return renderTemplate(item)
        }
        return item.value
    }

    const generateDropdown = () => {
        return (
            <ul className='helene-suggestion-list'>
                {
                    loading && <li className='suggstions-loading-icon'>
                    <Icon icon={faSpinner} spin/>
                  </li>
                }
                {suggestions.map((item, index) => {
                    const cnamses = classnames('suggestion-item', {'is-active': index === highlightIndex})
                    return <li
                        className={cnamses}
                        key={index}
                        onClick={() => handleClick(item)}
                    >
                        {renderContent(item)}
                    </li>
                })}
            </ul>
        )
    }

    return <div className='helene-auto-complete' ref={componentRef}>
        <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeydown} {...restProps}/>
        {(suggestions.length > 0 || loading) && generateDropdown()}
    </div>
}

export default AutoComplete