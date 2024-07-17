import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import Input from './input';
import {faPerson} from '@fortawesome/free-solid-svg-icons';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const inputMeta = {
    title: 'Custom Components/Input',
    component: Input,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {onClick: fn()},
} satisfies Meta<typeof Input>;

export default inputMeta;
type Story = StoryObj<typeof inputMeta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
    args: {
        placeholder: 'default input',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'disabled input',
    }
}

export const WithIcon: Story = {
    args: {
        icon: faPerson,
        defaultValue: 'input with icon',
    }
}

export const LargeSize: Story = {
    args: {
        size: 'lg',
    }
}

export const WithPrefixSuffix: Story = {
    args: {
        prefixA: 'http://',
        suffix: '.com',
    }
}