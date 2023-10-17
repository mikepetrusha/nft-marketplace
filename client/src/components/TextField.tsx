export const TextField = ({ children }: any) => {
  return (
    <p className="text-gray-400 overflow-hidden overflow-ellipsis text-left">
      {...children}
    </p>
  );
};
