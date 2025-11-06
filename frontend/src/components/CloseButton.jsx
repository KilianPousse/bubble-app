import { CrossIcon } from "../lib/icons";

function CloseButton({ onClick }) {
    return (
        <button
          onClick={onClick}
          className="absolute top-4 right-4 text-red-600 hover:text-red-700 hover:bg-red-600/20 border border-red-600 transition-all duration-200 p-2 rounded-lg bg-slate-800 z-10"
        >
          <CrossIcon />
        </button>
    );
}
export default CloseButton;