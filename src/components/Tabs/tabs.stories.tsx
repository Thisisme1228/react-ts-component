import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import Tabs from './Tabs';
import TabItem from "./TabItem";
import React from "react";
import Icon from "../Icon/Icon";
import {faTable} from "@fortawesome/free-solid-svg-icons";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const tabsMeta = {
    title: 'Custom Components/Tabs',
    component: Tabs,
    // @ts-ignore
    subcomponents: {TabItem},//type matching still has a problem. and the authority do not have a sensible way to resolve it.
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // argTypes: {
    //     mode: {
    //         control: 'radio',
    //         options: ['line', 'card'],
    //     }
    // },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {onClick: fn()},
} satisfies Meta<typeof Tabs>;

export default tabsMeta;
type Story = StoryObj<typeof tabsMeta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Template: Story = {
    args: {
        items: [
            {
                label: <>tab1 <Icon icon={faTable} className='icon-dark' size="1x"/></>,
                children: <ul>
                    <li>li element</li>
                    <li>li element</li>
                </ul>,
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
    },
};
