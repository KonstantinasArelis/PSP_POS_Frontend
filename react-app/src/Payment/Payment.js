import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Payment = () => {
    const {id} = useParams();
    const [amountToBePaid, setAmountToBePaid] = useState(0);
    const [tipAmount, setTipAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [payments, setPayments] = useState(null);
    const [order, setOrder] = useState(null);
    const [giftCardId, setGiftCardId] = useState(null);

    const getUrl = `http://localhost:5274/Payment?order_id=${id}`;
    const postUrl = `http://localhost:5274/Payment`;
    const orderGetUrl = `http://localhost:5274/Order/${id}`;

    const fetchPayments = () => {
        console.log("fetch payments now from " + getUrl);
        fetch(getUrl, {
            method: "GET"
        }).then((response) => response.json())
        .then((data) => {
            setPayments(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const makePayment = () => {

        const newPayment = {order_id: id, total_amount: amountToBePaid, order_amount: null, tip_amount: tipAmount, payment_method: paymentMethod, gift_card_id: null};

        /*
        const newPayment = { 
            newPayment: { // Wrap the data in a 'newPayment' object
                order_id: id, 
                total_amount: amountToBePaid, 
                order_amount: null, 
                tip_amount: 2.13, 
                payment_method: "CASH",  
                gift_card_id: null
            } 
        };
        */

        fetch(postUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPayment)
        }).then(() => {
            console.log("new payment created");
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            fetchPayments();
        })
    }

    const fetchOrder = () => {
        fetch(orderGetUrl, {
            method: "GET"
        }).then( (response) => response.json())
        .then( (data) => {
            console.log("got: " + data);
            setOrder(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchOrder();
        fetchPayments();
    }, [])

    
    const handlePay = (e) => {
        e.preventDefault();
        console.log("paid: " + amountToBePaid);
        makePayment();
    }

    return (
        <div>
            {order && 
            <div>
                <h2>Total Amount: {order.total_amount}</h2>
                <h2>Tax Amount: {order.tax_amount}</h2>
                <h2>Discount Amount: {order.total_discount_amount}</h2>
            </div>}
            
            <div>Create new payment: </div>
            <form>
                <input
                    placeholder="Payment amount"
                    type="number"
                    step="0.01"
                    value={amountToBePaid}
                    onChange={(e) => setAmountToBePaid(e.target.value)}
                ></input>
                <input
                    placeholder="Tip"
                    type="number"
                    step="0.01"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                ></input>
                <select id="paymentMethodDropdown" onChange={ (e) => setPaymentMethod(e.target.value)}>
                    <option value = "CASH" > CASH</option>
                    <option value = "CARD" > CARD</option>
                    <option value = "GIFTCARD" > GIFT CARD</option>
                </select>
                { paymentMethod === "GIFTCARD" && (
                    <input
                    placeholder="Gift Card Id"
                    type="number"
                    step="1"
                    value={giftCardId}
                    onChange={(e) => setGiftCardId(e.target.value)}
                    ></input>
                )}
                <button onClick={handlePay}>Pay</button>
            </form>
            <h3>Payments for this order: </h3>
            { payments && payments.map( payment => (
                <div key={payment.id} className="payment">
                    <p>amount: {payment.total_amount}</p>
                    <p>tip: {payment.tip_amount}</p>
                    <p>payment method: {payment.payment_method}</p>
                    <p>status: {payment.payment_status}</p>
                    <p>created at: {payment.created_at}</p>
                    <p>id: {payment.id}</p>
                </div>
            ))}
        </div>
    )
}

export default Payment;