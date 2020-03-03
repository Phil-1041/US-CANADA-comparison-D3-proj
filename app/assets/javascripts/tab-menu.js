$(document).on('click', '.tab-menu__item', function() {
  var target = $(this).attr('target');
  $(this).parent('.tab-menu').find('.tab-menu__item').removeClass('selected');
  $(this).addClass('selected');

  $(this).parent('.tab-menu').parent('#tabs').find('.tab-content').addClass('hidden');
  $(target).removeClass('hidden');
})

$(document).on('click', '.unselected', function() {

  $(this).removeClass('unselected');
  $(this).parent('#search-result-container').find('.open').removeClass('open').addClass('unselected');
  $(this).addClass('open');

  //persisting opened tab on page reload
  var tabId = $(this).attr('id')
  localStorage.setItem("openTab", tabId);
})

$(document).on('click', '.fa-icon-wrapper', function () {
  $(this).parents('.open').removeClass('open').addClass('unselected')
  
  //removing locally stored video Id since none are open
  localStorage.setItem("openTab", '');
})

// Youtube Search AJAX Call 
$(document).on('click', '#search', ()=> {
  $('#loading-modal').css('display', 'flex')

  var searchTerm = $('#search-input').val()
  $('#search-input').val('')
  //persist search without reloading page 
  window.history.pushState("obj or string", "persist-search", `/page?searchTerm=${searchTerm}`)

  $.ajax({
    url: '/search',
    method: 'GET',
    data: {searchTerm},
  }).then( data => {
    $('#search-header').html(searchTerm)
    $('#tabs').html(data.html)
    $('#loading-modal').css('display', 'none')
    $('#my-data').change()
  }).fail( error => {
    console.log(error)
    $('#loading-modal').html('--request failed [Bad Request]--')
  })
})

$(document).on('click', '#reset', function() {
  $('#loading-modal').css('display', 'flex')

  window.history.pushState("obj or string", "persist-search", `/page`)

  $.ajax({
    url: '/search',
    method: 'GET',
    data: { searchTerm: 'Ruby on Rails' },
  }).then(data => {
    $('#search-header').html('Ruby on Rails')
    $('#tabs').html(data.html)
    $('#loading-modal').css('display', 'none')
    $('#my-data').change()
  }).fail(error => {
    console.log(error)
    $('#loading-modal').html('--request failed [Bad Request]--')
  })
})

// persisting opened tab on page reload
var openedTab = localStorage.getItem('openTab')

$(document).ready( function() {
    $('.unselected').each(function () {
      if ($(this).attr("id") == openedTab) {
        $(this).removeClass('unselected').addClass('open')
      }
    }); 

  // prevent form submission by pressing enter when focused on input field
  $(window).keydown(function (event) {

    if (event.keyCode == 13 && event.target.id == 'search-input') {
      event.preventDefault();

      $('#loading-modal').css('display', 'flex')

      var searchTerm = $('#search-input').val()
      $('#search-input').val('')
      window.history.pushState("obj or string", "persist-search", `/page?searchTerm=${searchTerm}`)

      $.ajax({
        url: '/search',
        method: 'GET',
        data: { searchTerm },
      }).then(data => {
        $('#search-header').html(searchTerm)
        $('#tab').html(data.html)
        $('#loading-modal').css('display', 'none')
        $('#my-data').change()
      }).fail(error => {
        console.log(error)
        $('#loading-modal').html('--request failed [Bad Request]--')
      })
    }
  });

  $(document).on('click', '#name', function(){
    window.location = '/page'
  })

});

