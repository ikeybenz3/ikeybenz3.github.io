var stripeHandler = StripeCheckout.configure({
    key: 'pk_live_Vek1WDHXK9AjMQcZJxaQSVEY',
    image: '../LogoWithWhite.png',
    locale: 'auto',
    token: function (tkn) {
        let amnt = $('#paymentAmount').val();
        $.ajax({
            url: `https://jsc-payment-processor.herokuapp.com/charge`,
            data: { token: tkn.id, amount: amnt },
            statusCode: {
                200: () => {
                    alert('Payment Succeeded\nPlease sign the following waiver to complete your signup.');
                    window.location.replace('https://waiver.fr/p-4WyUT');
                },
                500: alert('Payment Failed\nSomething went wrong.')
            }
        });
    }
});
function showStripeForm(type) {
    if (type != 'full') {
        $('#paymentAmount').val('154380');
    }
    const amnt = $('#paymentAmount').val();
    const desc = (type == 'full') ? $('#bonusWeek').prop('checked') ? 'Full Summer + Bonus Week' : 'Full Summer' : type;
    stripeHandler.open({
        name: 'Jersey Surf Camp LLC',
        description: desc,
        amount: amnt
    });
}
window.addEventListener('popstate', function () {
    handler.close();
});
$(document).ready(function () {
    $('#bonusWeek').on('click', (e) => {
        if ($('#bonusWeek').prop('checked')) {
            $('#total').text('$3,398.87');
            $('#paymentAmount').val('339887');
        } else {
            $('#total').text('$3,089.91');
            $('#paymentAmount').val('308991');
        }
    });
});

