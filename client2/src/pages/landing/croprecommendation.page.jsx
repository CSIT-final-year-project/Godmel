import { useEffect, useState } from "react"
import CropRecommendationForm from "../../component/common/predictor/crop-recommendation-form.component";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify"
import seedSvc from "../cms/seed/seed.service";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const CropRecommendationPage = () => {
    const [predict, setPredict] = useState(false);
    const [seed, setSeed] = useState(false);
    const [loading, setLoading] = useState(false)



    const cropSubmit = async (data) => {
        try {
            console.log(data)
            setLoading(true)

            let response = await axios.post(import.meta.env.VITE_MLAPI_URL + "crop-predict", data, {
                timeout: 30000,
                timeoutErrorMessage: "Server timed out",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/x-www-form-urlencoded"
                }
            })
            setPredict(response.data.result);
            let res = await seedSvc.getSeedBySlug((response.data.result).toLowerCase() + "-seed");
            setSeed(res.result);
            
            toast.success(response.data.message)
        } catch (exception) {
            console.log(exception)
            toast.error(exception.message)

            exception.response.data.result.map((obj) => {
                const keys = Object.keys(obj);
                setError(keys[0], { message: obj[keys[0]] });
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        setSeed({title: "", image: "", summary:""});
    }, [predict])
    return (<>
        <CropRecommendationForm submitHandler={cropSubmit} loading={loading} />
        <span>
            {
                predict && seed.title!== "" ? <>
                        <div className="text-center">
                            <h3>You should Grow {predict}. You can order it's seed online below</h3>
                            <br/>
                            <Card style={{ width: '18rem' }} className="m-2">
                                <Card.Img variant="top" onError={(e) => {
                                    e.target.src = "https://dummyimage.com/50x30/f2f2f2/000000&text=Seed+not+found"
                                }} src={seed && seed.images ? import.meta.env.VITE_IMAGE_URL + '/seed/' + seed.images[0]: ""} />
                                <Card.Body>
                                    <Card.Title>{seed.title}</Card.Title>
                                    <Card.Text>
                                        {seed.summary}
                                    </Card.Text>
                                    <NavLink className="btn btn-sm btn-success"><i className="fa-solid fa-cart-plus"></i>&nbsp;Add to Cart</NavLink>
                                </Card.Body>
                            </Card>
                        </div>
                    </> : <>No product to show</>
            }
            </span>
        </>)
}

        export default CropRecommendationPage