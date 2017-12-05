$(document).ready(function() {
  $('input[type=radio]').click(toggleDropDownState);
  $('input[type=checkbox]').click(calculateTermPrice);
  $('input[name=week]').click(ifOnlyOneWeekCanBeSelected);
  $('input[name=payment-method]').click(toggleSubmitButton);
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
  let price = 0;
  if ($('#term-week').prop("checked")) {
    const weekStates = [1,2,3,4,5,6,7,8,9,10];
    let weeksChecked = 0;
    for (i in weekStates) {
      if ($(`#week-${i}`).prop("checked")) {
        weeksChecked += 1;
      }
    }
    price = weeksChecked * 300;

  } else if ($('#term-day').prop("checked")) {
    const days = ['mon', 'tue', 'wed', 'thur', 'fri'];
    let daysChecked = 0;
    for (d in days) {
      if ($(`#day-${days[d]}`).prop("checked")) {
        daysChecked += 1;
      }
    }
    price = daysChecked * 75;
  }
  document.getElementById('term-price').innerHTML = `$${price}.00`
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
  var birthday = `${$('#day').val()}/${$('#month').val()}/${$('#year').val()}`;
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
    dayInputTags = ['mon','tue','wed','thur','fri'];
    for (i in dayInputTags) {
      if ($(`#day-${dayInputTags[i]}`).prop("checked")) {
        let day = $(`#day-${dayInputTags[i]}`).val();
        days += `${day}, `;
      }
    }
    days = days.slice(0,-2);
  }
  // Sets the weeks column data
  let weekNumbers = [1,2,3,4,5,6,7,8,9]
  for (i in weekNumbers) {
    if ($(`#week-${i}`).prop("checked")) {
      const dates = $(`#week-${i}-label`).text();
      weeks += `Week ${i}: ${dates}, `;
    }
  }
  weeks = weeks.slice(0,-2);

  if ($('#payment-method-atCamp').prop("checked")) {
    payment = "At Camp"
  }

  if (allInputsAreFilledOut()) {
    $.ajax({
      url: "https://docs.google.com/forms/d/e/1FAIpQLSfuyDUQfO2QuB43DE5I9BBa013P3-uJWf5Gx1fWj0LPUjG6TQ/formResponse",
      data: {"entry.1848769469":fullName, "entry.897201892":email, "entry.1720437000":birthday, "entry.2046497122":gender, "entry.1415828457":term, "entry.678565997":weeks, "entry.362961921":days, "entry.1269116078":payment}, type:"POST", dataType:"xml",
      statusCode: {0: afterSubmitHandler(payment), 200: afterSubmitHandler(payment)}
    });
      document.getElementById('submitButton').style.display = 'none';
  } else {
    console.log("Couldn't submit");
    alert("Make sure all inputs are filled out properly.");
  }

}
function allInputsAreFilledOut() {
  console.log("Checking All Input Fields.")
  const textIds = ['userFullName', 'userEmail', 'day', 'month', 'year']
  for (i in textIds) {if (document.getElementById(textIds[i]).value == "") {return false;}}
  if (!$('#gender-male').prop('checked') && !$('#gender-female').prop('checked')) {return false;}
  if (!$('#term-full-summer').prop('checked') && !$('#term-week').prop('checked') && !$('#term-day').prop('checked')) {return false;}
  if ($('#term-week').prop('checked')) {
    var weeksAreSelected = false;
    for (var i = 1; i < 10; i++) {if($(`#week-${i}`).prop('checked')) {weeksAreSelected = true;}}
    if (!weeksAreSelected) {return false;}
  } else if ($('#term-day').prop('checked')) {
    var weeksAreSelected = false;
    var daysAreSelected = false;
    const days = ['mon', 'tue', 'wed', 'thur', 'fri'];
    for (var i = 1; i < 10; i++) {if($(`#week-${i}`).prop('checked')) {weeksAreSelected = true;}}
    for (i in days) {if ($(`#day-${days[i]}`).prop('checked')) {daysAreSelected = true;}}
    if (!weeksAreSelected) {return false;}
    if (!daysAreSelected) {return false;}
  }
  if (!$('#payment-method-online').prop('checked') && !$('#payment-method-atCamp').prop('checked')) {return false;}

  return true;
}
function afterSubmitHandler(paymentPreference) {
  if (paymentPreference == 'Paid Online') {
    // Go to payment gateway
    console.log("Going to payment gateway")
  } else {
    window.location.replace("../thankyou.html")
  }
}
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
