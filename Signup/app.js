$(document).ready(function () {
  $('input[type=radio]').click(toggleDropDownState);
  $('input[type=checkbox]').click(calculateTermPrice);
  $('input[name=week]').click(ifOnlyOneWeekCanBeSelected);
  $('input[name=payment-method]').click(function () {
    if ($('input[value=full-summer]').prop('checked')) {
      document.getElementById('priceTag').innerHTML = `Total: $3089.91 *Must be paid in full by May 1st`;
    }
    showStripeForm();
  });
  $('input[value=full-summer]').click(function () {
    if ($('input[value=full-summer]').prop('checked') && $('#payment-method-atCamp').prop('checked')) {
      document.getElementById('priceTag').innerHTML = `Total: $3089.91 *Must be paid in full by May 1st`;
    } else {
      document.getElementById('priceTag').innerHTML = `Total: $3089.91`;
      $('#paymentAmount').val('308991');
    }
  })
})

function toggleDropDownState() {
  const weekTableSelected = $('#term-week').prop("checked");
  const dayTableSelected = $('#term-day').prop("checked");
  const weekTable = document.getElementById('weekSelect');
  const dayTable = document.getElementById('daySelect');
  const dropdown = document.getElementById('dropdown');
  const selectPrompt = document.getElementById('select-prompt');
  const radioClickedId = $(this).attr("id");
  if (radioClickedId == 'term-week' || radioClickedId == 'term-day' || radioClickedId == 'term-full-summer') {
    if (weekTableSelected || dayTableSelected) {
      dropdown.style.height = '13em';
      if (weekTableSelected) {
        calculateTermPrice()
        dayTable.style.display = 'none';
        selectPrompt.innerHTML = 'Choose your week(s):';
      } else {
        $('input[name=week]').prop("checked", false);
        calculateTermPrice()
        dayTable.style.display = 'table';
        selectPrompt.innerHTML = 'Choose a week and the day(s):';
      }
    } else {
      dropdown.style.height = '0px';
    }
  }

}

function calculateTermPrice() {
  let price = 0.00;
  if ($('#term-week').prop("checked")) {
    const weekStates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let weeksChecked = 0;
    for (i in weekStates) {
      if ($(`#week-${i}`).prop("checked")) {
        weeksChecked += 1;
      }
    }
    price = weeksChecked * 360;
  } else if ($('#term-day').prop("checked")) {
    const days = ['mon', 'tue', 'wed', 'thur', 'fri'];
    let daysChecked = 0;
    for (d in days) {
      if ($(`#day-${days[d]}`).prop("checked")) {
        daysChecked += 1;
      }
    }
    price = daysChecked * 80;
  }
  // Add Processing Charges To Bill
  if (price == 80) { price = 82.70; }
  else if (price == 160) { price = 165.09 }
  else if (price == 240) { price = 247.48 }
  else if (price == 320) { price = 309.27 }
  else if (price == 360) { price = 371.06 }
  else if (price == 720) { price = 741.81 }
  else if (price == 1080) { price = 1112.56 }
  else if (price == 1440) { price = 1483.82 }
  else if (price == 1800) { price = 1854.07 }
  else if (price == 2160) { price = 2224.82 }
  else if (price == 2520) { price = 2595.57 }
  else if (price == 2880) { price = 2966.32 }
  else if (price == 3000) { price = 3089.91 }

  document.getElementById('priceTag').innerHTML = `Total: $${price}`;
  $('#paymentAmount').val(`${price * 100}`);

  return price
}
function ifOnlyOneWeekCanBeSelected() {
  if ($('#term-day').prop("checked")) {
    var $box = $(this);
    if ($box.is(":checked")) {
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      $(group).prop("checked", false);
      $box.prop("checked", true);
    } else {
      $box.prop("checked", false);
    }
  }
}
function uploadData() {
  var fullName = $('#userFullName').val();
  var email = $('#userEmail').val();
  var phoneNumber = $('#userPhoneNumber').val();
  var birthday = `${$('#month').val()}/${$('#day').val()}/${$('#year').val()}`;
  var gender = "Male";
  var term = "Full Summer"
  var weeks = ""
  var days = ""
  var payment = "Paid Online"
  // Reasigns gender if female is selected
  if ($('#gender-female').prop("checked")) {
    gender = "Female";
  }
  // Reasigns term if week or day is selected
  if ($('#term-week').prop("checked")) {
    term = "Week";
  } else if ($('#term-day').prop("checked")) {
    term = "Day";
    dayInputTags = ['mon', 'tue', 'wed', 'thur', 'fri'];
    for (i in dayInputTags) {
      if ($(`#day-${dayInputTags[i]}`).prop("checked")) {
        let day = $(`#day-${dayInputTags[i]}`).val();
        days += `${day}, `;
      }
    }
    days = days.slice(0, -2);
  }
  // Sets the weeks column data
  let weekNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (i in weekNumbers) {
    if ($(`#week-${i}`).prop("checked")) {
      const dates = $(`#week-${i}-label`).text();
      weeks += `Week ${i}: ${dates}, `;
    }
  }
  weeks = weeks.slice(0, -2);

  if ($('#payment-method-atCamp').prop("checked")) {
    payment = "At Camp"

  }
  if (allInputsAreFilledOut()) {
    $.ajax({
      url: "https://docs.google.com/forms/d/e/1FAIpQLSfuyDUQfO2QuB43DE5I9BBa013P3-uJWf5Gx1fWj0LPUjG6TQ/formResponse",
      data: { "entry.1848769469": fullName, "entry.897201892": email, "entry.1650610961": phoneNumber, "entry.1720437000": birthday, "entry.2046497122": gender, "entry.1415828457": term, "entry.678565997": weeks, "entry.362961921": days, "entry.1269116078": payment }, type: "POST", dataType: "xml",
      statusCode: { 0: console.log('idk, status code 0?'), 200: afterSubmitHandler(payment, term) }
    });
    document.getElementById('submitButton').style.display = 'none';
  } else {
    alert("Make sure all fields are filled out properly.");
  }

}
function allInputsAreFilledOut() {
  const textIds = ['userFullName', 'userEmail', 'userPhoneNumber', 'day', 'month', 'year'];
  for (i in textIds) { if (document.getElementById(textIds[i]).value == "") { return false; } }
  if (!$('#gender-male').prop('checked') && !$('#gender-female').prop('checked')) { return false; }
  if (!$('#term-full-summer').prop('checked') && !$('#term-week').prop('checked') && !$('#term-day').prop('checked')) { return false; }
  if ($('#term-week').prop('checked')) {
    var weeksAreSelected = false;
    for (var i = 1; i < 10; i++) { if ($(`#week-${i}`).prop('checked')) { weeksAreSelected = true; } }
    if (!weeksAreSelected) { return false; }
  } else if ($('#term-day').prop('checked')) {
    var weeksAreSelected = false;
    var daysAreSelected = false;
    const days = ['mon', 'tue', 'wed', 'thur', 'fri'];
    for (var i = 1; i < 10; i++) { if ($(`#week-${i}`).prop('checked')) { weeksAreSelected = true; } }
    for (i in days) { if ($(`#day-${days[i]}`).prop('checked')) { daysAreSelected = true; } }
    if (!weeksAreSelected) { return false; }
    if (!daysAreSelected) { return false; }
  }
  if (!$('#payment-method-online').prop('checked') && !$('#payment-method-atCamp').prop('checked')) { return false; }

  return true;
}
// For Stripe
var handler = StripeCheckout.configure({
  key: 'pk_live_Vek1WDHXK9AjMQcZJxaQSVEY',
  image: '../LogoWithWhite.png',
  locale: 'auto',
  token: function (tkn) {
    let amnt = $('#paymentAmount').val();
    $.ajax({
      url: `https://jsc-payment-processor.herokuapp.com/charge`,
      data: { token: tkn.id, amount: amnt },
      statusCode: {
        200: function () {
          alert('Payment Succeeded\nPlease sign the following waiver to complete your signup.');
          window.location.replace('https://waiver.fr/p-FuRDa');
        },
        500: function () {
          alert('Something went wrong.');
        }
      }
    });
  }
});
window.addEventListener('popstate', function () {
  handler.close();
});
function showStripeForm() {
  let amnt = $('#paymentAmount').val();
  handler.open({
    name: 'Jersey Surf Camp LLC',
    description: 'Camper Payment',
    amount: amnt
  });
}
// function afterSubmitHandler(paymentPreference, term) {
//   setTimeout(function() {
//     if (paymentPreference == 'Paid Online') {
//       let amnt = $('#paymentAmount').val();
//       handler.open({
//         name: 'Jersey Surf Camp LLC',
//         description: 'Camper Payment',
//         amount: amnt
//       });
//     } else {
//       window.location.replace("../thankyou.html");
//       alert("Thanks for signing up for JSC!\nPlease read the following information thoroughly prior to attending camp.\nThank You!");
//     }
//   }, 1000)

// }
function toggleSubmitButton() {
  const submitButton = document.getElementById('submitButton');
  if ($('#payment-method-atCamp').prop("checked")) {
    submitButton.innerHTML = "Submit";
    submitButton.style.display = 'block';
  } else if ($('#payment-method-online').prop('checked')) {
    submitButton.innerHTML = 'Submit and continue to payment';
    submitButton.style.display = 'block';
  }
}
