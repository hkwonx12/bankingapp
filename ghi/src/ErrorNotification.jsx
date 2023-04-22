const ErrorNotification = (props) => (
    <div className="alert alert-danger">
        {props.children}
    </div>
)

export default ErrorNotification
