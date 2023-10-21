interface InputProps extends React.HTMLProps<HTMLButtonElement> {
  loadingState: string;
  name: string;
}

export const Button = ({ loadingState, name, onClick }: InputProps) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="mt-3 w-full transform rounded-lg bg-pink-500 bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring focus:ring-purple-300 active:bg-blue-700"
    >
      {loadingState == 'loaded' ? name : 'Loading...'}
    </button>
  );
};
