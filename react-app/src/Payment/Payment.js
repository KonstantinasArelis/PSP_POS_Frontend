import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Payment = () => {
    const {id} = useParams();
    const [amountToBePaid, setAmountToBePaid] = useState(0);
    const [payments, setPayments] = useState(null);

    const getUrl = `http://localhost:5274/Payment?order_id=${id}`;
    const postUrl = `http://localhost:5274/Payment`;
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
        const newPayment = {total_amount: amountToBePaid, order_id: id};
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

    useEffect(() => {
        fetchPayments();
    }, [])

    const order = 
        {
          id: 1,
          business_id: 10,
          employee_id: 5,
          order_discount_percentage: 10.00,
          total_amount: 100.00,
          tax_amount: 6.00,
          total_discount_amount: 10.00,
          order_status: "completed",
          created_at: "2023-10-26T10:00:00Z", 
          closed_at: "2023-10-26T11:00:00Z" 
        }
    
    const handlePay = (e) => {
        e.preventDefault();
        console.log("paid: " + amountToBePaid);
        makePayment();
    }

    return (
        <div>
            <h2>Total Amount: {order.total_amount}</h2>
            <h2>Tax Amount: {order.tax_amount}</h2>
            <h2>Discount Amount: {order.total_discount_amount}</h2>
            <div>Create new payment: </div>
            <form>
                <input
                    placeholder="Payment amount"
                    type="number"
                    step="0.01"
                    value={amountToBePaid}
                    onChange={(e) => setAmountToBePaid(e.target.value)}
                ></input>
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