import React, {useState} from "react";
import classNames from "classnames";
import TabItem, {TabsItemsProps} from "./TabItem";

type SelectCallback = (selectedIndex: string) => void;

export type MenuMode = 'line' | 'card';

export interface ITabsProps {
    items?: TabsItemsProps[];
    defaultActiveKey?: string;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    mode?: MenuMode,
}

export type TabsProps = ITabsProps & React.HTMLAttributes<HTMLElement>

const Tabs: React.FC<TabsProps> = (props) => {
    const {className, style, onSelect, defaultActiveKey = '0', mode = 'line', items = [], ...restProps} = props;
    const navClasses = classNames(className, 'tabs-nav', {
        'nav-line': mode === 'line',
        'nav-card': mode !== 'line',
    })
    const navProps = {
        className: navClasses,
        style,
        ...restProps
    }
    const [currentIndex, setIndex] = useState(defaultActiveKey)

    const handleClick = (index: string) => {
        console.log(typeof index)
        setIndex(index);
        if (onSelect) {
            onSelect(index)
        }
    }

    const renderNavLinks = () => {
        return items.map((item, index) => {
            const itemClasses = classNames('tabs-nav-item', {
                'disabled': item.disabled,
                'is-active': index.toString() === currentIndex
            })
            return <li className={itemClasses} key={index.toString()} onClick={() => {
                !item.disabled && handleClick(index.toString())
            }}>{item.label}</li>
        })
    }

    const renderContent = () => {
        return items.filter((item, index) => index.toString() === currentIndex).map(item => <TabItem
            label={item.label} key={item.label} role='navContent'>{item.children}</TabItem>)
    }
    return <>
        <ul {...navProps}>
            {renderNavLinks()}
        </ul>
        {renderContent()}
    </>
}

Tabs.displayName = 'Tabs';
export default Tabs;