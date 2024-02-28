import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { Title, Divider } from "../../component/common/heading/heading.component"
import CropCureForm from "../../component/common/predictor/crop-cure-form.component"
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios";
import HTMLRenderer from "../../component/common/htmlrender/htmlrender.component"



const CropCurePage = () => {
    const [predict, setPredict] = useState(false);
    const [loading, setLoading] = useState(false);

    const cropSubmit = async (data) => {
        try {
            console.log(data)
            setLoading(true)

            let response = await axios.post(import.meta.env.VITE_MLAPI_URL + "fertilizer-predict", data, {
                timeout: 30000,
                timeoutErrorMessage: "Server timed out",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/x-www-form-urlencoded"
                }
            })
            setPredict(response.data.result);
            
            toast.success(response.data.message)
        } catch (except) {
            console.log(except)
            toast.error(except.message)

            except.response.data.result.map((obj) => {
                const keys = Object.keys(obj);
                setError(keys[0], { message: obj[keys[0]] });
            })
        } finally {
            setLoading(false)
        }
    }

    return (<>
        <CropCureForm submitHandler={cropSubmit} loading={loading}/>
        <span>
            {
                predict ? <>
                        <div className="text-center text-danger">
                            <h6>
                                <HTMLRenderer htmlString={predict} />

                            </h6>
                        </div>
                    </> : <></>
            }
        </span>
    </>)
}

export default CropCurePage