import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TextInput from './utils/TextInput';
import Button from './utils/Button';
import CenteredContentDiv from './utils/CenteredContentDiv';
import Message from './utils/Message';
import UserContext from './UserContext';
import { checkAuth } from '../utils/Auth';

function Register() {
  const [user, setUser] = useState({ email: '', password: '', firstName: '', lastName: '' })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ isError: false, header: '', content: '' });

  const userContext = useContext(UserContext)

  useEffect(checkAuth, [userContext.user]);

  const handleInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('/api/auth/register', user);
      setMessage({
        isError: false,
        header: 'תהליך ההרשמה עבר בהצלחה',
        content: 'כעת תוכל להתחבר למערכת עם כתובת המייל והסיסמא שהזנת.'
      })
      userContext.setUser({ isAuthenticated: true, name: `${res.data.firstName} ${res.data.lastName}` })
    }
    catch (error) {
      if (error.response.status === 400) {
        setMessage({
          isError: true,
          header: 'תהליך ההרשמה נכשל',
          content: 'כתובת המייל שהזנת כבר קיימת במערכת.'
        })
      }
    }
    setIsSubmitting(false);
  }

  return (
    <CenteredContentDiv>
      <form onSubmit={handleSubmit}>
        <TextInput name="email" value={user.email} onChange={handleInputChange} label="מייל" required />
        <TextInput type="password" name="password" value={user.password} onChange={handleInputChange} label="סיסמא" required />
        <TextInput name="firstName" value={user.firstName} onChange={handleInputChange} label="שם פרטי" required />
        <TextInput name="lastName" value={user.lastName} onChange={handleInputChange} label="שם משפחה" required />
        <Button type="submit" value="הירשם" isSubmitting={isSubmitting} />
        <Message header={message.header} content={message.content} variant={message.isError ? 'Error' : 'Success'} />
      </form>
    </CenteredContentDiv>
    );
}

export default Register;