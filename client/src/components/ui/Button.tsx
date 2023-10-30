export interface Props extends React.HTMLProps<HTMLButtonElement> {
  loadingState: string;
  name: string;
}

export const Button = ({ loadingState, name, onClick }: Props) => {
  return (
    <button onClick={onClick} type="submit" className="btn btn-primary w-full">
      {loadingState == 'loaded' ? name : 'Loading...'}
    </button>
  );
};
