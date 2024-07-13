import React from 'react';
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import Menu, {MenuProps} from "./menu";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
    onSelect: jest.fn(),
    className: 'test',
    role: 'test-menu',
}

const testVerticalProps: MenuProps = {
    mode: 'vertical',
    role: 'test-menu',
    onSelect: jest.fn(),
}

const generateMenu = (props: MenuProps) => {
    const objProps = [
        {
            disabled: true,
            value: 'disabled',
            role: 'test-li',
        },
        {
            disabled: false,
            value: 'two',
            role: 'test-li',
        },
        {
            disabled: false,
            value: 'active',
            role: 'test-li',
        },
        {
            type: 'subMenu',
            title: 'dropdown',
            value: [
                {
                    value: 'subMenuItem',
                    role: 'test-li',
                    disabled: false,
                }
            ]
        }
    ]
    return (
        <Menu {...props} defaultIndex='2'>
            {
                objProps.map((item, index) => (
                    item.type === 'subMenu' ? <SubMenu title={item.title} key={index.toString()}>
                        {
                            item.value.map((SItem, SIndex) => (
                                <MenuItem key={index + '-' + SIndex} disabled={SItem.disabled} role={SItem.role}>
                                    {SItem.value}
                                </MenuItem>
                            ))
                        }
                    </SubMenu> : (<MenuItem key={index.toString()} disabled={item.disabled} role={item.role}>
                        {item.value as string}
                    </MenuItem>)
                ))
            }
        </Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
        .submenu {
            display: none;
        }
        .submenu.menu-opened {
            display: block;
        }
    `

    const style = document.createElement('style');
    style.innerHTML = cssFile;
    return style;
}


describe("test Menu component", () => {
    it("test Menu and MenuItem Component based on default props", () => {
        render(generateMenu(testProps));
        const menuElement = screen.queryByRole('test-menu');
        const menuItemElement = screen.getAllByRole('test-li');
        const ActiveElement = screen.getByText('active');
        const DisabledElement = screen.getByText('disabled');
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('menu test')
        expect(menuItemElement.length).toEqual(4);
        expect(ActiveElement).toHaveClass('menu-item is-active');
        expect(DisabledElement).toHaveClass('menu-item is-disabled');
    })

    it("click items should change active and call the callback", () => {
        render(generateMenu(testProps));
        const secondItem = screen.getByText('two');
        const thirdItem = screen.getByText('active');
        const disabledItem = screen.getByText('disabled');
        fireEvent.click(secondItem);
        expect(secondItem).toHaveClass('is-active');
        expect(thirdItem).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith('1');
        fireEvent.click(disabledItem);
        expect(disabledItem).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith('0');
    })

    it('should render vertical mode when mode is set to vertical', () => {
        render(generateMenu(testVerticalProps));
        expect(screen.getByRole('test-menu')).toHaveClass('menu-vertical');
    });

    it('should show dropdown items when hover on subMenu', async () => {
        render(generateMenu(testProps));
        screen.getByText('disabled').append(createStyleFile());
        expect(screen.queryByText('subMenuItem')).not.toBeVisible();
        const dropdownElement = screen.getByText('dropdown')
        fireEvent.mouseEnter((dropdownElement));
        await waitFor(() => expect(screen.queryByText('subMenuItem')).toBeVisible());
        //getByText return a HTML element.
        fireEvent.click(screen.getByText('subMenuItem'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        fireEvent.mouseLeave(dropdownElement);
        await waitFor(() => {
            expect(screen.queryByText('subMenuItem')).not.toBeVisible();
        })
    });

    it('should show dropdown items when click on subMenu in vertical mode', async () => {
        render(generateMenu(testVerticalProps));
        screen.getByText('disabled').append(createStyleFile());
        const dropdownElement = screen.getByText('dropdown')
        expect(screen.queryByText('subMenuItem')).not.toBeVisible();
        fireEvent.click((dropdownElement));
        expect(screen.queryByText('subMenuItem')).toBeVisible();
        fireEvent.click(screen.getByText('subMenuItem'));
        expect(testVerticalProps.onSelect).toHaveBeenCalledWith('3-0');
    })
})