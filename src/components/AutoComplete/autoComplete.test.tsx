import React from 'react';
import AutoComplete, {AutoCompleteProps} from './autoComplete';
import {render, waitFor, fireEvent, screen} from "@testing-library/react";

const testArray = [
    {
        value: 'ab', number: 12,
    },
    {
        value: 'abc', number: 23,
    },
    {
        value: 'b', number: 24,
    },
    {
        value: 'c', number: 25,
    }
]

const testProps: AutoCompleteProps = {
    fetchSuggestions: (query) => testArray.filter(item => item.value.includes(query)),
    onSelect: jest.fn(),
    placeholder: 'auto-complete',
}

describe('test AutoComplete component', () => {
    it('test basic AutoComplete behaviour', async () => {
        const {container} = render(<AutoComplete {...testProps}/>)
        const inputDom = screen.getByPlaceholderText('auto-complete') as HTMLInputElement
        //input change
        fireEvent.change(inputDom, {target: {value: 'a'}});
        await waitFor(() => {
            expect(screen.getByText('ab')).toBeInTheDocument()
        })
        //should have two suggestion items
        expect(container.getElementsByClassName('suggestion-item').length).toEqual(2)
        fireEvent.click(screen.getByText('ab'))
        expect(testProps.onSelect).toHaveBeenCalledWith({
            value: 'ab', number: 12,
        },)
        expect(screen.queryByText('ab')).not.toBeInTheDocument()
        expect(inputDom.value).toEqual('ab')
    })
    it('should provide keyboard support', async () => {
    })
    it('click outside should hide the dropdown', () => {

    })
    it('generate the right template', () => {

    })
    it('async fetchSuggestions should work correctly', () => {

    })
})