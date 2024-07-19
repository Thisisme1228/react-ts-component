import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import AutoComplete, {DataSourceType} from './autoComplete';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const AutoCompleteMeta = {
    title: 'Custom Components/AutoComplete',
    component: AutoComplete,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof AutoComplete>;

export default AutoCompleteMeta;
type Story = StoryObj<typeof AutoCompleteMeta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

interface SkillsProps {
    url: string,
    avatar_url: string,
    login: string
}

// const handleFetch = (query: string) => {
//     return skills.filter(item => item.value.includes(query))
// }
const handleFetch = async (query: string) => {
    const response = await fetch('https://api.github.com/search/users?q=acs')
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const {items} = await response.json();
    return items.slice(0, 10).map((item: DataSourceType<SkillsProps>) => ({
        ...item,
        value: item.login
    })).filter((item: DataSourceType<SkillsProps>) => item.value.includes(query))
}

const renderTemplate = (item: DataSourceType) => {
    const convertItem = item as DataSourceType<SkillsProps>
    return <>
        <h6>name: {convertItem.login}</h6>
        <p>url: {convertItem.url}</p>
    </>
}

export const Template: Story = {
    args: {
        fetchSuggestions: handleFetch,
        // 👇 Create an action that appears when the onClick event is fired
        onSelect: action('onSelect'),
        renderTemplate: renderTemplate,
    },
};