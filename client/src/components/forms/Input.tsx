import { forwardRef } from 'react';
import { Input as Root, Props as RootProps } from '../ui/Input';
import FormField, { UseFormFieldProps, useFormField } from './FormField';

interface Props extends UseFormFieldProps, RootProps {
  name: string;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { formFieldProps, childProps } = useFormField(props);

  return (
    <FormField {...formFieldProps}>
      <Root {...childProps} ref={ref} />
    </FormField>
  );
});

Input.displayName = 'FormInput';
