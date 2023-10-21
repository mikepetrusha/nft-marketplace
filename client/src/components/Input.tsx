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
      className="text-md mt-8 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-6 outline-none"
    />
  );
};
