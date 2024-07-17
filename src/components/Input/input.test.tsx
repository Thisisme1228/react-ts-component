import React from 'react';
import Input, {InputProps} from "./input";
import {render, screen, fireEvent} from "@testing-library/react";
import {equal} from "node:assert";

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'default'
}

describe('test Input component', () => {
    it('should render the default input correctly', () => {
        render(<Input {...defaultProps}/>);
        const element = screen.getByPlaceholderText('default') as HTMLInputElement;
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('helene-input-inner');
        fireEvent.change(element, {target: {value: 'test'}});
        expect(defaultProps.onChange).toHaveBeenCalled();
        expect(element.value).toEqual('test');
    })
    it('should render the disabled input correctly', () => {
        render(<Input disabled placeholder='disabled'/>)
        const element = screen.getByPlaceholderText("disabled") as HTMLInputElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy()
    })
    it('should render different input sizes correctly', () => {
        render(<Input size='lg' placeholder='size' role='role'/>)
        const element = screen.queryByRole('role')
        expect(element).toHaveClass(' helene-input-wrapper input-size-lg')
    })
    it('should render prefix and suffix elements correctly', () => {
        render(<Input prefixA='prefixA' suffix='suffix' role='testRole'/>);
        const element = screen.getByRole('testRole')
        expect(element).toHaveClass('input-group-append input-group-prepend');
        expect(screen.getByText('prefixA')).toBeInTheDocument();
        expect(screen.getByText('suffix')).toBeInTheDocument();
    })
})