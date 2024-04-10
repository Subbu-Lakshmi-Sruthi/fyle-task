$(document).ready(function() {
    // Enable tooltip
    $('[data-toggle="tooltip"]').tooltip()

    // Form submit event
    $('#taxCalculatorForm').submit(function(event) {
      event.preventDefault();
      const grossIncome = parseFloat($('#grossIncome').val()) || 0;
      const extraIncome = parseFloat($('#extraIncome').val()) || 0;
      const deduction = parseFloat($('#deduction').val()) || 0;
      const age = parseFloat($('#deduction').val()) || 0;
      const tax = calculateTax(grossIncome, extraIncome, deduction, age);
      showTaxModal(tax);
    });

    function calculateTax(grossIncome, extraIncome, deduction, age) {
      var taxableIncome = (grossIncome + extraIncome - deduction) * 100000; // Convert to lakhs

      // Calculate tax based on age group
      var tax = 0;
      if (taxableIncome > 800000) {
        if (age < 40) {
          tax = 0.3 * (taxableIncome - 800000);
        } else if (age >= 40 && age < 60) {
          tax = 0.4 * (taxableIncome - 800000);
        } else if (age >= 60) {
          tax = 0.1 * (taxableIncome - 800000);
        }
      }
      return tax;
    }

    function showTaxModal(tax) {
      let content = '<p>Your overall income will be <b>' + tax.toLocaleString() + '</b> after tax deductions</p>';
      if (tax <= 0) {
        content = 'No Tax to be paid :)';
      }
      $('#modalBody').html(content);
      $('#taxModal').modal('show');
    }

    // Input validation
    $('*[data-type="number"]').on('input', function() {
      if ($(this).val() != '' && isNaN(parseFloat($(this).val()))) {
        $(this).next('.fyle-error-icon').css('display', 'inline');
        $(this).addClass('fyle-error-input');
      } else {
        $(this).next('.fyle-error-icon').css('display', 'none');
        $(this).removeClass('fyle-error-input');
      }
    });
  });   