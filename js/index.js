var documentWidth = window.screen.availWidth;
cellSideLength = 0.2 * documentWidth;
cellSpace = 0.04 * documentWidth;
cellSideLength1 = 0.28 * documentWidth
$(function() {

    $('#city').click(function() {
        if($(".mask").css("display")!= "none") {
            $(".mask").hide(200);
            return;
        }
             
        $(".maskCity").remove();
        $(".maskSchool").remove();
        $.get('./data/city.json').success(function(data) {
            var city = data.city;
            var length = Math.ceil(city.length / 4);
            for (var i = 0; i < city.length / 4; i++)
                for (var j = 0; j < 4 && (j + i * 4) < city.length; j++) {
                    $(".mask").append('<div class="maskCity"  data-city="' + city[j + i * 4] + '"   id="city-' + i + '-' + j + '">' + city[j + i * 4] + '</div>');
                    var numCity = $('#city-' + i + '-' + j);
                    numCity.css('height', cellSideLength);
                    numCity.css('line-height', cellSideLength + 'px');
                    numCity.css('width', cellSideLength);
                    numCity.css('top', getPosTop(i, j, 0));
                    numCity.css('left', getPosLeft(i, j, 0));
                }
            $(".mask").css("height", (length + 1) * cellSpace + length * cellSideLength);
            $(".mask").show(200);
        });
        $(".mask").click(function(event) {
            content = event.target.dataset.city;
            if (content != undefined) {
                $("#cityContent").text(content);
                $("#schoolContent").text("学校")
                $(".mask").hide(200);
            }
        });
    });

    $("#school").click(function() {
        if($(".mask").css("display")!= "none") {
            $(".mask").hide(200);
            return;
        }
        if ($("#cityContent").text() == "城市")
            return;
        $(".maskCity").remove();
        $(".maskSchool").remove();
        $.get('./data/school.json').success(function(data) {
            var school = data.school;
            var length = Math.ceil(school.length / 3);
            for (var i = 0; i < school.length / 3; i++)
                for (var j = 0; j < 3 && (j + i * 3) < school.length; j++) {
                    $(".mask").append('<div class="maskSchool"  data-school="' + school[j + i * 3] + '"   id="school-' + i + '-' + j + '">' + school[j + i * 3] + '</div>');
                    var numSchool = $('#school-' + i + '-' + j);
                    numSchool.css('height', cellSideLength1 / 2);
                    numSchool.css('width', cellSideLength1);
                    numSchool.css('top', getPosTop(i, j, 1));
                    numSchool.css('padding-top', cellSideLength1 / 8);
                    numSchool.css('left', getPosLeft(i, j, 1));
                }
            $(".mask").css("height", (length + 1) * cellSpace + 0.5* length * cellSideLength1);
            $(".mask").show(200);
        });
        $(".mask").click(function(event) {
            content = event.target.dataset.school;
            if (content != undefined) {
                $("#schoolContent").text(content);
                $(".mask").hide(200);
            }
        });
    });
});



function getPosTop(i, j, flag) {
    if (flag == 0)
        return cellSpace + i * (cellSpace + cellSideLength);
    else
        return cellSpace + i * (cellSpace + cellSideLength1 / 2);
}

function getPosLeft(i, j, flag) {
    if (flag == 0)
        return cellSpace + j * (cellSpace + cellSideLength);
    else
        return cellSpace + j * (cellSpace + cellSideLength1);
}
