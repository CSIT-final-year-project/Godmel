export const ErrorMessage = ({message}) => {
    return (<>
        <span className="text-danger">
            <em>{message}</em>
        </span>
    </>)
}