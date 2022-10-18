export const Notification = ({color, message}) => {
    if (message === null) {
        return null;
    }

    return (
        <div style={{
            backgroundColor: 'lightgrey',
            color: color,
            fontWeight: 'bold',
            border: `2px solid ${color}`,
            textAlign: 'center',
            fontSize: '32px',
            borderRadius: '20px'
        }}>
            {message}
        </div>
    );
};
