import type {Meta, StoryObj} from '@storybook/react';
import Icon from './Icon';
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const iconMeta = {
    title: 'Custom Components/Icon',
    component: Icon,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default iconMeta;
type Story = StoryObj<typeof iconMeta>;

export const Template: Story = {
    // @ts-ignore
    args: {
        icon: faChevronDown,
        size: '10x'
    }
};