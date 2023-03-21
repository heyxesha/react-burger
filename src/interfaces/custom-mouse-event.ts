import { MouseEvent } from 'react';

interface ICustomTarget extends EventTarget {
    id?: string;
}

export default interface ICustomMouseEvent extends MouseEvent {
    target: ICustomTarget;
};