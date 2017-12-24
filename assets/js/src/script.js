/* Remove .no-js from html if JavaScript is enabled */
document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className.replace('no-js', "")+" js";

jQuery(document).ready(function($) {

    /* Validation
    ---------------------------------------- */
    $('#form-contact').validate();

    /* Placeholder fix
    ---------------------------------------- */
    $('input, textarea').placeholder();

    /* Cookie Info
    ---------------------------------------- */
    if (Cookies.get('cookiesAcknowledged') != 'true'){
        $('#cookie-info').fadeTo(500, 1);
    }

    $('#cookie-info #cookie-close').click(function() {
        $('#cookie-info').fadeOut(500);
        Cookies.set('cookiesAcknowledged', true, { expires: 168, path: '/'});
    });

});
