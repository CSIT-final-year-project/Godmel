import React from "react"
import { Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

export const ButtonComponent =({label ='Submit', loading=false, className = 'btn-success', type ='submit'}) => {
    return (
        <>
            <button type={type} className={`btn btn-sm ${className}`} disabled={loading}>
                {
                    (type === 'reset') ? <i className="fa fa-undo me-2"></i> : (
                        (type === 'submit') ? <i className="fa fa-paper-plane me-2"></i> : ""
                    )
                }
                {label}
            </button>
        </>
    )
}

export const TableActionButtons = ({editUrl, deleteAction, id}) => {
    return (<>
        <NavLink to={editUrl} className={"btn btn-sm btn-warning rounded-circle me-1"}>
            <i className="fa fa-pen text-white"></i>
        </NavLink>
        <Button onClick={(e) => {
            e.preventDefault()
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteAction(id)
                    }
            })
        }} size="sm" variant="danger" className={"rounded-circle me-1"}>
            <i className="fa fa-trash text-white"></i>
        </Button>
    
    </>)    
}