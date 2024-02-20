export const ButtonComponent = ({label="Submit", loading=false, className='btn-success', type='submit'})=>{
    return (
        <button disabled={loading} type={type} className={`btn btn-sm ${className}`}>
            {
                (type === 'reset')? <i className="fa fa-undo me-2"></i>:(type === 'submit')?<i className="fa fa-paper-plane me-2"></i>:""
            }
            {label}
        </button>
    )
}