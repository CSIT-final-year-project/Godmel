import { Form, Col,  } from "react-bootstrap"
import { ButtonComponent } from "../../common/button/button.component"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"

const PasswordSetComponent = ({submitEvent}) => {
    const yupSchema = Yup.object({
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,25}$/,
                "Password must contain atlease one small letter, one Uppercase letter, one number and a special Character"
            ).required(), 
        confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null], "Password does not match"
        )
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(yupSchema)
    })

    return (<>
    
        <Form onSubmit={handleSubmit(submitEvent)}>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Password: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="password"
                        size="sm"
                        {...register("password", {required: true, minLength: 8, maxLength: 25})}
                        placeholder="Enter your Password"
                    />
                    <span className="text-danger">
                        <em>{
                            errors?.password?.message
                        }</em>
                    </span>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Re-Password: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="password"
                        size="sm"
                        {...register("confirmPassword", {required: true})}
                        placeholder="Re-Enter your Password"
                    />
                    <span className="text-danger">
                        <em>
                            {errors?.confirmPassword?.message}
                        </em>
                    </span>
                </Col>
            </Form.Group>
            
            <Form.Group className="row mb-3">
                <Col sm={{offset: 3,span: 9}}>
                    <ButtonComponent className="btn-danger me-3" type="reset" label="Cancel"></ButtonComponent>
                    <ButtonComponent type="submit" label="Submit"></ButtonComponent>
                </Col>
            </Form.Group>
        </Form>
    </>)
}

export default PasswordSetComponent