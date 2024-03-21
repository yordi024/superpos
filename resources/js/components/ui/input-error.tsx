import { HTMLAttributes } from 'react';

export function InputError({ message, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={'text-sm font-medium text-destructive ' + className}>
            {message}
        </p>
    ) : null;
}
