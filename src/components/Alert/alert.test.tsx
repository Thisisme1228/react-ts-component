import React from 'react';
import Alert, {AlertProps} from './alert';
import {render, screen, fireEvent} from "@testing-library/react";

const keyId = Math.random().toString();
const testProps: AlertProps = {
    title: 'test title',
    role: keyId,
    onClose: jest.fn()
}

const typeProps: AlertProps = {
    ...testProps,
    subject: 'success',
    content: 'Hello',
    closeBtn: false
}

describe('test Alert component', () => {
    it('should render the default Alert correctly', () => {
        render(<Alert {...testProps}/>);
        expect(screen.getByText('test title')).toBeInTheDocument()
        expect(screen.queryByRole(keyId)).toHaveClass('alert alert-default');
        fireEvent.click(screen.queryByText('x') as HTMLElement);
        expect(testProps.onClose).toHaveBeenCalled();
        expect(screen.queryByText('test title')).not.toBeInTheDocument();
    });

    it('should render the component based on different props correctly', () => {
        render(<Alert {...typeProps}/>);
        expect(screen.getByText('test title')).toHaveClass('bold-title');
        expect(screen.queryByRole(keyId)).toHaveClass('alert alert-success');
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.queryByText('x')).not.toBeInTheDocument();
    });
})