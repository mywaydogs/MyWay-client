import axios from 'axios';

function checkAuth(redirectUrl = '/', redirectWhenAuthenticated = true) {
    axios.get('/api/auth/authenticate')
        .then(() => {
            if (redirectWhenAuthenticated) {
                window.location.href = redirectUrl;
            }
        })
        .catch(err => {
            if (!redirectWhenAuthenticated) {
                window.location.href = redirectUrl;
            }
        })
}

export { checkAuth };