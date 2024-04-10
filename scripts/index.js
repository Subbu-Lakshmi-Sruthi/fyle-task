$(document).ready(function() {
    // Enable tooltip
    $('[data-toggle="tooltip"]').tooltip()

    // Form submit event
    $('#taxCalculatorForm').submit(function(event) {
      event.preventDefault();
      const grossIncome = parseFloat($('#grossIncome').val()) || 0;
      const extraIncome = parseFloat($('#extraIncome').val()) || 0;
      const deduction = parseFloat($('#deduction').val()) || 0;
      var age = $('#age').val();
      if(!age) {
        $('#ageError').css('display', 'inline');
        $('#age').addClass('fyle-error-input');
      } else {
        const income = calculateTax(grossIncome, extraIncome, deduction, age);
        showTaxModal(income);
      }
    });

    function calculateTax(grossIncome, extraIncome, deduction, age) {
      var taxableIncome = (grossIncome + extraIncome - deduction) * 100000; // Convert to lakhs

      // Calculate tax based on age group
      var tax = 0;
      if (taxableIncome > 800000) {
        if (age == '<40') {
          tax = 0.3 * (taxableIncome - 800000);
        } else if (age == '≥40 & <60') {
          tax = 0.4 * (taxableIncome - 800000);
        } else if (age == '≥60') {
          tax = 0.1 * (taxableIncome - 800000);
        }
      }
      return taxableIncome - tax;
    }

    function showTaxModal(income) {
      const content = '<p>Your overall income will be <b>' + income.toLocaleString() + '</b> after tax deductions</p>';
      $('#modalBody').html(content);
      $('#taxModal').modal('show');
    }

    // Clear all error
    $('.form-control').on('input', function() {
      $('.fyle-error-icon').css('display', 'none');
      $(this).removeClass('fyle-error-input');
      $('#age').removeClass('fyle-error-input');
    });

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