$(document).ready(function () {
  let searchHistory = [];




  $('#submitWeather').click(function (e) {
    e.preventDefault();
    var city = $('#city').val();
    searchHistory.push(city);
    $("#history").html('<li>'+searchHistory+ '<br></li>')
    if (city != '') {

    
      //---------AJAX------------

      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?appid=34fd31758b449ea433e05058c225793c&q=' + city + "&units=imperial&count=10",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
          var widget = show(data);
          console.log("here");
          $("#show").html(widget);

        //----------- Forecast Widget ------------

          var widget2 = '';

          for (var i in data.list) {
            if (i > 0 && data.list[i].dt_txt.indexOf("12:00") > -1) {
              console.log(data.list[i].dt_txt);

              var code = [
                '<div class="col-2 day">',
                '<p>',
                data.list[i].dt_txt.split(' ')[0],
                '</p>',
                //weather icon
                '<img src="http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon+'@2x.png">',
                '<p> Temp:',
                data.list[i].main.temp,
                ' degrees</p>',
                '<p> Humidity: ',
                data.list[i].main.humidity,
                '%</p>',
                '<p> Wind speed: ',
                data.list[i].wind.speed,
                ' MPH</p>',
                '</div>'
              ];

              widget2 += code.join('');
            }
          }
          $(".5day").html(widget2);
          $("#city").val('');
        }

      });
    } else {
      $("#error").html('Field cannot be empty');
    }
  });
});

function show(data) {

  console.log("show: ", data);


  // return of today's weather 
  return '<h3>' + data.city.name + ' (' + data.list[0].dt_txt.split(' ')[0] + ') </h3>' +
    '<p><strong>Temp: </strong>' + data.list[0].main.temp + ' degrees</p>' +
    '<p><strong>Humidity: </strong>' + data.list[0].main.humidity + ' %</p>' +
    '<p><strong>Wind Speed: </strong>' + data.list[0].wind.speed + ' MPH</p>';
  //second function looking for forcast data for day 1 ^^
}

