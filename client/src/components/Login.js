import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CenteredContentDiv from './utils/CenteredContentDiv';
import TextInput from './utils/TextInput';
import Button from './utils/Button';
import Message from './utils/Message';
import UserContext from './UserContext';
import { checkAuth } from '../utils/Auth';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ isError: false, header: '', content: '' });

  const userContext = useContext(UserContext)

  useEffect(checkAuth, [userContext.user])

  const handleInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('/api/auth/login', user);
      setMessage({
        isError: false,
        header: 'התחברות מוצלחת',
        content: 'ההתחברות עברה בהצלחה וכעת אתם יכולים לגלוש באתר.'
      })
      userContext.setUser({ isAuthenticated: true, name: `${res.data.firstName} ${res.data.lastName}` })
    } catch (error) {
      // Unauthorized
      if (error.response.status === 401) {
        setMessage({
          isError: true,
          header: 'תהליך האימות נכשל',
          content: 'שם המשתמש ו/או הסיסמא שהזנתם אינם נכונים.'
        })
      }
      else {
        setMessage({
          isError: true,
          header: 'תהליך האימות נכשל',
          content: 'קרתה תקלה לא צפויה. נסו שוב בעוד מספר רגעים.'
        })
      }
    }

    setIsSubmitting(false);
  }

  return (
    <CenteredContentDiv>
      <form onSubmit={handleSubmit} >
        <TextInput name="email" value={user.email} onChange={handleInputChange} label="מייל" />
        <TextInput type="password" name="password" value={user.password} onChange={handleInputChange} label="סיסמא" />
        <Button type="submit" value="התחבר" isSubmitting={isSubmitting} />
        <Message variant={message.isError ? 'Error' : 'Success'} header={message.header} content={message.content} />
      </form>
    </CenteredContentDiv>
  );
}


export default Login;