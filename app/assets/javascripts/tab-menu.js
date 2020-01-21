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
  let tabId = $(this).attr('id')
  localStorage.setItem("openTab", tabId);
})

$(document).on('click', '.fa-icon-wrapper', function () {
  $(this).parents('.open').removeClass('open').addClass('unselected')
  
  //removing locally stored video Id since none are open
  localStorage.setItem("openTab", '');
})

// Youtube Search AJAX Call 
$(document).on('click', '#search', ()=> {
  let searchTerm = $('#search-input').val()
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
  }).fail( error => {
    console.log(error)
  })
})

$(document).on('click', '#reset', () => {

  window.history.pushState("obj or string", "persist-search", `/page`)

  $.ajax({
    url: '/search',
    method: 'GET',
    data: { searchTerm: 'Ruby on Rails' },
  }).then(data => {
    $('#search-header').html('Ruby on Rails')
    $('#tabs').html(data.html)
  }).fail(error => {
    console.log(error)
  })
})

// persisting opened tab on page reload
let openedTab = localStorage.getItem('openTab')

$(document).ready( () => {
    $('.unselected').each(function () {
      if ($(this).attr("id") == openedTab) {
        $(this).removeClass('unselected').addClass('open')
      }
    }); 

  // prevent form submission by pressing enter when focused on input field
  $(window).keydown(function (event) {

    if (event.keyCode == 13 && event.target.id == 'search-input') {
      event.preventDefault();

      let searchTerm = $('#search-input').val()
      $('#search-input').val('')
      window.history.pushState("obj or string", "persist-search", `/page?searchTerm=${searchTerm}`)

      $.ajax({
        url: '/search',
        method: 'GET',
        data: { searchTerm },
      }).then(data => {
        $('#search-header').html(searchTerm)
        $('#tab').html(data.html)
      }).fail(error => {
        console.log(error)
      })
    }
  });

  $(document).on('click', '#name', function(){
    window.location = '/page'
  })

});

