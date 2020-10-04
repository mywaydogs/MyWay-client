import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import Button from "../utils/Button";
import CustomerModal from "./CustomerModal";
import ProjectsModal from "./ProjectsModal";
import update from "immutability-helper";

const customerInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [createModal, setCreateModal] = useState({
    customer: customerInitialState,
    isOpen: false,
  });
  const [editModal, setEditModal] = useState({
    customer: customerInitialState,
    isOpen: false,
  });
  const [projectsModal, setProjectsModal] = useState({
    isOpen: false,
    projectName: "",
    customer: null,
    projects: [],
  });

  const fetchCustomers = () => {
    axios.get("/api/customers").then((res) => {
      setCustomers(res.data);
      return res.data;
    });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const onCreateModalChange = (val) => {
    setCreateModal(val);
  };
  const onCreateModalSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/customers", createModal.customer)
      .then(() =>
        setCreateModal(update(createModal, { isOpen: { $set: false } }))
      )
      .then(fetchCustomers);
  };

  const onEditModalChange = (val) => {
    setEditModal(val);
  };
  const onEditModalSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/customers/${editModal.customer._id}`, editModal.customer)
      .then(() => setEditModal(update(editModal, { isOpen: { $set: false } })))
      .then(fetchCustomers);
  };

  const onClickCreate = () => {
    setCreateModal({ isOpen: true, customer: customerInitialState });
  };

  const onClickEdit = (customer) => {
    setEditModal({ isOpen: true, customer });
  };

  const onClickDelete = (customer) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <>
          <h2>מחיקת לקוח</h2>
          <p>
            האם אתה בטוח שברצונך למחוק את הלקוח? פעולה זו הינה בלתי הפיכה, וכל
            הנתונים שלו יחד עם הפרויקטים שלו יימחקו לצמיתות.
          </p>
          <Button
            value="כן"
            onClick={() => {
              axios.delete(`/api/customers/${customer._id}`).then(() => {
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
  };

  const onClickProjects = (customer) => {
    setProjectsModal(
      update(projectsModal, {
        isOpen: { $set: true },
        customer: { $set: customer },
        projects: { $set: customer.projects },
      })
    );
  };

  const onProjectsChange = (val) => {
    setProjectsModal(val);
  };

  const onProjectsSubmit = () => {
    fetchCustomers();
  };

  return (
    <>
      <div>
        <Button value="לקוח חדש" onClick={onClickCreate} />
      </div>
      <div>
        <table style={{ width: "100%", textAlign: "right" }}>
          <thead>
            <tr>
              <th>שם פרטי</th>
              <th>שם משפחה</th>
              <th>מייל</th>
              <th>טלפון</th>
              <th>כתובת</th>
              <th>פרוייקטים</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr key={idx}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <Button
                    value="פרוייקטים"
                    onClick={() => onClickProjects(customer)}
                  />
                </td>
                <td>
                  <Button
                    size="small"
                    value="ערוך"
                    onClick={() => onClickEdit(customer)}
                  />
                  <Button
                    size="small"
                    value="מחק"
                    onClick={() => onClickDelete(customer)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CustomerModal
          data={createModal}
          title="יצירת לקוח"
          onChange={onCreateModalChange}
          onSubmit={onCreateModalSubmit}
        />
        <CustomerModal
          data={editModal}
          title="עריכת לקוח"
          onChange={onEditModalChange}
          onSubmit={onEditModalSubmit}
        />
        <ProjectsModal
          data={projectsModal}
          onChange={onProjectsChange}
          onSubmit={onProjectsSubmit}
        />
      </div>
      {customers.length === 0 && <div>לא נמצאו לקוחות</div>}
    </>
  );
}

export default Customers;
