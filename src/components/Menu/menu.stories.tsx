import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import Menu from './menu';
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const menuMeta = {
    title: 'Custom Components/Menu',
    component: Menu,
    // @ts-ignore
    subcomponents: {MenuItem, SubMenu},//type matching still has a problem. and the authority do not have a sensible way to resolve it.
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // argTypes: {
    //     mode: {
    //         control: 'radio',
    //         options: ['horizontal', 'card'],
    //     }
    // },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {onClick: fn()},
} satisfies Meta<typeof Menu>;

export default menuMeta;
type Story = StoryObj<typeof menuMeta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const ListTemplate: Story = {
    render: ({...args}) => (
        <Menu {...args}>
            <MenuItem>
                nav1
            </MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem>subNav1</MenuItem>
                <MenuItem>subNav2</MenuItem>
            </SubMenu>
            <MenuItem>
                nav2
            </MenuItem>
            <MenuItem disabled={true}>
                nav3
            </MenuItem>
        </Menu>
    )
};

export const Empty = {
    ...ListTemplate,
    args: {},
};
