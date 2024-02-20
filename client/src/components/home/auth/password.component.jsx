import { Form, FormGroup, FloatingLabel, Col } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { ButtonComponent } from "../../common/button/button.component"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

const PasswordSetComponent = ({submitHandler}) => {
    const passwordSchema = Yup.object({
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null], "Password Doesn't Match"
        )
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(passwordSchema)
    })
    console.log(errors)

    return (<>
        <Form onSubmit={handleSubmit(submitHandler)}>
            <FormGroup>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Password"
                >
                    <Form.Control type="password" size="sm" {...register("password", {required: true})} placeholder="Password" />
                    <span className="text-danger"><em>{errors?.password?.message}</em></span>
                </FloatingLabel>
            </FormGroup>
            <FormGroup>
                <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                    <Form.Control type="password" size="sm" {...register("confirmPassword", {required: true})} placeholder="Re-type your password" />
                    <span className="text-danger"><em>{errors?.confirmPassword?.message}</em></span>
                </FloatingLabel>
            </FormGroup>
            <FormGroup className="row mt-3">
                <Col className="mb-3 text-center">
                    <ButtonComponent label="Set" type="submit" />
                </Col>
            </FormGroup>
        </Form>
    </>)
}

export default PasswordSetComponent