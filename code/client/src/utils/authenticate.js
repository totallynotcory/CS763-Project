export function authenticated() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/login';
    }
    else {
        const valid = validateToken(token);
        if (!valid) {
            window.location.href = '/login';
        }
    }
}
  
function validateToken(token) {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
    } catch (e) {
        return false;
    }
}