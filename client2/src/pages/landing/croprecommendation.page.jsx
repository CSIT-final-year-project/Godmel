import { useEffect, useState } from "react"
import CropRecommendationForm from "../../component/common/predictor/crop-recommendation-form.component";
import { useForm } from "react-hook-form";

import axios from "axios";
import { toast } from "react-toastify"
import seedSvc from "../cms/seed/seed.service";
import { Card, Spinner, Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import authSvc from "../home/auth/auth.service";
import cartSvc from "../common/cart.service";




const CropRecommendationPage = () => {
    const [predict, setPredict] = useState(false);
    const [seed, setSeed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [user, setUser] = useState({ userId: "", name: "", role: "" });
    const [selected, setSelected]=useState(null);



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };



    const cropSubmit = async (data) => {
        try {
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

            toast.error(exception.message)

            // exception.response.data.result.map((obj) => {
            //     const keys = Object.keys(obj);
            //     setError(keys[0], { message: obj[keys[0]] });
            // })
        } finally {
            setLoading(false)
        }
    }

    const handleAddtoCart = (row) => {
        try {
            setSelected(row._id);  // Set the selected state to the product's unique identifier
            handleShow();  // Open the modal
        } catch (exception) {
            toast.error(exception.message);
        }
    }
    

    const handleCart = async ()=>{
        try{
            const response = await cartSvc.addToCart({productId: selected, qty: quantity});
            handleClose();
            toast.success("Successfully added to cart");
        }
        catch(exception){
            toast.error(exception);
        }
    }

    useEffect(() => {
        setSeed({ title: "", image: "", summary: "" });
        
    }, [predict])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
              const loggedInUser = await authSvc.getLoggedInUser();
              setUser(loggedInUser);
              console.log(loggedInUser)
            } catch (error) {
            //   toast.error(error.message);
            console.log(error.message)
            }
          };
      
          fetchUserData();
    }, [])

    return (<>
        <CropRecommendationForm submitHandler={cropSubmit} loading={loading} />
        <span>
            {
                loading ? <>
                    <div className="text-center">
                        <Spinner variant="dark"></Spinner>
                    </div>
                </> : <>
                    {
                        predict ? <>
                            <div className="text-center">
                                <h3>You should Grow {predict}. You can order it's seed online below</h3>
                                <br />
                                {
                                    seed.title !== "" ? <>
                                        <Modal show={show} centered onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Set Quantity</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <Button variant="outline-secondary" onClick={handleDecrement}>
                                                        -
                                                    </Button>
                                                    <span className="mx-3">{quantity}</span>
                                                    <Button variant="outline-secondary" onClick={handleIncrement}>
                                                        +
                                                    </Button>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button className="btn-secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleCart}>
                                                    Add to Cart
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Card style={{ width: '18rem' }} className="m-2">
                                            <Card.Img variant="top" onError={(e) => {
                                                e.target.src = "https://dummyimage.com/50x30/f2f2f2/000000&text=Seed+not+found"
                                            }} src={seed && seed.images ? import.meta.env.VITE_IMAGE_URL + '/product/' + seed.images[0] : ""} />
                                            <Card.Body>
                                                <Card.Title>{seed.title}</Card.Title>
                                                <Card.Text>
                                                    {seed.summary}
                                                </Card.Text>
                                                {
                                                    user && user.name !== "" ? <>
                                                        <NavLink onClick={()=>{handleAddtoCart(seed)}} className="btn btn-sm btn-success"><i className="fa-solid fa-cart-plus"></i>&nbsp;Add to Cart</NavLink>
                                                    </> : <>
                                                        <NavLink to={'/login'} className="btn btn-sm btn-success"><i className="fa-solid fa-cart-plus"></i>&nbsp;Add to Cart</NavLink>
                                                    </>
                                                }                                            
                                            </Card.Body>
                                        </Card>
                                    </> : <>Seed not available</>

                                }
                            </div>
                        </> : <>No product to show</>
                    }
                </>
            }

        </span>
    </>)
}

export default CropRecommendationPage