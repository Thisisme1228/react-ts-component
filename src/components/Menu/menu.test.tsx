import React, {act} from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import Menu, {MenuProps} from "./menu";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
    onSelect: jest.fn(),
    className: 'test',
    role: 'test-menu',
}

const testVerticalProps: MenuProps = {
    mode: 'vertical',
    role: 'test-menu',
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
    ]
    return (
        <Menu {...props} defaultIndex={2}>
            {
                objProps.map((item, index) => (
                    <MenuItem index={index} key={index} disabled={item.disabled} role={item.role}>
                        {item.value}
                    </MenuItem>
                ))
            }
        </Menu>
    )
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
        expect(menuItemElement.length).toEqual(3);
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
        expect(testProps.onSelect).toHaveBeenCalledWith(1);
        fireEvent.click(disabledItem);
        expect(disabledItem).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith(0);
    })

    it('should render vertical mode when mode is set to vertical', () => {
        render(generateMenu(testVerticalProps));
        expect(screen.getByRole('test-menu')).toHaveClass('menu-vertical');
    });
})