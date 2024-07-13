import React from 'react';
import Button, {ButtonProps} from "./button";
import {render, screen,fireEvent} from "@testing-library/react";

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'klass'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test Button component', () => {
    it('should render the default button correctly', () => {
        render(<Button {...defaultProps}>Nice</Button>);
        const element = screen.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    })
    it('should render the component based on different props correctly', () => {
        render(<Button {...testProps}>Nice</Button>);
        const element = screen.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn btn-primary btn-lg klass');
    })
    it(('should render a link when btnType equals link and href is provided'), () => {
        render(<Button btnType='link' href='https://www.google.com/chrome/'>Link</Button>);
        const element = screen.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('A');
        expect(element).toHaveClass('btn btn-link');
    })
    it('should render disabled button when disabled prop is set to true', () => {
        render(<Button {...disabledProps}>Nice</Button>);
        const element = screen.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toBeCalled();
    })
})