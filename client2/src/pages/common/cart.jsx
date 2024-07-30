import { Card, Container, Table, Form, Spinner, Badge, Image, Button } from "react-bootstrap"
import { Heading } from "../../component/common/heading/heading.component"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import cartSvc from "./cart.service"
import * as Yup from "yup"
import CookieConsent from "react-cookie-consent";

import Swal from 'sweetalert2'
import authSvc from "../home/auth/auth.service"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import axiosInstance from "../../repository/axios.config"

const CartList = () => {
  const [data, setData] = useState()
  const [user, setUser] = useState()
  const [sdkReady, setSDKReady] = useState(false)
  const [clientId, setClientId] = useState("")
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState([]);
  const [payOnline, setPayOnline] = useState(false);


  const handleCheckboxChange = (row) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = { ...prevSelectedItems };

      if (updatedItems[row._id]) {
        // If item is already selected, remove it
        delete updatedItems[row._id];
      } else {
        // If item is not selected, add it with a default quantity of 1 (you may adjust this)
        updatedItems[row._id] = { cartId: row._id, qty: 1 };
      }

      return updatedItems;
    });
  };

  const calculateTotalAmount = () => {
    return Object.values(selectedItems).reduce(
      (total, item) => total + data.find((row) => row._id === item.cartId)?.amount || 0,
      0
    );
  };

  const cartSchema = Yup.object({
    deliveryAddress: Yup.string().required(),
    // cart: [{
    //   cartId: Yup.string().min(24).max(24).required(),
    //   qty: Yup.number().required()
    // }]
  })
  const { register, setValue, setError, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(cartSchema)
  })

  const listCarts = async () => {
    try {
      setLoading(true)
      const response = await cartSvc.cartLists();
      setData(response.result)

    } catch (exception) {
      console.log(exception)
      toast.error(exception.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // api consume 
    listCarts()
    const fetchUserData = async () => {
      try {
        const loggedInUser = await authSvc.getLoggedInUser();
        setUser(loggedInUser);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const addPaypalScript = async () => {
      try {
        const response = await axiosInstance.get('/v1/paypal');
        setClientId(response.clientId);

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${response.clientId}`;
        script.async = true;
        script.onload = () => {
          setSDKReady(true);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading PayPal SDK:", error);
      }
    };

    addPaypalScript();

    fetchUserData();
  }, [])

  const handlePayPalCheckout = async () => {
    try {
      // Ensure PayPal SDK is loaded
      if (!sdkReady) {
        toast.error("PayPal SDK is not yet loaded.");
        return;
      }

      // Replace with your actual order total
      const totalAmountinNrs = calculateTotalAmount();
      const totalAmount = totalAmountinNrs*0.0075;

      // Call PayPal SDK to create order
      const paypal = window.paypal;
      const order = await paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalAmount.toFixed(2) // PayPal requires 2 decimal places
              }
            }]
          });
        },
        onApprove: function (data, actions) {
          // Capture the funds from the transaction
          return actions.order.capture().then(function (details) {
            // Handle successful payment, e.g., process the order
            const deliveryAddress = document.querySelector('input[name="deliveryAddress"]').value; // Get delivery address from the form
            checkout({ deliveryAddress, selectedItems: Object.keys(selectedItems) });
            updatePaymentStatusToPaid(Object.keys(selectedItems));
            console.log("Transaction completed by " + details.payer.name.given_name);
            toast.success("Payment successful!");
            setSelectedItems({});
            navigate("/"); // Navigate to the home page after successful payment
          });
        },
        onCancel: function (data) {
          toast.error("Payment canceled.");
        },
        onError: function (err) {
          toast.error("An error occurred during payment.");
        }
      });

      // Render the PayPal button
      order.render('#paypal-button-container');
    } catch (error) {
      console.error("PayPal checkout error:", error);
      toast.error("An error occurred during PayPal checkout.");
    }
  };

  const updatePaymentStatusToPaid = async (id) => {
    try {
      
      const response = await axiosInstance.put('/v1/cart/pay/'+id);
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Error updating payment status.");
    }
  };


  const handleDelete = async (id) => {
    try {
      setLoading(true)
      let response = await cartSvc.deleteById(id)
      toast.success("Cart Item deleted Successfully")
      listCarts()
    } catch (exception) {
      toast.error("Cart cannot be deleted or already deleted.")
    } finally {
      setLoading(false)
    }
  }

  const checkout = async (data) => {
    try {
      let cartId = [];
      for (const key in selectedItems) {
        if (selectedItems.hasOwnProperty(key)) {
          cartId.push(selectedItems[key].cartId);
        }
      }
      const prepareData = {
        deliveryAddress: data.deliveryAddress,
        cartId: cartId
      }

      const order = await cartSvc.order(prepareData);

      toast.success(order.message);

      navigate("/");


    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (<>
    <Container fluid className="px-4">
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="myCookie"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Heading type={"h1"} className="mt-4" value={"Cart"}></Heading>
      <Card className="mb-4">
        <Card.Header>
          <Heading type={"h4"} className={"float-start"} value={"Your Cart"}></Heading>
          {/* <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/cart/create">
                <i className="fa fa-plus"></i>&nbsp;Add Cart
              </NavLink> */}
        </Card.Header>
        <Card.Body>
          <h5>Select all the product you want to checkout</h5>
          <Form onSubmit={handleSubmit(checkout)}>
            <Table size="sm" bordered hover striped>
              <thead className="table-dark">
                <tr>
                  <th>Select</th>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Rate</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? <tr>
                    <td colSpan={5} className="text-center">
                      <Spinner variant="dark"></Spinner>
                    </td>
                  </tr> : (

                    data ? <>
                      {
                        data.map((row, ind) => (
                          <tr key={ind}>
                            <td><Form.Check
                              aria-label={"option " + { ind }}
                              onChange={() => handleCheckboxChange(row)}
                              checked={selectedItems[row._id] !== undefined}
                            /></td>
                            <td>
                              <Image onError={(e) => {
                                e.target.src = "https://dummyimage.com/50x30/f2f2f2/000000&text=No+image+found"
                              }} style={{ maxWidth: "50px" }} fluid src={import.meta.env.VITE_IMAGE_URL + 'product/' + row.detail.image} />
                            </td>
                            <td>{row.detail.title}</td>
                            <td>{row.rate}</td>
                            <td>{row.qty}</td>
                            <td>{row.amount}</td>
                            <td>
                              <NavLink onClick={(e) => {
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
                                    handleDelete(row._id)
                                  }
                                })
                              }} to={'/cart/' + row._id} className={"btn btn-sm btn-danger rounded-circle me-1"}>
                                <i className="fa fa-trash text-white"></i>
                              </NavLink>
                            </td>
                          </tr>
                        ))
                      }
                      <tr>
                        <td colSpan={5} className="text-center">Total</td>
                        <td colSpan={2} className="text-center">
                          {calculateTotalAmount()}
                        </td>
                      </tr>
                    </> : <tr>
                      <td colSpan={7} className="text-center">
                        No data found
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control type="text" {...register("deliveryAddress")} placeholder="enter address to deliver" />
            </Form.Group>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Pay Online"
              checked={payOnline}
              onChange={(e) => {
                setPayOnline(e.target.checked);
                if (e.target.checked) {
                  handlePayPalCheckout();
                }
              }}
            />
            <div className="text-center">

              {payOnline && (
                <div id="paypal-button-container">
                  {/* Render PayPal button here */}
                </div>
              )}
              <Button variant="outline-success" type="submit"> Cash on Delivery </Button>
            </div>

          </Form>

        </Card.Body>

      </Card>
    </Container>

  </>)
}
export default CartList