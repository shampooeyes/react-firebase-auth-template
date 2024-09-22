import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import classes from './Modal.module.css';

const Modal = (props: { exit: any | undefined; children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
    return (
        <>
            <div className={classes.backdrop} onClick={props.exit}>
            </div>
            <div className={classes.modal}>
                {props.children}
            </div>
        </>
    );
};

export default Modal;