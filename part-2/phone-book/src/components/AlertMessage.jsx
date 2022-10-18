export const AlertMessage = ({message, color}) => {
    return (
        <div
            className={`w-full font-bold text-center bg-gray-400 rounded-2xl shadow-gray-700 shadow-md`}
             style={{border: `2px solid ${color}`, color: color}}
        >
            {message}
        </div>
    );
};
