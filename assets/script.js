
window.onload = function () {
	var chart1 = document.getElementById("line-chart");
	if(chart1 != null) {
		chart1 = chart1.getContext("2d");
		window.myLine = new Chart(chart1).Line(lineChartData, {
			responsive: true,
			scaleLineColor: "rgba(0,0,0,.2)",
			scaleGridLineColor: "rgba(0,0,0,.05)",
			scaleFontColor: "#c5c7cc"
		});
	}
};

function get_time_difference(earlierDate, laterDate) 
{
    var oDiff = new Object();

    //  Calculate Differences
    //  -------------------------------------------------------------------  //
    laterDate = new Date(laterDate);
    earlierDate = new Date(earlierDate);
    var nTotalDiff = laterDate.getTime() - earlierDate.getTime();

    oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
    nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;

    oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
    nTotalDiff -= oDiff.hours * 1000 * 60 * 60;

    oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
    nTotalDiff -= oDiff.minutes * 1000 * 60;

    oDiff.seconds = Math.floor(nTotalDiff / 1000);
    //  -------------------------------------------------------------------  //

    //  Format Duration
    //  -------------------------------------------------------------------  //
    //  Format Hours
    var hourtext = '00';
    if (oDiff.days > 0){ hourtext = String(oDiff.days);}
    if (hourtext.length == 1){hourtext = '0' + hourtext};

    //  Format Minutes
    var mintext = '00';
    if (oDiff.minutes > 0){ mintext = String(oDiff.minutes);}
    if (mintext.length == 1) { mintext = '0' + mintext };

    //  Format Seconds
    var sectext = '00';
    if (oDiff.seconds > 0) { sectext = String(oDiff.seconds); }
    if (sectext.length == 1) { sectext = '0' + sectext };

    //  Set Duration
    var sDuration = hourtext + ':' + mintext + ':' + sectext;
    oDiff.duration = sDuration;
    //  -------------------------------------------------------------------  //
    var d =oDiff;
    d.string = '';
    if(d.days > 0){
      d.string += d.days == 1 ? d.days+' Day' : d.days+' Days';
      if(d.hours != 0)
        d.string += d.hours == 1 ? ' '+d.hours+' Hr' : ' '+d.hours+' Hrs';
      if(d.minutes != 0)
          d.string += d.minutes == 1 ? ' '+d.minutes+' min' : ' '+d.minutes+' mins';
      if(d.seconds != 0)
            d.string += d.seconds == 1 ? ' '+d.seconds+' sec' : ' '+d.seconds+' secs';
    }
    else if(d.days == 0){
      if(d.hours > 0){
        d.string += d.hours == 1 ? d.hours+' Hr' : d.hours+' Hrs';
        if(d.minutes != 0)
          d.string += d.minutes == 1 ? ' '+d.minutes+' min' : ' '+d.minutes+' mins';
        if(d.seconds != 0)
          d.string += d.seconds == 1 ? ' '+d.seconds+' sec' : ' '+d.seconds+' secs';
      }
      else{
        if(d.minutes > 0){
          d.string += d.minutes == 1 ? d.minutes+' min' : d.minutes+' mins';
          if(d.seconds != 0)
            d.string += d.seconds == 1 ? ' '+d.seconds+' sec' : ' '+d.seconds+' secs';
        }else
          d.string += d.seconds <= 1 ? d.seconds+' sec' : d.seconds+' secs';
      }
    }
    return d;
}

function current_time(t) {
  var t = typeof t === 'undefined' ? '' : t;
  if(t != '')
    t = typeof t !== 'object' ? new Date( t ) : t;
  var time = t == '' ? new Date() : t;
  var date = 
    time.getFullYear() +'-'+ 
    ('0' + (time.getMonth() + 1)).slice(-2) +'-'+
    ('0' + time.getDate()).slice(-2);
  var format = 
    ("0" + time.getHours()).slice(-2)   + ":" + 
    ("0" + time.getMinutes()).slice(-2) + ":" + 
    ("0" + time.getSeconds()).slice(-2);
  return date+' '+format;
}

String.prototype.isURL = function(){
  var urlregex = /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/;
  return urlregex.test(this);
};

String.prototype.isEmail = function(){
  var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
  return pattern.test(this);
};

String.prototype.isJson = function(){
  try {
      JSON.parse(this);
  } catch (e) {
      return false;
  }
  return true;
};

String.prototype.input_validate = function(){
  return this.replace(/["'<>`{}|\\]/g, '');
};

String.prototype.alpha_numeric = function(){
  return this.replace(/\W+/g, '');
};

String.prototype.num_validate = function(opt = 0){

  if(this.trim() === '')
    return '';

  if(opt == 0) /*return integer*/
    return parseInt(this.replace(/[^0-9]/g, ""));
  else /*return float*/
    return parseFloat(this.replace(/[^0-9-.]/g, ""));
};

String.prototype.isNumeric = function(){
  return /^[0-9]+$/.test(this);
};

var Spinner = $('<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>');

(function($, undefined) {

    $.fn.checkInput = function() {
      var rt = true;      
      $.each(this, function(k, ele){
        if(ele.value == '')
          rt = false;
        else{
          if($(ele).attr('type') == 'text')
            ele.value = ele.value.input_validate();
          else if($(ele).attr('type') == 'num' || $(ele).attr('type') == 'number'){
            ele.value = ele.value.num_validate();
            if(ele.value.match(/^[0-9]+$/) == null)
              rt = false;
          }
          else if($(ele).attr('type') == 'email'){
            if(!ele.value.isEmail())
              rt = false;
          }
          else if($(ele).attr('type') == 'url'){
            if(!ele.value.isURL())
              rt = false;
          }
          else if($(ele).attr('type') == 'password'){
            var eq_id = $(ele).attr('data-equalto');
            if(ele.value != $(eq_id).val())
              rt = false;
          }
        }
      });
      return rt;
    };

    $.fn.initPhoneCode = function(px = '22px'){
      this.off('focusin focusout');
      this.parent().find('.country-phone-code').hide();
      this.css('padding-left', px);
      this.focusin(function(){
          $(this).parent().find('.country-phone-code').show();
      });

      this.focusout(function(){
        if(this.value == '')
          $(this).parent().find('.country-phone-code').hide();
      });
    };

})(jQuery);

var Myevent = 'keyup keypress blur change mouseenter mouseleave click';

$.fn.makeFormData = function(reqlx) {
  var post = {};
  $.each(this, function(k, ele){
    var ind = $(ele).attr('id').replace(reqlx, '');
    post[ind] = ele.value;
  });
  return post;
};

$.fn.setValue = function(d, reqlx) {
  $.each(this, function(k, ele){
    var ind = $(ele).attr('id').replace(reqlx, '');
    if($('select#'+$(ele).attr('id')).length == 0)
      ele.value = d[ind];
    else
      $(ele).val(d[ind]).change();
  });
};

$.fn.initPopup = function(opt = {}){
  var main = this;
  var option = {
    dummyForm: main.find('form.modal-form').length > 0 ? main.find('form.modal-form') : $(document.createElement('form')),
    dummyInputs: main.find('form.modal-form .modal-inputs').length > 0 ? main.find('form.modal-form .modal-inputs') : $(document.createElement('input')),
    dummySubmit: main.find('form.modal-form .modal-submit').length > 0 ? main.find('form.modal-form .modal-submit') : $(document.createElement('button')),
    modal: main
  };
  if(opt.form)
    option.form = option.modal.find(opt.form).length > 0 ? option.modal.find(opt.form) : option.dummyForm;
  else
    option.form = option.dummyForm;
  if(opt.inputs)
    option.inputs = option.form.find(opt.inputs).length > 0 ? option.form.find(opt.inputs) : option.dummyInputs;
  else
    option.inputs = option.dummyInputs;
  if(opt.submit)
    option.submit = option.form.find(opt.submit).length > 0 ? option.form.find(opt.submit) : option.dummySubmit;
  else
    option.submit = option.dummySubmit;
  option.isPhone = opt.isPhone ? true : false;
  option.shortKey = '';
  if(opt.shortKey)
    option.shortKey = opt.shortKey;
  var basic = {
    ele: {
      form: option.form,
      inputs: option.inputs,
      submit: option.submit,
      modal: option.modal,
      isPhone: option.isPhone,
    },
    formKey: option.shortKey,
    Events: 'keyup keypress blur change mouseenter mouseleave click',
    validate: function(){
      var rt = basic.ele.inputs.checkInput();    
      if(!rt)
        basic.ele.submit.prop('disabled', true);
      else
        basic.ele.submit.prop('disabled', false);
      return rt;
    },
    submit: function(){
      var validate = (!basic.ele.submit.prop('disabled') && basic.validate());
      if(validate)
        basic.ele.form.find('p.form-error-msg').text('').hide();
      var rt = validate ? basic.ele.inputs.makeFormData(new RegExp(basic.formKey)) : {};
      if(opt.afterSubmit)
        opt.afterSubmit(rt, validate);
    },
    resetForm: function(){
      basic.ele.inputs.parent().removeClass('form-group--active');
      basic.ele.inputs.val('');
      basic.ele.modal.find('*').off(basic.Events);
    },
    init: function(){
      basic.resetForm();
      basic.ele.modal.modal();
      basic.ele.submit.prop('disabled', true).click(basic.submit);
      basic.ele.inputs.on(Myevent, function(){
        basic.validate();
      }).change(function(){
        if(!$(this).checkInput())
          $(this).parent().addClass('has-error');
        else
          $(this).parent().removeClass('has-error');
        if($(this).attr('type') == 'password'){
          if(typeof $(this).attr('data-equalto') !== 'undefined' && $(this).checkInput())
            $($(this).attr('data-equalto')).removeClass('has-error');
        }
      });
      if(basic.ele.isPhone) {
        basic.ele.form.find('.country-phone-code').hide();
        basic.ele.form.find('[type="number"]').initPhoneCode('32px');
      }
    }
  };
  basic.init();
  var rt = {reset: basic.resetForm, validate: basic.validate};
  rt.ajaxComplete = function(resp = {}){
    if($.isEmptyObject(resp))
      return;

    if(resp.result == 'success'){
      basic.ele.form.find('p.form-error-msg').text('').hide();
      basic.ele.modal.find('a.open-success').click();
      basic.resetForm();
      basic.ele.modal.find('.success-tab p.success-alert').text(changeLang(resp.message)).show();
    }else
      basic.ele.form.find('p.form-error-msg').text(changeLang(resp.message)).show();
  };
  rt.open = function(){
    basic.ele.modal.find('a.open-form').click();
  };
  return rt;
};

function changeLang(msg = ''){return msg};

String.prototype.short_string = function(len) {
    return this.length > len ? this.substring(0, len)+'...' : this;
}

function timerCallback(interval, callback) {
  var i = 1;
  setTimeout(function(){
    if(i == 1)
      callback();
  },  interval);
}

function sweet_alert(callback, msg = ''){
  swal({
    title: changeLang('Are you sure?'),
    text: msg == '' ? changeLang('You Want to Delete it.') : changeLang(msg),
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: changeLang('Yes'),
    cancelButtonText: changeLang('No'),
    closeOnConfirm: false
  },callback);
}

function uniqueid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
}

$(document).ready(function() {

  if($('#datatable').length > 0){
      $('#datatable').DataTable({
          rowReorder: {
              selector: 'td:nth-child(0)'
          },
          "aaSorting": [[ 0, 'desc' ]],
      });
  }

  $('#sidebar-collapse .menu').find('.'+activeMenu).addClass('active');
  var sch = $(document).innerHeight() - 200;
  $('form#settings').css('height',sch+'px');
  signup.init();
  batch.init();
  user.init();
  test.init();
  tquest.init();
  testList.init();
  studTest.init();
  settings.init();
  if($('.sg-rich-txt').length > 0)
    $('.sg-rich-txt').jqte();

  /*node.on('sample', function(data){
    console.log(data);
  });*/
});

var signup = {
  init: function(){
    if(typeof signup.trigger === 'undefined')
      return;

    $('#sign-up-submit').off('click').click(function(){
      if(!$('#s-form').parsley().validate())
        return;

      if($('#s-form [name="uname"][rno="true"]').length < 1)
        return;

      $('#sign-up-submit').off('click');
      $('#s-form').submit();
    });

    $('#s-form [name="uname"]').off('keyup').keyup(function(){
      if(this.value.trim() != ''){
        if(this.value.match(/^[0-9]+$/) == null)
          this.value = this.value.replace(/[^0-9]/g, "");

        var rno = $(this).parsley();                
        RollnoExist((b) => {
          rno.reset();
          if(b){       
            window.ParsleyUI.addError(rno, "myCustomError", 'This Roll No Already Exist!');
            rno.$element.attr('rno', 'false');
          }else
            rno.$element.attr('rno', 'true')
        }, this.value);
      }
    });
  }
};

function RollnoExist(callback, rno, id = ''){
  $.ajax({
    type: 'post',
    url: base_url+'login/check_rno',
    data: {rno: rno, id: id},
    success: function(data){
      var bool = data == '1';
      callback(bool);
    }
  });
}

var batch = {
  init: function(){
    if(!/batch/i.test(window.location.pathname))
      return;
    this.ajax_table();
  },
  get: function(id = ''){
    $('div#loading').hide();
    $('#pbatch-modal .tab-pane.fade.active.in').removeClass('active in');
    $('#pbatch-modal #pbatch-form').addClass('active in');
    $('#pbatch-id').val(id);
    batch.popup = $('#pbatch-modal').initPopup({
      shortKey: 'pbatch-',
      afterSubmit: function(d, v){
        d.id = $('#pbatch-id').val();
        batch.update(d);
      } 
    });
    $('#pbatch-from').off('change').change(function(){
      if(this.value != '') {
        $('#pbatch-to').children(':not([value=""])').remove();
        var frm = parseInt(this.value) + 2;
        for(var i = frm; i < (frm + 2); i++)
          $('#pbatch-to').append($('<option>'+i+'</option>'));

        $('#pbatch-to').val((frm + 1)).change();
      }
    });
  },
  update: function(data){
    if($.isEmptyObject(data))
      return;
    $('#pbatch-submit').off('click').html(Spinner);
    $.ajax({
      type: 'post',
      url: base_url+'api/batch',
      dataType: 'json',
      data: data,
      success: function(resp){
        $('#pbatch-id').val('');
        batch.popup.ajaxComplete(resp);
        batch.table.ajax.reload();
        $('#pbatch-submit').html('Submit');
      }
    });
  },
  trigger: function(id = ''){
    $('div#loading').show();
    if(id != ''){
      $('#pbatch-modal .modal-title').text('Edit Batch');
      $.ajax({
        type: 'post',
        url: base_url+'api/get_batch/'+id,
        dataType: 'json',
        success: function(data){
          if($.isEmptyObject(data)){
            $('#pbatch-id').val('');
            Command: toastr["error"]("Data Not Found!");
            return;
          }
          batch.get(id);
          $('#pbatch-modal .modal-inputs').setValue(data, 'pbatch-');          
        }
      })
    }else{
      $('#pbatch-modal .modal-title').text('Add Batch');
      batch.get();
    }
  },
  delete: function(id = ''){
    sweet_alert(() => {
      $.ajax({
        type: 'post',
        url: base_url+'api/delete_batch/'+id,
        success: function(data){
          swal.close();
          Command: toastr['success']('Batch Deleted Successfull');
          batch.table.ajax.reload();
        }
      });
    }, 'You Want to Delete it.\n !Caution: Students will be Deleted Automaically');
  }
};

batch.ajax_table = function(){
    var user_col = [];
    $.each($('#ajax-table thead tr').children(), function(){
      var col_name = $(this).text().toLowerCase().replace(/ /g, '_');
      user_col.push({data: col_name});
    });
    batch.table = $('#ajax-table').DataTable({
        aaSorting : [[0, 'desc']],
        "aoColumnDefs": [{ 'bSortable': false, 'aTargets':  [1,5]}],
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "ajax": {
                  "url": base_url+'api/batch_ajax_table',
                  "type": "POST",
                  "dataSrc": function ( json ) {
                    return json.data;
                  }
                },
        "columns": user_col
    });    
};

var user = {
  init: function(){
    if(!/user/i.test(window.location.pathname))
      return;
    this.ajax_table();    
    $('#change-batch').off('click').click(function(){
      $('#select-batch').modal();
      $('#sb-submit').off('click').click(user.changeBatch);
    });
    if(mu_batch_id == '0')
      $('#change-batch').click();
    else{
      var crt_batch = $('#select-batch select.form-control').children('option[value="'+mu_batch_id+'"]').text();
      if($('.table-responsive').children('.panel-body').find('.crt_batch').length == 0)  
        $('.table-responsive').children('.panel-body').prepend('<h3 style="margin: 0;" class="crt_batch text-center">'+crt_batch+'</h3>');
      else
        $('.table-responsive').children('.panel-body').find('.crt_batch').text(crt_batch);
    }
  },
  changeBatch: function(){
    var btEle = $('#select-batch select.form-control')[0];
    if(btEle.value == ''){
      Command: toastr['info']('Select Batch!');
      return;
    }
    $('#ajax-table').DataTable().clear();
    $('#ajax-table').DataTable().destroy();
    mu_batch_id = btEle.value;
    user.ajax_table();
    history.pushState({urlPath: base_url+'user'},'', base_url+'user?bid='+mu_batch_id);
    $('#select-batch').modal('toggle');
    var crt_batch = $('#select-batch select.form-control').children('option[value="'+mu_batch_id+'"]').text();
    if($('.table-responsive').children('.panel-body').find('.crt_batch').length == 0)  
      $('.table-responsive').children('.panel-body').prepend('<h3 style="margin: 0;" class="crt_batch text-center">'+crt_batch+'</h3>');
    else
      $('.table-responsive').children('.panel-body').find('.crt_batch').text(crt_batch);
  },
  ajax_table: function(){
    var user_col = [];
    $.each($('#ajax-table thead tr').children(), function(){
      var col_name = $(this).text().toLowerCase().replace(/ /g, '_');
      col_name = col_name == 'roll_no' ? 'uname' : col_name;
      user_col.push({data: col_name});
    });
    user.table = $('#ajax-table').DataTable({
        aaSorting : [[0, 'desc']],
        "aoColumnDefs": [{ 'bSortable': false, 'aTargets':  [5]}],
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "ajax": {
                  "url": base_url+'api/user_ajax_table?bid='+mu_batch_id,
                  "type": "POST",
                  "dataSrc": function ( json ) {
                    return json.data;
                  }
                },
        "columns": user_col
    }); 
  },
  get: function(id = ''){
    $('#auser-password, #auser-cpassword, #auser-lname').val('');
    $('#auser-form').parsley().reset();
    $('div#loading').hide();
    $('#auser-modal .tab-pane.fade.active.in').removeClass('active in');
    $('#auser-modal #auser-form').addClass('active in');
    $('#auser-id').val(id);
    user.popup = $('#auser-modal').initPopup({
      shortKey: 'auser-',
      afterSubmit: function(d, v){
        d.id = $('#auser-id').val();
        d.password = $('#auser-password').val();
        d.cpassword = $('#auser-cpassword').val();
        user.update(d);
      } 
    });
    if(mu_batch_id != 'all' && mu_batch_id != '0')
      $('#auser-batch_id').val(mu_batch_id).change();
    if(id == '')
      $('#auser-modal input[type="password"]').attr('required','required');
    else
      $('#auser-modal input[type="password"]').removeAttr('required');
    $('#auser-modal #auser-uname').off('keyup').keyup(function(){
      if(this.value.trim() != ''){
        if(this.value.match(/^[0-9]+$/) == null)
          this.value = this.value.replace(/[^0-9]/g, "");

        var rno = $(this).parsley();                
        RollnoExist((b) => {
          rno.reset();
          rno.$element.parent().removeClass('has-error');
          if(b){       
            rno.$element.parent().addClass('has-error');
            window.ParsleyUI.addError(rno, "myCustomError", 'This Roll No Already Exist!');
            rno.$element.attr('rno', 'false');
          }else
            rno.$element.attr('rno', 'true')
        }, this.value, $('#auser-id').val());
      }
    });
  },
  update: function(data){
    data.lname = $('#auser-lname').val();
    if($.isEmptyObject(data))
      return;
    if($('#auser-modal #auser-uname[rno="true"]').length < 1){
      $('#auser-modal #auser-uname').keyup();
      return;
    }
    if(!$('#auser-form').parsley().validate())
      return;
    $('#auser-submit').off('click').html(Spinner);
    $.ajax({
      type: 'post',
      url: base_url+'api/update_user',
      dataType: 'json',
      data: data,
      success: function(resp){
        $('#auser-id').val('');
        user.popup.ajaxComplete(resp);
        user.table.ajax.reload();
        $('#auser-submit').html('Submit');
      }
    });
  },
  trigger: function(id = ''){
    $('#auser-modal .modal-title').text('Add Student');
    $('#auser-form').parsley().reset();
    $('div#loading').show();    
    if(id != ''){
      $('#auser-modal .modal-title').text('Edit Student');
      $.ajax({
        type: 'post',
        url: base_url+'api/get_user/'+id,
        dataType: 'json',
        success: function(data){
          if($.isEmptyObject(data)){
            $('#auser-id').val('');
            Command: toastr["error"]("Data Not Found!");
            return;
          }
          user.get(id);
          $('#auser-modal .modal-inputs').setValue(data, 'auser-');
          $('#auser-lname').val(data.lname);
          $('#auser-modal #auser-uname').keyup();
        }
      });
    }else{
      user.get();   
    }
  },
  delete: function(id = ''){
    sweet_alert(() => {
      $.ajax({
        type: 'post',
        url: base_url+'api/delete_user/'+id,
        success: function(data){
          swal.close();
          Command: toastr['success']('Student Deleted Successfull');
          user.table.ajax.reload();
        }
      });
    });
  }
};

user.approve = function(){
  if($('.stud-approve:checked').length <= 0)
    return;
  var post = [];
  $.each($('.stud-approve:checked'), function(k, ele){
    post.push(ele.getAttribute('data-id'));
  });
  $.ajax({
    type: 'post',
    url: base_url+'api/approve_student',
    data: {stud: post},
    success: function(d){ Command: toastr['success']('Student Approved Successfull'); }
  });
};

var test = {
  init: function(){
    if(typeof testpage === 'undefined')
      return;
    quest.init();
    var sch = $(document).innerHeight() - 300;
    $('.make-test-contents').css('height', sch+'px');
      var windowScroll = function(event){
      /*var st = $(this).scrollTop();
      var rch = $(document).outerHeight() - $(window).height();
      if(st < rch || !test.loadmore)
        return;*/
      var scroll_height = this.scrollHeight - $(this).outerHeight();
      if(this.scrollTop < scroll_height || !test.loadmore)
          return;
      if($('.active.in#test-content').length > 0)
        test.getData(true);
      else if($('.active.in#quest-content').length > 0)
        quest.getData(true);
    };
    $('.make-test-contents').off('scroll').scroll(windowScroll);
    $('.make-test-contents').off('touchmove').on('touchmove', windowScroll);
    $('.custom-tab#make-test-tabs li a').off('click').click(function(){
      $('#make-test-header .tab-pane.active.in').removeClass('active in');
      var id = this.getAttribute('href').replace(/#/, '');
      $('#make-test-header .tab-pane[content-id="'+id+'"]').addClass('active in');
      if(id == 'test-content' && $('#test-content').children().length == 0)
        test.getData();
      else if(id == 'quest-content' && $('#quest-content').children().length == 0)
        quest.getData();
    });
    if($('.active.in#test-content').length > 0)
      test.getData();
    else if($('.active.in#quest-content').length > 0)
      quest.getData();
  },
  get: function(id = ''){
    $('div#loading').hide();
    $('#ptest-modal .tab-pane.fade.active.in').removeClass('active in');
    $('#ptest-modal #ptest-form').addClass('active in');
    $('#ptest-id').val(id);
    test.popup = $('#ptest-modal').initPopup({
      shortKey: 'ptest-',
      afterSubmit: function(d, v){
        d.id = $('#ptest-id').val();
        test.update(d);
      } 
    });
  },
  update: function(data){
    if($.isEmptyObject(data))
      return;
    $('#ptest-submit').off('click').html(Spinner);
    $.ajax({
      type: 'post',
      url: base_url+'api/test_api?update',
      dataType: 'json',
      data: data,
      success: function(resp){
        $('#ptest-id').val('');
        test.popup.ajaxComplete(resp);
        $('#ptest-submit').html('Submit');
        if(resp.id)
          data.id = resp.id;
        var panel = $('#test-content').children('#'+data.id);
        if(panel.length > 0){
          panel.find('[ui-element="test-name"]').text(data.name.short_string(25));  
          panel.find('[ui-element="test-desb"]').text(data.desb);
        }
        else{
          var ui = test.uipanels(data);
          $('#test-content').prepend(ui.html());
        }
      }
    });
  },
  trigger: function(id = ''){
    $('#ptest-modal .modal-title').text('Add Test');
    $('#ptest-form').parsley().reset();
    $('div#loading').show();
    if(id != ''){
      $('#ptest-modal .modal-title').text('Edit Test');
      $.ajax({
        type: 'post',
        url: base_url+'api/test_api?get_single='+id,
        dataType: 'json',
        success: function(data){
          if($.isEmptyObject(data)){
            $('#ptest-id').val('');
            Command: toastr["error"]("Data Not Found!");
            return;
          }
          test.get(id);
          $('#ptest-modal .modal-inputs').setValue(data, 'ptest-');
        }
      });
    }else{
      test.get();   
    }
  },
  loadMoreBtn: $('#t-load-more'),
  loadmore: true,
  panelLength: function(){return $('#test-content').children().length;},
  dataTotal: 0,
  getData: function(loadmore = false){
    var post = {offset: test.panelLength()};
    if(post.offset >= test.dataTotal && loadmore)
      return;
    $('div#loading').show();  
    if(loadmore)
      test.loadMoreBtn.show();
    test.loadmore = false;
    $.ajax({
      type: 'post',
      url: base_url+'api/test_api?get',
      data: post,
      dataType: 'json',
      success: function(data){
        $('div#loading').hide();
        if(loadmore)
          test.loadMoreBtn.hide();
        if(data.length > 0){
          test.dataTotal = data[0].total;
          $.each(data, function(k, obj){
            test.uipanels(obj, $('#test-content'));
          });
        }
        if(test.dataTotal == 0){
          var msg = $('<h2 class="text-center">There\'s no Test</h2>');
          msg.css({
            color: '#c57e7e',
            'font-weight' : 'bold'
          });
          $('#test-content').html(msg);
        }
        test.loadmore = true;
      }
    })
  },
  delete: function(id = ''){
    sweet_alert(() => {
      $.ajax({
        type: 'post',
        url: base_url+'api/test_api?delete='+id,
        success: function(data){
          swal.close();
          Command: toastr['success']('Test Deleted Successfull');
          $('#test-content').children('#'+id).remove();
          test.dataTotal--;
          if(test.panelLength() < 10)
            test.getData();
        }
      });
    });
  }
}

test.uipanels = function(d, ele = ''){
  if($.isEmptyObject(d))
    d = {id: uniqueid(),name: '',desb: ''};
  d.m = typeof d.m !== 'undefined' ? d.m : 'test';
  var ui = $('#test-panel');
  ui.children().attr('id', d.id);
  ui.find('[ui-element="test-name"]').text(d.name.replace(/<\/?[^>]+(>|$)/g, "").short_string(25));  
  ui.find('[ui-element="test-desb"]').html(d.desb);
  var testAddQuest = ui.find('[ui-element="test-add-quest"]');
  var testAssign = ui.find('[ui-element="test-assign-btn"]');
  var edit = ui.find('[ui-element="test-edit-btn"]');
  var delBtn = ui.find('[ui-element="test-delete-btn"]');
  edit.attr('onclick', d.m+'.trigger("'+d.id+'");');
  delBtn.attr('onclick', d.m+'.delete("'+d.id+'");');
  testAddQuest.parent().removeClass('hidden');
  testAddQuest.parent().next().removeClass('hidden');
  testAddQuest.attr('href', base_url+'test/'+d.id);
  testAssign.parent().removeClass('hidden');
  testAssign.parent().next().removeClass('hidden');
  testAssign.attr('href', base_url+'test/'+d.id+'?assign');
  if(typeof ele === 'object')
    ele.append(ui.html());
  return ui;
};


var quest = {
  init: function(){

  },
  get: function(id = ''){    
    $('div#loading').hide();
    $('[name="question-type"][value="0"]').prop('checked', true);
    $('[name="quest-tf"][value="0"]').prop('checked', true);
    quest.toggleType();
    $('#pquest-modal .tab-pane.fade.active.in:not(.sub-tab)').removeClass('active in');
    $('#pquest-modal #pquest-form').addClass('active in');
    $('#pquest-id').val(id);
    quest.popup = $('#pquest-modal').initPopup({
      shortKey: 'pquest-',
      afterSubmit: function(d, v){
        d = {};
        d.id = $('#pquest-id').val();
        d.qtype = $('[name="question-type"]:checked').val();
        d.content = $('#pquest-content').val();
        d.tf = $('[name="quest-tf"]:checked').val();
        d.choises = [];
        if(d.content.trim() == ''){
          Command: toastr["error"]("Field is Mandatory!");
          $('#pquest-submit').prop('disabled', false);
          return;
        }
        if($('#quest-choises').children().length == 4){
          $.each($('#quest-choises').children(), function(){
            var $this = $(this)
            var optVal = $this.find('.quest-choices').val();
            var optVal = optVal != '' && typeof optVal === 'string' ? optVal : 'Option '+$this.attr('opt');
            var ch = {id: $this.find('input[type="hidden"]').val(), value: optVal};
            ch.crt = $this.find('input[type="radio"]').prop('checked') ? 1 : 0;
            d.choises.push(ch);
          });
        }
        quest.update(d);
      } 
    });
    
    $('#pquest-submit').prop('disabled', false);
    $('.pquest-content').children('.jqte').remove();
    $('.pquest-content').append('<textarea id="pquest-content"></textarea>');
    if($('.jqte_source #pquest-content').length == 0)
      $('#pquest-content').jqte();
  },
  trigger: function(id = ''){
    $('#quest-choises').html('');
    $('#pquest-modal .modal-title').text('Create Question');
    $('#pquest-form').parsley().reset();
    $('div#loading').show();
    if(id != ''){
      $('#pquest-modal .modal-title').text('Edit Question');
      $.ajax({
        type: 'post',
        url: base_url+'api/quest_api?get_single='+id,
        dataType: 'json',
        success: function(data){
          if($.isEmptyObject(data)){
            $('#pquest-id').val('');
            Command: toastr["error"]("Data Not Found!");
            return;
          }
          quest.get(id);
          var ch = typeof data.choises === 'string' && data.choises.isJson() ? JSON.parse(data.choises) : ch;
          quest.initChoises(ch);
          $('[name="question-type"][value="'+data.qtype+'"]').prop('checked', true);
          quest.toggleType(data.qtype == 1);
          $('[name="quest-tf"][value="'+data.tf+'"]').prop('checked', true);
          $('#pquest-content').jqteVal(data.content); 
        }
      });
    }else{
      quest.get();
      quest.initChoises();  
    }
  },
  update: function(data){
    if($.isEmptyObject(data))
      return;
    $('#pquest-submit').off('click').html(Spinner);
    $.ajax({
      type: 'post',
      url: base_url+'api/quest_api?update',
      dataType: 'json',
      data: data,
      success: function(resp){
        $('#pquest-id').val('');
        quest.popup.ajaxComplete(resp);
        $('#pquest-modal .modal-body.scrolable-content').css('height','270px');
        $('#pquest-submit').html('Submit');
        if(resp.id)
          data.id = resp.id;
        if($('#quest-content').length > 0)
          var panel = $('#quest-content').children('#'+data.id);
        else
          var panel = $('#tquest-content').children('#'+data.id);
        data.choises = JSON.stringify(data.choises);
        var d = quest.panelUI(data);
        var ui = quest.uipanels(d);
        if(panel.length > 0)
          panel.html(ui.children().html());
        else{
          if($('#quest-content').length > 0)
            $('#quest-content').prepend(ui.html());
          $('#quest-list').html('');
          if(tquest.autoAdd){
            if($('#quest-content').length == 0)
              $('#tquest-content').prepend(ui.html());
            tquest.addQuest(resp.req_volume);
            $('div#loading').show();
            tquest.update(tquest.listDone);          
          }
        }        
      }
    });
  },
  panelLength: function(){return $('#quest-content').children().length;},
  dataTotal: 0,
  getData: function(loadmore = false){
    var post = {offset: quest.panelLength()};
    if(post.offset >= quest.dataTotal && loadmore)
      return;
    $('div#loading').show();
    if(loadmore)
      test.loadMoreBtn.show();  
    test.loadmore = false;
    $.ajax({
      type: 'post',
      url: base_url+'api/quest_api?get',
      data: post,
      dataType: 'json',
      success: function(data){
        $('div#loading').hide();
        if(loadmore)
          test.loadMoreBtn.hide();
        if(data.length > 0){
          quest.dataTotal = data[0].total;
          $.each(data, function(k, obj){
            var d = quest.panelUI(obj);
            quest.uipanels(d, $('#quest-content'));
          });
        }
        if(quest.dataTotal == 0){
          var msg = $('<h2 class="text-center">There\'s no Questions</h2>');
          msg.css({
            color: '#c57e7e',
            'font-weight' : 'bold'
          });
          $('#quest-content').html(msg);
        }
        test.loadmore = true;
      }
    })
  },
  panelUI: function(data){
    if($.isEmptyObject(data))
      return {};
    var rt = {id: data.id, name: data.content, m: 'quest'};
    rt.desb = '<div class="panel-question">'+data.content+'</div>';
    rt.desb += '<ul class="panel-answer">';
    if(data.qtype == 0 && data.choises.isJson()){
      var ch = JSON.parse(data.choises);
      var options = ['A','B','C','D'];
      if(ch.length == 4){
        $.each(ch, function(k, opt){
          rt.desb += '<li><span>'+options[k]+'. '+opt.value+'</span></li>';
        });
      }
    }else if(data.qtype == 1)
      rt.desb += '<li><span>1. True</span></li><li><span>2. False</span></li>';
    rt.desb += '</ul>';
    return rt;
  },
  toggleType: function(b = false){
    var tabEle = $('#pquest-form').children('.tab-content');
    tabEle.children('.tab-pane.active.in').removeClass('active in');
    if(b){
      $('#pquest-modal .modal-body.scrolable-content').css('height','540px');
      tabEle.children('#quest-tf').addClass('active in');
    }
    else{
      $('#pquest-modal .modal-body.scrolable-content').css('height','780px');
      tabEle.children('#quest-choises').addClass('active in');
    }
  },
  initChoises: function(ch = []){
    $('#quest-choises').html('');
    var options = [
      $('<div class="form-group" opt="A"></div>'),
      $('<div class="form-group" opt="B"></div>'),
      $('<div class="form-group" opt="C"></div>'),
      $('<div class="form-group" opt="D"></div>')
    ];
    $.each(options, function(k, ele){
      var uid = typeof ch[k] === 'undefined' ? 'opt-'+ele.attr('opt').toLowerCase() : ch[k].id;
      var value = typeof ch[k] !== 'undefined' ? ch[k].value : '';
      var crt = typeof ch[k] !== 'undefined' ? parseInt(ch[k].crt) : 0;
      crt = crt == 1 ? 'checked' : '';
      var radio = '&nbsp<input type="radio" name="quest-choises" id="'+uid+'" '+crt+' />'
      ele.append($('<label>Option '+ele.attr('opt')+' <span class="text-danger">*</span>'+radio+'</label>'));
      ele.append($('<input type="hidden" value="'+uid+'" />'));
      ele.append($('<textarea class="quest-choices">'+value+'</textarea>'));
      $('#quest-choises').append(ele);
    });
    if($('[name="quest-choises"]:checked').length == 0)
      $('[name="quest-choises"]').eq(0).prop('checked', true);
    $('.quest-choices').jqte();
  },
  delete: function(id = ''){
    sweet_alert(() => {
      swal.close();
      $('div#loading').show();
      $.ajax({
        type: 'post',
        url: base_url+'api/quest_api?delete='+id,
        success: function(data){
          $('div#loading').hide();
          Command: toastr['success']('Questions Deleted Successfull');
          $('#quest-content').children('#'+id).remove();
          quest.dataTotal--;
          if(quest.panelLength() < 10)
            quest.getData();
        }
      });
    });
  }
};


quest.uipanels = function(d, ele = ''){
  if($.isEmptyObject(d))
    d = {id: uniqueid(),name: '',desb: ''};
  d.m = typeof d.m !== 'undefined' ? d.m : 'test';
  var ui = $('#test-panel');
  ui.children().attr('id', d.id);
  ui.find('[ui-element="test-name"]').text(d.name.replace(/<\/?[^>]+(>|$)/g, "").short_string(25));  
  ui.find('[ui-element="test-desb"]').html(d.desb);
  if(typeof testSingle === 'undefined') {
    var edit = ui.find('[ui-element="test-edit-btn"]');
    var delBtn = ui.find('[ui-element="test-delete-btn"]');
    var aq = ui.find('[ui-element="test-add-quest"]').parent();
    var as = aq.next().next();
    edit.attr('onclick', d.m+'.trigger("'+d.id+'");');
    delBtn.attr('onclick', d.m+'.delete("'+d.id+'");');
    aq.addClass('hidden');
    aq.next().addClass('hidden');
    as.addClass('hidden');
    as.next().addClass('hidden');
  }else{
    ui.children().attr('data-index', d.index);
    ui.find('[ui-element="test-rm-btn"]').attr('onclick', 'tquest.remove("'+d.id+'")');
  }
  if(typeof ele === 'object')
    ele.append(ui.html());
  return ui;
};

var tquest = {/*test single page handler*/
  init: function(){
    if(typeof testSingle === 'undefined')
      return;
    assign.init();
    var sch = $(document).innerHeight() - 300;
    $('.make-test-contents').css('height', sch+'px');
    var windowScroll = function(event){
      /*var st = $(this).scrollTop();
      var rch = $(document).outerHeight() - $(window).height();
      if(st < rch || !test.loadmore)
        return;*/
      var scroll_height = this.scrollHeight - $(this).outerHeight();
      if(this.scrollTop < scroll_height || !test.loadmore)
          return;
      if($('.active.in#tquest-content').length > 0)
        tquest.getData({loadmore: true});
      else if($('.active.in#assign-content').length > 0)
        assign.getData(true);
    };
    $('.make-test-contents').off('scroll').scroll(windowScroll);
    $('.make-test-contents').off('touchmove').on('touchmove', windowScroll);
    $('.custom-tab#make-test-tabs li a').off('click').click(function(){
      $('#make-test-header .tab-pane.active.in').removeClass('active in');
      var id = this.getAttribute('href').replace(/#/, '');
      $('#make-test-header .tab-pane[content-id="'+id+'"]').addClass('active in');
      if(id == 'tquest-content' && $('#tquest-content').children().length == 0)
        tquest.getData();
      else if(id == 'assign-content' && $('#assign-content').children('#ajax-table_wrapper').length == 0)
        assign.getData();
    });
    if($('.active.in#tquest-content').length > 0)
      tquest.getData();
    else if($('.active.in#assign-content').length > 0)
      assign.getData();
    $('#ptquest-action').off('click').click(function(){
      if($(this).hasClass('btn-warning')){
        if($('#ptquest-modal').hasClass('in'))
          $('#ptquest-modal').modal('toggle');
        return;
      }else{
        $('div#loading').show();
        tquest.update(tquest.listDone);
      }
    });
  },
  listDone: function(data){
    Command: toastr["success"]("Questions Added Successfull");
    tquest.isModified = tquest.autoAdd = false;
    if($('#ptquest-modal').hasClass('in'))
      $('#ptquest-modal').modal('toggle');
    tquest.changeSubmitActionUi();          
    $('#tquest-content').html('');
    tquest.getData();
  },
  createNew: function(){
    swal({
      title: 'After Created. Are You Sure?',
      text: 'You Want to Add Question to this Test.',
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: changeLang('Yes'),
      cancelButtonText: changeLang('No'),
      closeOnConfirm: false
    },function(c){
      tquest.autoAdd = c;
      quest.trigger();
      swal.close();
      if($('#ptquest-modal').hasClass('in'))
        $('#ptquest-modal').modal('toggle');
    });
  },
  update: function(callback){
    if(typeof callback !== 'function')
      return;
    if (testQuest.length == 0) {
      if($('div#loading').css('display') === 'block')
        $('div#loading').hide();
      Command: toastr["error"]("Select Atleast One Question");
      return;
    }
    $.ajax({
      url: base_url+'api/test_api?update_questions='+test_id,
      type: 'post',
      data: {quest:testQuest},
      success: callback
    });
  },
  remove: function(id = ''){
    var enid = id;
    var confirm = function(){
      var ele = $('#tquest-content').children('#'+enid);
      var id = ele.attr('data-index');      
      tquest.removeQuest(id);
      swal.close();
      $('div#loading').show();
      tquest.update(function(d){
        Command: toastr["success"]("Question Removed Successfull");
        $('div#loading').hide();
         ele.remove();
        $('#quest-list').children('[data-index="'+id+'"]').removeClass('selected');
        if(tquest.panelLength() < 10)
            tquest.getData();
      });
    };
    sweet_alert(confirm, 'You Want to Remove it from this Test.');
  },
  panelLength: function(){return $('#tquest-content').children().length;},
  listLength: function(){return $('#quest-list').children().length;},
  dataTotal: 0,
  listTotal: 0,
  isModified: false,
  autoAdd: false,
  getData: function(opt = {loadmore: false, list: false}){
    var loadmore = opt.loadmore;
    var post = {offset: tquest.panelLength(), reverse: false, keyword: ''};
    var dataTotal = tquest.dataTotal;
    if (opt.list){
      post.offset = tquest.listLength();
      post.reverse = true;
      post.keyword = opt.keyword;
      dataTotal = tquest.listTotal; 
    }
    if(post.offset >= dataTotal && loadmore)
      return;
    $('div#loading').show();  
    if(loadmore)
      test.loadMoreBtn.show();
    test.loadmore = false;
    $.ajax({
      type: 'post',
      url: base_url+'api/test_api?get_questions='+test_id,
      data: post,
      dataType: 'json',
      success: function(data){
        $('div#loading').hide();
        if(loadmore)
          test.loadMoreBtn.hide();
        if (opt.list){
          opt.callback(data);
          test.loadmore = true;
          return;
        }
        if(data.length > 0){
          tquest.dataTotal = data[0].total;
          $.each(data, function(k, obj){
            var d = quest.panelUI(obj);
            d.index = obj.index;
            quest.uipanels(d, $('#tquest-content'));
          });
        }
        if(tquest.dataTotal == 0){
          var msg = $('<h2 class="text-center">There\'s no Questions</h2>');
          msg.css({
            color: '#c57e7e',
            'font-weight' : 'bold'
          });
          $('#tquest-content').html(msg);
        }
        test.loadmore = true;
      }
    });
  },
  pushui: function(data, ele = $('#quest-list')){
    if(data.length == 0)
      return;
    $.each(data, function(k, obj){
      obj.content = obj.content.replace(/<\/?[^>]+(>|$)/g, "");
      var li = $('<li id="'+obj.id+'" data-index="'+obj.index+'"><h3 class="head">'+obj.content+'</h3>'
                +'<div class="checked">'
                +'<i class="fa fa-check"></i>'
                +'</div></li>');
      var opt_ui = $('<ul class="options"></ul>');
      if(obj.qtype == 0 && obj.choises.isJson()){
        var ch = JSON.parse(obj.choises);
        var options = ['A','B','C','D'];
        if(ch.length == 4){
          $.each(ch, function(k, opt){
            opt = $('<li><span>'+options[k]+'. '+opt.value.short_string(35)+'</span></li>');
            opt_ui.append(opt);
          });
        }
      }
      else if(obj.qtype == 1){
        var opt = $('<li><span>1. True</span></li>');
        opt_ui.append(opt);
        opt = $('<li><span>2. False</span></li>');
        opt_ui.append(opt);
      }
      li.append(opt_ui);
      if(testQuest.length > 0){
        $.each(testQuest, function(ke, j){
          if(String(j.id) === obj.index)
            li.addClass('selected');
        });
      }
      ele.append(li);      
    });
    tquest.initSelectListEvent();
    tquest.changeSubmitActionUi();
  },
  initSelectListEvent: function(){
    $('#quest-list').children().off('click').click(function(){
      var $this = $(this);
      var id = $this.attr('data-index');
      if($this.hasClass('selected')){
        $this.removeClass('selected');        
        if(testQuest.length > 0)
          tquest.removeQuest(id);
      }
      else{
        $this.addClass('selected');
        tquest.addQuest(id);
      }
      tquest.isModified = true;
      tquest.changeSubmitActionUi();
    });
  },
  removeQuest: function(id){
    var rm = [];
    $.each(testQuest, function(k, obj){
      if(obj.id != id)
        rm.push(obj);
    });
    testQuest = rm;
  },
  addQuest: function(id){
    var add = true;
    if(testQuest.length > 0){
      $.each(testQuest, function(k, obj){
        if(obj.id === id)
          add = false;
      });
    }
    if(add)
      testQuest.push({id: id, created: current_time()});
  },
  changeSubmitActionUi: function(){
    if(!tquest.isModified)
        $('#ptquest-action').removeClass('btn-success')
      .addClass('btn-warning').html('<i class="fa fa-close"></i>');
    else
      $('#ptquest-action').removeClass('btn-warning')
    .addClass('btn-success').html('Done');
  },
  listOptions: {
    loadmore: false,list: true,keyword: '',
    callback: function(data){
      if(data.length > 0){
        tquest.listTotal = data[0].total;
        tquest.pushui(data);
      }
      if(tquest.listTotal == 0){
        var msg = $('<h2 class="text-center">There\'s no Questions</h2>');
        msg.css({
          color: '#c57e7e',
          'font-weight' : 'bold'
        });
        $('#quest-list').html(msg);
      }
      if(!$('#ptquest-modal').hasClass('in'))
        $('#ptquest-modal').modal();
    }
  },
  trigger: function(){
    if($('#quest-list').children().length > 0){
      if(!$('#ptquest-modal').hasClass('in'))
        $('#ptquest-modal').modal();
      return;
    }
    $('#quest-list').html('');
    tquest.listOptions.loadmore = false;
    tquest.listOptions.keyword = '';
    tquest.getData(tquest.listOptions);
    $('#quest-list').off('scroll').scroll(tquest.listScroll);
    $('#quest-list').off('touchmove').on('touchmove', tquest.listScroll);
    $('#ptquest-keyword').off('keyup').keyup(function(){      
      if(this.value.length > 3 && test.loadmore){
        $('#quest-list').html('');
        tquest.listOptions.loadmore = false;
        tquest.listOptions.keyword = this.value;
        tquest.getData(tquest.listOptions);
      }
      if(tquest.listOptions.keyword.trim() != '' && this.value.trim() == ''){
        $('#quest-list').html('');
        tquest.listOptions.loadmore = false;
        tquest.listOptions.keyword = '';
        tquest.getData(tquest.listOptions);
      }
    });
  },
  listScroll: function(){    
    var scroll_height = this.scrollHeight - $(this).outerHeight();
    if(this.scrollTop < scroll_height || !test.loadmore)
        return;
    tquest.listOptions.loadmore = true;
    tquest.getData(tquest.listOptions); 
  }
};

var assign = {
  init: function(){

    /*this.ajax_table();*/
    $('.input-group.date input:not(#passign-name)').keypress(() => {return false});
    $('#passign-name').next('span.input-group-addon').click(function(){
      $('#passign-name').prop('disabled', false).focus();
    });
    $('#passign-from').datetimepicker({format: 'hh:mm A'});
    $('#passign-to').datetimepicker({format: 'hh:mm A', useCurrent: false});
    $("#passign-from").on("dp.change", function (e) {
        $('#passign-to input').val(current_time(e.date._d).split(' ')[1]);
        $('#passign-to').data("DateTimePicker").minDate(e.date);
        $('#passign-from input').parsley().validate();
    });
    $("#passign-to").on("dp.change", function (e) {
        $('#passign-from').data("DateTimePicker").maxDate(e.date);
        $('#passign-to input').parsley().validate();
    });
    $('#passign-date').datetimepicker({format: 'DD-MM-YYYY'});
    $('#passign-date').on("dp.change", function (e) {
      $('#passign-date').data("DateTimePicker").minDate(new Date());
      $('#passign-to').data("DateTimePicker").minDate('09:05 AM');
      $('#passign-date input').parsley().validate();
    });
    $('#passign-submit').off('click').click(assign.submit);
  },
  viewResult: {currentAid: '', popup: $('#vresult-modal')},
  trigger: function(id = ''){    
    $('#passign-modal .modal-inputs').val('');
    $('#passign-batch_id').val('').change();
    $('#passign-from input').val('09:00 AM');
    $('#passign-to input').val('10:00 AM');    
    $('#passign-date').data("DateTimePicker").minDate(new Date());
    $('#passign-to').data("DateTimePicker").minDate('09:05 AM');
    $('#passign-modal .modal-inputs').prop('required', true);
    $('#passign-form').parsley().reset();
    $('#passign-name').prop('disabled', true).val($('#test_name').val());
    $('#passign-publish').prop('checked', false);
    $('#passign-negative').prop('checked', false);
    $('#passign-id').val(id);
    $('#passign-modal').modal();    
    if(id != ''){
      $('div#loading').show();
      $.ajax({
        type: 'post',
        url: base_url+'api/assign_api?get_single='+id,
        dataType: 'json',
        success: function(d){
          $('div#loading').hide();
          if($.isEmptyObject(d)){
            $('#passign-id').val('');
            Command: toastr["error"]("Data Not Found!");
            return;
          }
          $('#passign-name').val(d.name);
          $('#passign-publish').prop('checked', d.publish == 1);
          $('#passign-negative').prop('checked', d.negative == 1);
          $('#passign-date input').val(d.date);
          $('#passign-from input').val(d.from);
          $('#passign-to input').val(d.to); 
          $('#passign-batch_id').val(d.batch_id).change();
        }
      });
    }
  },
  submit: function(){
    if(!$('#passign-form').parsley().validate())
      return;
    if(testQuest.length == 0){
      Command: toastr['error']('Add Atleast One Question!');
      if($('#passign-modal').hasClass('in'))
        $('#passign-modal').modal('toggle');
      $('#make-test-tabs li a[href="#tquest-content"]').click();
      return;
    }
    $('#passign-submit').off('click').html(Spinner);
    $('div#loading').show();
    $.ajax({
      type: 'post',
      url: base_url+'api/assign_api?update',
      dataType: 'json',
      data: {
        test_id: test_id, batch_id: $('#passign-batch_id').val(),
        id: $('#passign-id').val(), name: $('#passign-name').val(),
        date: $('#passign-date input').val(), publish: $('#passign-publish').prop('checked') ? 1 : 0,
        from: $('#passign-from input').val(), to: $('#passign-to input').val(),
        negative: $('#passign-negative').prop('checked') ? 1 : 0
      },success: function(resp){
        $('#passign-submit').off('click').click(assign.submit).html('Submit');
        $('div#loading').hide();
        Command: toastr[resp.result](resp.message);
        if(resp.result == 'success'){
          $('#passign-modal').modal('toggle');
          assign.table.ajax.reload();
        }
      }
    });
  },
  delete: function(id = ''){
    sweet_alert(() => {
      $.ajax({
        type: 'post',
        url: base_url+'api/assign_api?delete='+id,
        success: function(data){
          swal.close();
          Command: toastr['success']('Test Deleted Successfull');
          $('tr#row-'+id).remove();
        }
      });
    });
  },
  getData: function(loadmore = false){
    if(loadmore)
      return;
    if($('#assign-content').children('#ajax-table_wrapper').length == 0)
      assign.ajax_table();
    else
      assign.table.ajax.reload();
  }
};

assign.ajax_table = function(){
    var col = [];
    $.each($('#ajax-table thead tr').children(), function(){
      var col_name = $(this).text().toLowerCase().replace(/ /g, '_');
      col_name = col_name == 'test_name' ? 'name' : col_name;
      col_name = col_name == 'assigned_batch' ? 'batch_id' : col_name;
      col_name = col_name == 'timing' ? 'from' : col_name;
      col.push({data: col_name});
    });
    assign.table = $('#ajax-table').DataTable({
        aaSorting : [[0, 'desc']],
        "aoColumnDefs": [{ 'bSortable': false, 'aTargets':  [2,5]}],
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "ajax": {
                  "url": base_url+'api/assign_api?ajax_table&test_id='+test_id,
                  "type": "POST",
                  "dataSrc": function ( json ) {
                    return json.data;
                  }
                },
        "columns": col
    });
    $('#ajax-table').css('width', '100%');
};

assign.viewResult.trigger = function(aid){
  $('#vajax-table').DataTable().clear();
  $('#vajax-table').DataTable().destroy();
  $('div#loading').show();
  $.ajax({
    url: base_url+'api/assign_api?get_single='+aid,
    dataType: 'json',
    success: function(d){
      $('div#loading').hide();
      if($.isEmptyObject(d)){
        assign.viewResult.currentAid = '';
        Command: toastr["error"]("Data Not Found!");
        return;
      }
      assign.viewResult.currentAid = aid;
      assign.viewResult.popup.find('.modal-title').text('Result For '+d.name);
      assign.viewResult.popup.modal();
      assign.viewResult.ajax_table();
    }
  });
};

assign.viewResult.ajax_table = function(){
    var col = [
      {data: 'id'},
      {data: 'user_id'},
      {data: 'roll_no'},
      {data: 'noc'},
      {data: 'no_of_q'},
      {data: 'result'}
    ];
    assign.viewResult.table = $('#vajax-table').DataTable({
        aaSorting : [[0, 'desc']],
        "aoColumnDefs": [{ 'bSortable': false, 'aTargets':  [5]}],
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "ajax": {
                  "url": base_url+'api/assign_api?get_result='+assign.viewResult.currentAid,
                  "type": "POST",
                  "dataSrc": function ( json ) {
                    return json.data;
                  }
                },
        "columns": col
    });
    $('#vajax-table').css('width', '100%');
};

var testList = {
  init: function(){
    if(typeof testSchedlue === 'undefined')
      return;
    var windowScroll = function(event){
      var scroll_height = this.scrollHeight - $(this).outerHeight();
      if(this.scrollTop < scroll_height || !test.loadmore)
          return;
      testList.getData(true);
    };
    $('#test-content').off('scroll').scroll(windowScroll);
    $('#test-content').off('touchmove').on('touchmove', windowScroll);
    testList.getData();
    var sch = $(document).innerHeight() - 220;
    $('#test-content').css('height', sch+'px');     
  },
  futureTestListener: function(){
    if($('#test-content').children().length <= 0)
      return; 
    setInterval(function(){
      var futureTest = $('#test-content').children('li.future-test');
      var active = $('#test-content').children('li.active');
      if(futureTest.length > 0){
        $.each(futureTest, function(k, ele){
          var $ele = $(ele).find('[ui-element="test-result"]');
          var df = get_time_difference(current_time(), $ele.attr('started-at'));
          $ele.html(df.string+' to start');
          if($ele.attr('started-at') < current_time())
            $(ele).removeClass('future-test').addClass('active rdy-to-start');          
        });
      }
      if(active.length > 0){
        $.each(active, function(k, ele){
          var $ele = $(ele).find('[ui-element="test-result"]');
          var df = get_time_difference(current_time(), $ele.attr('end-at'));
          $ele.html(df.string+' to end');
          if($ele.attr('end-at') < current_time()){
            $(ele).removeClass('active');
            if($(ele).hasClass('rdy-to-start'))
              $ele.html('Apsent');
            else
              $ele.html('View Result');
          }
        });
      }
    },  1000);
  },
  dataTotal: 0,
  panelLength: function(){return $('#test-content').children().length;},
  getData: function(loadmore = false){
    var post = {offset: testList.panelLength()};
    if(post.offset >= testList.dataTotal && loadmore)
      return;
    $('div#loading').show();
    test.loadmore = false;
    $.ajax({
      type: 'post',
      url: base_url+'api/test_schedule?get',
      data: post,
      dataType: 'json',
      success: function(data){
        $('div#loading').hide();
        if(data.length > 0){
          testList.dataTotal = data[0].total;
          $.each(data, function(k, obj){
            testList.uipanels(obj, $('#test-content'));
          });
          $('#test-content').children().off('click').click(function(){
            if(!$(this).hasClass('active'))
              return;
            var asid = this.getAttribute('id');
            var ck = function(id){
              if(id == 0)
                return;
              $('div#loading').hide();
              window.location.href = base_url+id;
            };
            $('div#loading').show();
            testList.present(asid, ck);
          });
        }
        if(testList.dataTotal == 0){
          var msg = $('<h2 class="text-center">There\'s no Test</h2>');
          msg.css({
            color: '#c57e7e',
            'font-weight' : 'bold'
          });
          $('#test-content').html(msg);
          var sch = $('#test-content').children().innerHeight() + 70;
          $('#test-content').css('height', sch+'px');
        }
        test.loadmore = true;
        testList.futureTestListener();
      }
    });
  },
  present: function(id, callback){
    if(id == '')
      return;
    $.ajax({
      type: 'post',
      url: base_url+'api/test_schedule?present='+id,
      success: function(rid){
        callback(rid);
      }
    });
  }
};


testList.uipanels = function(d, ele = ''){
  if($.isEmptyObject(d))
    d = {id: uniqueid(),name: '',time: ''};
  d.m = typeof d.m !== 'undefined' ? d.m : 'testList';
  var ui = $('ul#test-panel');
  ui.children().attr('id', d.id);
  ui.find('[ui-element="test-name"]').text(d.name.replace(/<\/?[^>]+(>|$)/g, "").short_string(25));  
  ui.find('[ui-element="test-time"]').html(d.time);
  ui.find('[ui-element="test-date"]').html(d.date);
  ui.find('[ui-element="test-desb"]').html(d.desb.short_string(280));
  var result = ui.find('[ui-element="test-result"]').html('');
  var crt_time = current_time().split(' ');
  crt_time[2] = current_time();
  ui.children().removeClass('active future-test rdy-to-start');
  var isShowResult = false;
  if((d.from < crt_time[1] && d.to > crt_time[1]) && d.compareDate == crt_time[0]) {
    ui.children().addClass('active');
    result.attr('end-at', d.compareDate+' '+d.to);
    result.html(get_time_difference(crt_time[2], d.compareDate+' '+d.to).string+' to end');
    if(d.present == 0)
      ui.children().addClass('rdy-to-start');
  }else{
    var started_at = d.compareDate+' '+d.from;
    if(started_at > crt_time[2]){
      ui.children().addClass('future-test');
      var dif = get_time_difference(crt_time[2], started_at);
      result.html(dif.string+' to start');
      result.attr('started-at', started_at);
      result.attr('end-at', d.compareDate+' '+d.to);
    }
    else{
      if(d.present == 0)
        result.html('Apsent');
      else
        isShowResult = true;
    }
  }
  result.prev().text('Status: ');
  if(isShowResult || d.attempt != 0){
    if(d.attempt.attempt > (no_of_attempt - 1)){
      result.prev().text('Result: ');
      if(d.publish == 1)
        result.html('<span class="text-success text-bold">'+d.attempt.noc + ' / '+d.attempt.no_of_q+'</span>');
      else
        result.html('<span class="text-warning text-bold">Will Come Soon</span>');
      ui.children().removeClass('active');
    }else{
      if(d.attempt.attempt == '0')
        result.html('Apsent');
    }
  }
  if(typeof ele === 'object')
    ele.append(ui.html());
  return ui;
};

user.conjectTion = function(){
  $.each($('#stud-quest').children('div.loaded'), function(k, ele){
    var id = this.getAttribute('data-id');
    var span = $(ele).find('.q-options li span[id="'+id+'"]');
    span.parent().find('input[type="radio"]').prop('checked', true);
  });
};

var studTest = {
  init: function(){
    if(typeof studTestPage === 'undefined')
      return;
    var sch = $(document).innerHeight() - 190;
    $('.ques-btn, #stud-quest').css('height', sch+'px');
    var act_id = $('#stud-quest').children('.active.in').attr('data-id');
    studTest.getQuest(act_id, 1);
    studTest.lastQuest.html('Submit');
    studTest.getNoAttempt = function(){
      var no_attempt = 0;
      $.each($('#stud-quest').children('div.loaded'), function(k, ele){
        var id = ele.getAttribute('data-id');
        var v = $('[name="'+id+'"]:checked').val();
        if(typeof v !== 'undefined')
          no_attempt++;
      });
      return no_attempt;
    };
    studTest.submit = function(){
      var noq = $('#stud-quest').children('div').length;
      var ld = false;
      var no_attempt = 0;
      if(noq == $('#stud-quest').children('.loaded').length){        
        no_attempt = studTest.getNoAttempt();
        ld = noq === no_attempt;
      }
      if(studTest.negative() && !ld){
        Command: toastr['error']('Answer All The Questions');
        return;
      }
      var post = [];
      $.each($('#stud-quest').children('div'), function(k, ele){
        var obj = {id: ele.getAttribute('data-id')};
        var v = $('[name="'+obj.id+'"]:checked').val();
        obj.ans = typeof v !== 'undefined' ? v : 'false';
        post.push(obj);
      });
      var form = $('#result-submit');
      form.find('input[name="answers"]').val(JSON.stringify(post));
      form.submit();
    }; 
    $('.select-quest-no').off('click').click(function(event){
      var qid = this.getAttribute('data-id');
      var ele = $('#stud-q-'+qid);
      if(studTest.negative()){
        if(ele.prev().length == 0 || ele.prev().hasClass('loaded'))
          studTest.getQuest(qid, this.innerText);
        else
          return false;
      }else
        studTest.getQuest(qid, this.innerText);
    });
    $('.action-btns a.btn').off('click').click(function(){
      var id = this.getAttribute('data-id');
      var qnoEle = $('.select-quest-no[data-id="'+id+'"]');
      if(qnoEle.length > 0 && $('#questions-content-loading').hasClass('hide'))
          qnoEle.click();
    });
    if(studTest.timer()) {
      $('#test-timer').html(get_time_difference(current_time(), testTo).string+' to End');
      setInterval(function(){
        if(!studTest.timer()){
          window.location.href = base_url;
          return;
        }
        var dif = get_time_difference(current_time(), testTo);
        $('#test-timer').html(dif.string+' to End');
        $('#test-timer')[0].className = 'pull-right';
        if((dif.days <= 0 && dif.hours <= 0) && (dif.minutes <= 0 && dif.seconds <= 59))
          $('#test-timer').addClass('text-danger');
        else if((dif.days <= 0 && dif.hours <= 0) && (dif.minutes < 10))
          $('#test-timer').addClass('text-warning');
      }, 1000);
    }else
      window.location.href = base_url;
  },
  timer: function(){
    return (current_time() > testFrom && current_time() < testTo);
  },
  negative: function(){return negative == 0},
  lastQuest: $('#stud-quest').children(':last-child').prev().find('.action-btns .next a.btn'),
  triggerLoading: function(){
    if($('#questions-content-loading').hasClass('hide'))
      $('#questions-content-loading').removeClass('hide');
    else
      $('#questions-content-loading').addClass('hide');
  },
  getQuest: function(id, qno = 0){
    var ele = $('#stud-q-'+id);
    if(id == '' || ele.hasClass('loaded'))
      return;
    studTest.triggerLoading();
    $.ajax({
      type: 'post',
      url: base_url+'api/test_schedule?get_questions='+id,
      data: {qno : qno},
      success: function(ui){        
        ele.addClass('loaded');
        ele.prepend(ui);
        var $this = $('.select-quest-no[data-id="'+id+'"]');
        $this.parent().addClass('loaded');
        var nxt = $this.parent().next().children('a');
        var prv = $this.parent().prev().children('a');
        if(nxt.length > 0)
          ele.find('.action-btns .next a').attr('data-id', nxt.attr('data-id'));
        if(prv.length > 0)
          ele.find('.action-btns .prev a').attr('data-id', prv.attr('data-id'));
        studTest.triggerLoading();
        studTest.lastQuest.off('click').click(studTest.submit);
      }
    });
  },
  handleCheck: function(ele){
    $(ele).prev('input').prop('checked', true);
  }
};

var settings = {
  form: $('#settings'),
  init: function(){
    if(this.form.length == 0)
      return;
    this.form.attr('action', window.location.href);
    this.form.find('input.form-control:not(.not-req)').prop('required', true);
    this.form.find('#save').click(this.save);
    this.form.find('input.form-control[data-type="text"]').keyup(function(){
      if(/["'<>`{}|\\]/g.test(this.value))
        this.value = this.value.input_validate();
    });
    this.form.find('input.form-control[data-type="number"]').keyup(function(){
      if(/[^0-9]/g.test(this.value))
        this.value = this.value.num_validate();
      if(this.getAttribute('name') == 'load_more_count'){
        $(this).parsley().reset();
        if(this.value < 10 && this.value != '')
          ParsleyUI.addError($(this).parsley(), 'cus_error', 'Minimum 10');
      }
      if(this.getAttribute('name') == 'no_of_negt_quest' && parseInt(this.value) == 0)
        this.value = 1;
    });
    this.form.find('input.form-control[name="uname"]').keyup(function(){
      if(/\W+/g.test(this.value))
        this.value = this.value.alpha_numeric();
    });
    this.form.find('input.form-control[type="password"]').keyup(function(){
      var pf =settings.form.find('input.form-control[type="password"]');
      if(pf.length == 3)
        pf.prop('required', !(pf[0].value == '' && pf[1].value == '' && pf[2].value == ''));
    });
  },
  save: function(){
    if(!settings.form.parsley().validate())
      return false;
    if($('[name="load_more_count"]').val() < 10)
      $('[name="load_more_count"]').val(10);

    var lm = settings.form.find('input.form-control[name="load_more_count"]');
    if(lm.val() < 10){
      lm.val(10);
      lm.parsley().reset();
    }
    settings.form.submit();
  }
};
