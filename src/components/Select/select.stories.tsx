import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Select, {SelectProps, DataSourceType} from './select';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const SelectMeta = {
    title: 'Custom Components/Select',
    component: Select,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Select>;

export default SelectMeta;
type Story = StoryObj<typeof SelectMeta>;

interface SkillsProps {
    id: string,
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const dataList: DataSourceType<SkillsProps>[] = [
    {value: 'html', id: 'html', disabled: false},
    {value: 'css', id: 'css', disabled: false},
    {value: 'javascript', id: 'javascript', disabled: true}
]

const getData = () => {
    return dataList
}

export const singleMode: Story = {
    args: {
        fetchData: getData,
    },
};

export const multipleMode: Story = {
    args: {
        fetchData: getData,
        mode: 'multiple',
    },
};