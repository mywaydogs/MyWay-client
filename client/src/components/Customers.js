import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Loading from "./Loading";
import Collapsible from "react-collapsible";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Button from './utils/Button';
import TextInput from './utils/TextInput';

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
                <TextInput
                    label="שם פרטי"
                    name="firstName"
                    value={customer.firstName}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="שם משפחה"
                    name="lastName"
                    value={customer.lastName}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="מייל"
                    name="email"
                    value={customer.email}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="טלפון"
                    name="phone"
                    value={customer.phone}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="כתובת"
                    name="address"
                    value={customer.address}
                    onChange={handleInputChange}
                />
                <Button type="submit" value={submitBtnValue} />
                <Button
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
                <Button value="חזור" onClick={() => setIsOpen(false)} />
            </form>
        </Modal >
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

    const handleOnClickEdit = () => {
        setEditCustomerModalIsOpen(true);
        setEditCustomer(customer);
    }

    const handleOnClickDelete = () => {
        confirmAlert({
            customUI: ({ onClose }) => (
                <>
                    <h2>מחיקת לקוח</h2>
                    <p>
                        האם אתה בטוח שברצונך למחוק את הלקוח? פעולה זו הינה בלתי
                        הפיכה, וכל הנתונים שלו יחד עם הפרויקטים שלו יימחקו
                        לצמיתות.
                    </p>
                    <Button
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
                    <Button
                        value="לא"
                        onClick={() => {
                            onClose();
                        }}
                    />
                </>
            ),
        });
    }

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
                    <Button
                        size="small"
                        value="ערוך"
                        onClick={handleOnClickEdit}
                    />
                    <Button
                        size="small"
                        value="מחק"
                        onClick={handleOnClickDelete}
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
                    <Button
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
