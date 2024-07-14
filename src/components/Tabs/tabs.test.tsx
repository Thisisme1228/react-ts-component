import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {TabsItemsProps} from "./TabItem";
import Tabs, {TabsProps} from "./Tabs";

const testProps: TabsProps = {
    onSelect: jest.fn(),
    mode: 'line',
}

const testCardTypeProps: TabsProps = {
    onSelect: jest.fn(),
    mode: 'card',
}

const generateElement = (props: TabsProps) => {
    const items: TabsItemsProps[] = [
        {
            label: 'tab1',
            children: 'this is tab1',
        },
        {
            label: 'tab2',
            children: 'this is tab2',
            disabled: true,
        },
        {
            label: 'tab3',
            children: 'this is tab3',
        }
    ]
    return <Tabs items={items} {...props}/>
}

describe('Tabs Component test', () => {
    it('test tabs and tabsItem components based on default props', () => {
        render(generateElement(testProps));
        const nav1 = screen.queryByText('tab1');
        const navContent1 = screen.queryByText('this is tab1');
        expect(nav1).toHaveClass('is-active tabs-nav-item');
        expect(navContent1).toBeVisible();

        const nav2 = screen.queryByText('tab2');
        const totalNavContent = screen.queryAllByRole('navContent');
        expect(nav2).toHaveClass('disabled tabs-nav-item');
        expect(totalNavContent.length).toEqual(1);
    })

    it('click item should change active and call the callback', () => {
        render(generateElement(testProps));
        const navContent1 = screen.getByText('this is tab1');
        const nav1 = screen.getByText('tab1');
        const nav3 = screen.getByText('tab3');
        fireEvent.click((nav3));
        expect(screen.queryByText('this is tab3')).toBeVisible();
        expect(navContent1).not.toBeInTheDocument();
        expect(nav1).not.toHaveClass('is-active');
        expect(nav3).toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
    })

    it('click disabled tabItem should not works', () => {
        render(generateElement(testCardTypeProps));
        const nav1 = screen.queryByText('tab1')
        const nav2 = screen.queryByText('tab2')
        expect(nav2).toHaveClass('disabled');
        fireEvent.click(screen.getByText('tab2'));
        expect(testCardTypeProps.onSelect).not.toHaveBeenCalledWith('1');
        expect(nav1).toHaveClass('is-active');
    })
})