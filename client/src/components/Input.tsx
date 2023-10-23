interface InputProps extends React.HTMLProps<HTMLInputElement> {
  name?: string;
  register: any;
}

export const Input = ({ type, placeholder, name, register }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className="input input-bordered input-primary mt-8 w-full"
    />
  );
};
