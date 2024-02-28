import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { ErrorMessage } from "../../../component/common/validation-message/validation-message.component";
import { ImageUploader } from "../../../component/common/form/input.component";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../../../component/common/button/button.component";
import placeholder from "../../../assets/image/placeholder.webp"

const UserForm = ({submitEvent, loading=false, detail=null, createnew=false}) => {
    const [thumb, setThumb] = useState()
    const [create, setCreate] = useState(false);

    const userSchema = Yup.object({
        name: Yup.string().min(3).required(),
        email: Yup.string().email().required(),
        password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,25}$/,
            "Password must contain atlease one small letter, one Uppercase letter, one number and a special Character"
        ).optional(), 
        status: Yup.string().matches(/^(active|inactive)$/, {message: "Status can only be active or inactive"})
    })
    const {register,setValue, handleSubmit, setError, formState: {errors}} =useForm({
        resolver: yupResolver(userSchema)
    })

    const submitForm =(data) => {
        console.log(data);
        // mapping 
        submitEvent(data)
    }

    useEffect(()=>{
        setCreate(createnew);
    }, [])

    useEffect(() => {
        if(detail) {
            (Object.keys(detail)).map((field, ind) => {
                if(field !== 'image') {
                    setValue(field, detail[field])
                }
            })
            setThumb(detail.image)
        }
    }, [detail])

    return (<>
        <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Name: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="text"
                        placeholder="Enter User name..."
                        size="sm"
                        {...register('name', {required: true})}
                    />
                    <ErrorMessage message={errors?.name?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Email: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="email"
                        placeholder="Enter User email..."
                        size="sm"
                        {...register('email', {required: false})}
                    />
                    <ErrorMessage message={errors?.email?.message}/>
                </Col>
            </Form.Group>
            {
                create? <>
                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-3">Password: </Form.Label>
                        <Col sm={9}>
                            <Form.Control 
                                type="password"
                                placeholder="Enter User password..."
                                size="sm"
                                {...register('password', {required: false})}
                            />
                            <ErrorMessage message={errors?.password?.message}/>
                        </Col>
                    </Form.Group>
                </>: <></>
            }
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Status: </Form.Label>
                <Col sm={9}>
                    <Form.Select size="sm" {...register("status")}>
                        <option value="">--Select Any one--</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Form.Select>
                    <ErrorMessage message={errors?.status?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Image: </Form.Label>
                <Col sm={7}>
                    <ImageUploader 
                        setThumb={setThumb}
                        setValue={setValue}
                        setError={setError}
                    />
                    <ErrorMessage message={errors?.image?.message} />
                </Col>
                <Col sm={2}>
                    <Image src={
                        thumb 
                            ? 
                                (typeof thumb === 'string') ? import.meta.env.VITE_IMAGE_URL+"users/"+thumb : URL.createObjectURL(thumb) 
                            : 
                        placeholder
                    } fluid alt="" />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Col sm={{offset: 3, span: 9}}>
                    <ButtonComponent label="Cancel" type="reset" className="btn-danger me-3" loading={loading} />
                    <ButtonComponent label="Submit" type="submit" className="btn-success" loading={loading} />
                </Col>
            </Form.Group>

            
        </Form>
    </>)
}

export default UserForm;