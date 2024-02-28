import { yupResolver } from "@hookform/resolvers/yup";
import { Row, Col, Form, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { ErrorMessage } from "../../../component/common/validation-message/validation-message.component";
import { MultipleImageUploader } from "../../../component/common/form/input.component";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../../../component/common/button/button.component";
import placeholder from "../../../assets/image/placeholder.webp"

const SeedForm = ({submitEvent, loading=false, detail=null}) => {
    const [thumb, setThumb] = useState()

    const seedSchema = Yup.object({
        title: Yup.string().min(3).required(),
        summary: Yup.string().max(100),
        status: Yup.string().matches(/^(active|inactive)$/, {message: "Status can only be active or inactive"}),
        price: Yup.number().min(1).required(),
        discount: Yup.number().min(0).default(0).max(100).optional(),
    })
    const {register,setValue, handleSubmit, setError, formState: {errors}} =useForm({
        resolver: yupResolver(seedSchema)
    })



    const submitForm =(data) => {
        // mapping 
        const user = localStorage.getItem("_user");

        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("summary", data.summary)
        formData.append("price", data.price)
        formData.append("discount", data.discount)
        formData.append("sellerId", user.userId)
        formData.append("status", data.status)
        data.images.map((img) => {
            formData.append("images", img, img.filename)
        })

        submitEvent(formData)
    }

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
                <Form.Label className="col-sm-3">Title: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="text"
                        placeholder="Enter Seed Title..."
                        size="sm"
                        {...register('title', {required: true})}
                    />
                    <ErrorMessage message={errors?.title?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Summary: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="text"
                        placeholder="Enter summary..."
                        size="sm"
                        {...register('summary', {required: false})}
                    />
                    <ErrorMessage message={errors?.url?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Price: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="number"
                        placeholder="Enter price..."
                        size="sm"
                        {...register('price', {required: true})}
                    />
                    <ErrorMessage message={errors?.price?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Discount(in %): </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="number"
                        placeholder="Enter discount in %..."
                        size="sm"
                        {...register('discount', {required: false})}
                    />
                    <ErrorMessage message={errors?.discount?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Status: </Form.Label>
                <Col sm={9}>
                    <Form.Select size="sm" {...register("status")}>
                        <option value="">--Select Any one--</option>
                        <option value="active">Publish</option>
                        <option value="inactive">Un-Publish</option>
                    </Form.Select>
                    <ErrorMessage message={errors?.status?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Images: </Form.Label>
                <Col sm={3}>
                    <MultipleImageUploader 
                        setThumb={setThumb}
                        setValue={setValue}
                        setError={setError}
                    />
                    <ErrorMessage message={errors?.images?.message} />
                </Col>
                <Col sm={6}>
                    <Row>
                        {
                            thumb && thumb.length && thumb.map((image, ind) => (
                                <Col sm={2} key={ind}>
                                    <Image src={
                                        image 
                                            ? 
                                                (typeof image === 'string') 
                                                    ? import.meta.env.VITE_IMAGE_URL+"seed/"+image 
                                                    : URL.createObjectURL(image) 
                                            : 
                                        placeholder
                                    } fluid alt="" />
                                </Col>
                            ))
                        }
                    </Row>
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

export default SeedForm;