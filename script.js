$(document).ready(function() {
    $('#submitWeather').click(function(e){
        e.preventDefault();
        var city = $('#city').val();
        if(city != ''){
            $.ajax({
                
                url: 'https://api.openweathermap.org/data/2.5/forecast?appid=34fd31758b449ea433e05058c225793c&q=' + city + "&units=imperial&count=10",
                type: "GET",
                dataType: "jsonp",
                success: function(data){
                var widget = show(data);
                console.log("here");
                $("#show").html(widget);
                
                var widget2 = '';
              
                for (var i in data.list){
                  if(i > 0 && data.list[i].dt_txt.indexOf("12:00") > -1){
                    console.log(data.list[i].dt_txt);
                    
                    var code = [
                    
                        '<div class="col-2 day">',
                         '<p>',
                        data.list[i].dt_txt.split(' ')[0],
                        '</p>',
                        '<p> Temp: ',
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
                $("#5dayforcast").append(widget2);
                $("#city").val('');
                }
                
            });
        }else{
            $("#error").html('Field cannot be empty');
        }
    });
});

function show(data){
  
  console.log("show: ",data);
  
  
  
  return  data.city.name + ' (' + data.list[0].dt_txt.split(' ')[0] +') </h3>' + 
    '<p><strong>Temp: </strong>'+ data.list[0].main.temp +' degrees</p>' +
    '<p><strong>Humidity: </strong>'+ data.list[0].main.humidity +' %</p>' +
    '<p><strong>Wind Speed: </strong>'+ data.list[0].wind.speed +' MPH</p>'
    ; 
    //second function looking for forcast data for day 1 of 5
    
                    
    
}


// console.log('hello')