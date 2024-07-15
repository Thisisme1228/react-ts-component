import type {Meta, StoryObj} from '@storybook/react';
import Alert from './alert';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const alertMeta = {
    title: 'Custom Components/Alert',
    component: Alert,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default alertMeta;
type Story = StoryObj<typeof alertMeta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Template: Story = {
    args: {
        title: 'Hello',
        style: {
            width: '200px', height: '100px'
        },
    },
};