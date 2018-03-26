function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

function checkUser() {
    const token = sessionStorage.getItem('token');
    if(!token) {
        location.href = 'http://localhost:3000/';
    } else {
        $.ajax({
            url: '/api/users',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            success: (response) => {
                console.log(response)
                $('#loader-wrapper').hide();
                const payloadData = parseJwt(token);
                $('#email').text(`Welcome back: ${payloadData.email}`)
            },
            error: () => {
                sessionStorage.removeItem('token');
                location.href = 'http://localhost:3000/';
            }
        })
    }
}
$(function() {
    checkUser();
});
