import { ComponentProps, forwardRef } from 'react';

export interface Props extends ComponentProps<'input'> {}

export const Input = forwardRef<HTMLInputElement, Props>(({ id, ...props }, ref) => (
  <input {...props} id={id} ref={ref} className="input input-bordered input-primary mt-8 w-full" />
));

Input.displayName = 'Input';
