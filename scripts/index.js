$(document).ready(function() {
    // Form submit event
    $('#taxCalculatorForm').submit(function(event) {
      event.preventDefault();
      const grossIncome = parseFloat($('#grossIncome').val());
      const extraIncome = parseFloat($('#extraIncome').val());
      const deduction = parseFloat($('#deduction').val());
      var age = $('#age').val();
      const hasError = 
        isNaN(grossIncome) || grossIncome < 0 
        || isNaN(extraIncome) || extraIncome < 0 
        || isNaN(deduction) || deduction < 0|| !age;

      // Show age error only on submission
      if(!age) {
        $('#ageError').css('display', 'inline');
        $('#age').addClass('fyle-error-input');
      }

      if(!hasError) {
        const income = calculateTax(grossIncome, extraIncome || 0, deduction || 0, age);
        $('.fyle-submit-error').css('display', 'none');
        showTaxModal(income);
      } else {
        $('.fyle-submit-error').css('display', 'block');
      }
    });

    function calculateTax(grossIncome, extraIncome, deduction, age) {
      const taxableIncome = (grossIncome + extraIncome - deduction) * 100000; // Convert to lakhs
      const taxThreshold = 800000;
      const taxPercent = {
        '<40' : 0.3,
        '≥40 & <60' : 0.4,
        '≥60': 0.1
      }

      // Calculate tax based on age group
      var tax = 0;
      if (taxableIncome > taxThreshold) {
        tax = taxPercent[age] * (taxableIncome - taxThreshold);
      }
      return taxableIncome - tax;
    }

    function showTaxModal(income) {
      const content = '<p>Your overall income will be <b>' + income.toLocaleString() + '</b> after tax deductions</p>';
      $('#modalBody').html(content);
      $('#taxModal').modal('show');
    }

    // Clear age errors happened during submission
    $('#age').on('input', function() {
      $(this).next('.fyle-error-icon').css('display', 'none');
      $(this).removeClass('fyle-error-input');
    });

    // Input validation on type numbers
    $('*[data-type="number"]').on('input', function() {
      const value = parseFloat($(this).val());
      if ($(this).val() != '' && (isNaN(value) || value < 0)) {
        $(this).next('.fyle-error-icon').css('display', 'inline');
        $(this).addClass('fyle-error-input');
      } else {
        $(this).next('.fyle-error-icon').css('display', 'none');
        $(this).removeClass('fyle-error-input');
      }
    });
    
  });   