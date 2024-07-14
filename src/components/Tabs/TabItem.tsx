import React, {ReactNode} from "react";

export interface BaseTabsItemsProps {
    index?: string;
    label: string;
    children?: ReactNode;
    disabled?: boolean;
}

export type TabsItemsProps = BaseTabsItemsProps & Partial<React.HTMLAttributes<HTMLElement>>

const TabItem: React.FC<TabsItemsProps> = (props) => {
    const {label, role, children} = props

    return <div className='tabs-content' key={label} role={role}>{children}</div>
}

TabItem.displayName = "TabItem";

export default TabItem;