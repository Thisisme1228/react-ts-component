import React, {useState} from "react";
import classNames from "classnames";

export type AlertSubject = 'success' | 'default' | 'danger' | 'warning'

export interface BaseAlertProps {
    title: string,
    subject?: AlertSubject;
    content?: string,
    closeBtn?: boolean,
    onClose?: () => void,
}

export type AlertProps = Partial<BaseAlertProps & React.HTMLAttributes<HTMLElement>>

const Alert: React.FC<AlertProps> = (props) => {
    const {
        subject = 'default',
        title,
        content,
        closeBtn = true,
        onClose,
        ...restProps
    } = props

    // alert, alert-success, alert-success, alert-danger, alert-warning
    const classes = classNames('alert', {
        [`alert-${subject}`]: subject,
    })

    const [show, setShow] = useState<boolean>(true)

    function handleClose() {
        if (onClose) {
            onClose()
        }
        setShow(false)
    }

    return <>
        {
            show && (
                <div className={classes} {...restProps}>
                    {closeBtn && <span className='alert-close' onClick={handleClose}>x</span>}
                    <div className='bold-title'>{title}</div>
                    {
                        content && <div className='alert-desc'>{content}</div>
                    }
                </div>)
        }
    </>
}

export default Alert