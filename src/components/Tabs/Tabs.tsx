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

export const Tabs: React.FC<TabsProps> = ({
                                              className,
                                              style,
                                              onSelect,
                                              defaultActiveKey = '0',
                                              mode = 'line',
                                              items = [],
                                              ...restProps
                                          }) => {
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
        return items.filter((item, index) => index.toString() === currentIndex).map((item, index) => <TabItem
            label={item.label} key={index} role='navContent'>{item.children}</TabItem>)
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