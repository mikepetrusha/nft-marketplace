import { ReactNode } from 'react';

export const TextField = ({ children }: { children: ReactNode[] }) => {
  return <p className="overflow-hidden overflow-ellipsis text-left text-gray-400">{...children}</p>;
};
