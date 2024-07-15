import React, {ReactNode} from "react";

export interface BaseTabsItemsProps {
    index?: string;
    label: ReactNode;
    children?: ReactNode;
    disabled?: boolean;
}

export type TabsItemsProps = BaseTabsItemsProps & Partial<React.HTMLAttributes<HTMLElement>>

const TabItem: React.FC<TabsItemsProps> = (props) => {
    const {role, children} = props

    return <div className='tabs-content' key={role} role={role}>{children}</div>
}

TabItem.displayName = "TabItem";

export default TabItem;