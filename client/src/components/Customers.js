import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Loading from "./Loading";
import Collapsible from "react-collapsible";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

const customerModal = (
    isOpen,
    setIsOpen,
    title,
    submitBtnValue,
    customer,
    setCustomer,
    handleSubmit,
    fetchCustomers
) => {
    const modalHandleSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e).then(() => {
            fetchCustomers();
            setCustomer(
                Object.keys(customer).reduce(
                    (acc, e) => Object.assign(acc, { [e]: "" }),
                    {}
                )
            );
            setIsOpen(false);
        });
    };

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
            <h2>{title}</h2>
            <form onSubmit={modalHandleSubmit}>
                <div>
                    <label>שם פרטי</label>
                    <input
                        name="firstName"
                        value={customer.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>שם משפחה</label>
                    <input
                        name="lastName"
                        value={customer.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>מייל</label>
                    <input
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>טלפון</label>
                    <input
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>כתובת</label>
                    <input
                        name="address"
                        value={customer.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <input type="submit" value={submitBtnValue} />
                    <input
                        type="reset"
                        value="נקה טופס"
                        onClick={() =>
                            setCustomer(
                                Object.keys(customer).reduce(
                                    (acc, e) => Object.assign(acc, { [e]: "" }),
                                    {}
                                )
                            )
                        }
                    />
                    <input type="reset" value="חזור" onClick={() => setIsOpen(false)} />
                </div>
            </form>
        </Modal>
    );
};

function Customer({
    customer,
    idx,
    setEditCustomer,
    fetchCustomers,
    setEditCustomerModalIsOpen,
    ...props
}) {
    return (
        <Collapsible
            key={idx}
            trigger={
                <>
                    {customer.firstName}
                    {customer.lastName}
                    {customer.email}
                    {customer.phone}
                    {customer.address}
                    <input
                        type="button"
                        value="ערוך"
                        onClick={() => {
                            setEditCustomerModalIsOpen(true);
                            setEditCustomer(customer);
                        }}
                    />
                    <input
                        type="button"
                        value="מחק"
                        onClick={() => {
                            confirmAlert({
                                customUI: ({ onClose }) => (
                                    <>
                                        <h2>מחיקת לקוח</h2>
                                        <p>
                                            האם אתה בטוח שברצונך למחוק את הלקוח? פעולה זו הינה בלתי
                                            הפיכה, וכל הנתונים שלו יחד עם הפרויקטים שלו יימחקו
                                            לצמיתות.
                                        </p>
                                        <input
                                            type="button"
                                            value="כן"
                                            onClick={() => {
                                                axios
                                                    .delete(`/api/customers/${customer._id}`)
                                                    .then(() => {
                                                        fetchCustomers();
                                                        onClose();
                                                    });
                                            }}
                                        />
                                        <input
                                            type="button"
                                            value="לא"
                                            onClick={() => {
                                                onClose();
                                            }}
                                        />
                                    </>
                                ),
                            });
                        }}
                    />
                </>
            }
        >
            <ul>
                {customer.projects.map((project, idx) => (
                    <Link key={idx} to={`/project/${project._id}`}>
                        <li>{project.name}</li>
                    </Link>
                ))}
            </ul>
        </Collapsible>
    );
}

function Customers() {
    const [newCustomerModalIsOpen, setNewCustomerModalIsOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });
    const [editCustomerModalIsOpen, setEditCustomerModalIsOpen] = useState(false);
    const [editCustomer, setEditCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = () => {
        axios.get("/api/customers").then((res) => {
            setCustomers(res.data);
        });
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleNewCustomerSubmit = (e) => {
        return axios.post("/api/customers", newCustomer);
    };

    const handleEditCustomerSubmit = (e) => {
        return axios.put(`/api/customers/${editCustomer._id}`, editCustomer);
    };

    const newCustomerModal = customerModal(
        newCustomerModalIsOpen,
        setNewCustomerModalIsOpen,
        "יצירת לקוח חדש",
        "צור לקוח חדש",
        newCustomer,
        setNewCustomer,
        handleNewCustomerSubmit,
        fetchCustomers
    );
    const editCustomerModal = customerModal(
        editCustomerModalIsOpen,
        setEditCustomerModalIsOpen,
        "עריכת לקוח",
        "ערוך לקוח",
        editCustomer,
        setEditCustomer,
        handleEditCustomerSubmit,
        fetchCustomers
    );

    if (customers.length === 0) {
        return <Loading />;
    } else {
        return (
            <>
                <div>
                    <input
                        type="button"
                        value="לקוח חדש"
                        onClick={() => setNewCustomerModalIsOpen(true)}
                    />
                </div>
                <div>
                    {customers.map((customer, idx) => (
                        <Customer
                            customer={customer}
                            setEditCustomer={setEditCustomer}
                            setEditCustomerModalIsOpen={setEditCustomerModalIsOpen}
                            idx={idx}
                            fetchCustomers={fetchCustomers}
                        />
                    ))}
                    {newCustomerModal}
                    {editCustomerModal}
                </div>
            </>
        );
    }
}

export default Customers;
