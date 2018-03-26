$(function() {
    $('#login').click(() => {
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                email: 'michal.slabej94@gmail.com',
                password: 'password',
            },
            success: (response) => {
                sessionStorage.setItem('token', response.token);
                location.href = '/protected.html';
            }
        })
    })
})