var stripeHandler = StripeCheckout.configure({
    key: 'pk_test_7SUm09ALRfFancxuaTdh8TJC',
    image: '../LogoWithWhite.png',
    locale: 'auto',
    token: function(tkn) {
      let amnt = $('#paymentAmount').val();
      $.ajax({
        url: `https://jsc-payment-processor.herokuapp.com/charge`, 
        data: {token: tkn.id, amount: amnt},
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
function showStripeForm() {
    let amnt = $('#paymentAmount').val();
    let desc = $('#bonusWeek').prop('checked') ? 'Full Summer + Bonus Week' : 'Full Summer';
    stripeHandler.open({
        name: 'Jersey Surf Camp LLC',
        description: desc,
        amount: amnt
    });
}
window.addEventListener('popstate', function() {
    handler.close();
});
$(document).ready(function() {
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

