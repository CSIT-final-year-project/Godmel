import { Form } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"

export const EmailInput = () => {
    const {control, formState: {errors}} = useForm()

    return (<>
        <Controller
            name="email"
            control={control}
            render={(({field}) => <Form.Control 
            {...field}
            defaultValue={"content"}
            type="email"
            size="sm"
            placeholder="Enter Your email..."
        >
        </Form.Control>)}></Controller>
    </>)
}

export const ImageUploader = ({loading=false,setThumb, setValue, setError }) => {
    return (<>
        <Form.Control 
            type="file"
            size="sm"
            disabled={loading}
            onChange={(e) => {
                const image = e.target.files[0]
                const ext = (image.name.split(".")).pop();
                if(['jpg','png','jpeg','gif','svg','bmp','webp'].includes(ext.toLowerCase())){
                    if(image.size <= 3000000){
                        // 
                        setThumb(image);
                        setValue('image', image)
                    } else {
                        setError("image", "File should be less then 3mb.")
                    }
                } else {
                    setError("image", "File format not supported")
                }
            }}
        />            
    </>)
}

export const MultipleImageUploader = ({loading=false,setThumb, setValue, setError }) => {
    return (<>
        <Form.Control 
            type="file"
            size="sm"
            multiple
            disabled={loading}
            onChange={(e) => {
                const images = Object.values(e.target.files)    // {{},{},{}} => [{},{},{}]
                const validFiles = []
                images.map((image, ind) => {
                    const ext = (image.name.split(".")).pop();
                    if(['jpg','png','jpeg','gif','svg','bmp','webp'].includes(ext.toLowerCase())){
                        if(image.size <= 3000000){
                            // 
                            validFiles.push(image)
                        } else {
                            setError("image", "File should be less then 3mb.")
                        }
                    } else {
                        setError("image", "File format not supported")
                    }
               })
               setThumb(validFiles)
               setValue("images", validFiles)

            }}
        />            
    </>)
}