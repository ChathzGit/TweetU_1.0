var pos = 0, neg = 0, maxIDSearch = -1, maxIDPopular = -1;
var pos2 = 0, neg2 = 0, maxIDSearch2 = -1, maxIDPopular2 = -1;

var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];



var twitterThing = angular.module('myAppIndex', ['chart.js'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});

twitterThing.controller('posNegSentiment', function($scope, getPosNeg,  $window, $timeout, $http) {

    $scope.loading = false;


    $scope.getInfo = function() {

        $scope.loading = true;

        getPosNeg.setPosNeg($scope.search, 2, $scope);
        getPosNeg.setPosNeg2($scope.search2, 2, $scope);
    };

});

twitterThing.service("getTweets", function($http, $q) {

    var getTweets = function (search, maxID, recent) {

        var canceller = $q.defer();

        var cancelTweet = function (reason) {
            canceller.resolve(reason);
        };

        var tweet = $http.get(baseUrl + "/public/get_tweets", {
            params: {search: search, maxID: maxID, recent: recent},
            timeout: canceller.promise
        }).then(function (response) {
            return response.data;
        });

        return {
            tweet: tweet,
            cancelTweet: cancelTweet
        };
    };

    return {
        getTweets: getTweets
    };

});

twitterThing.service("checkPosNeg", function($http, $q) {

    var getType = function (search) {

        var canceller = $q.defer();

        var cancelChecker = function (reason) {
            canceller.resolve(reason);
        };

        var type = $http.get("https://twinword-sentiment-analysis.p.mashape.com/analyze/", {
            headers: {
                'X-Mashape-Key': 'ojF8QuQu1ZmshWjxUrOGDmm5iuV2p1S2cpwjsnmHgOkkAsMmzO',
                'Accept': 'application/json'
            },
            params: {text: search},
            timeout: canceller.promise
        }).then(function (response) {
            return response.data;
        });

        return {
            type: type,
            cancelChecker: cancelChecker
        };
    };

    return {
        getType: getType
    };

});

twitterThing.factory('getPosNeg', function(getTweets, checkPosNeg) {
    function setPosNeg(search, count, $scope, $http) {
        if (count > 0) {

            var tweet = getTweets.getTweets(search, maxIDPopular, 1);
            tweet.tweet.then(function (response) {
                if (response["Error"] == undefined) {
                    for (var i = 0; i < response.length - 1; i++) {
                        (function (response, i) {

                            var posNeg = checkPosNeg.getType(response[i]["text"]);
                            posNeg.type.then(function (result) {

                                if(result["score"] >= 0.05 || result["score"] <= -0.05 || result["ratio"] == 1) {

                                    if ($scope.loading) {
                                        $scope.loading = false;
                                    }

                                    if (result["type"] == "positive") {
                                        pos += 1;
                                    } else if (result["type"] == "negative") {
                                        neg += 1;
                                    }

                                    $scope.positive = Math.round(100 * pos / (pos + neg));
                                    $scope.negative = Math.round(100 * neg / (pos + neg));

                                    //console.log("data1");
                                    //console.log($scope.positive);
                                    //console.log($scope.negative);

                                    //pie chart
                                    $scope.labels = ["Good", "Bad"];
                                    $scope.data = [$scope.positive, $scope.negative];
                                    $scope.colors = ['#72C02C', '#3498DB', '#717984', '#F1C40F'];
                                    $scope.options =  {
                                        responsive: false,
                                        maintainAspectRatio: false
                                    }

                                    //bar chart
                                    $scope.barlabels = ["Good", "Bad"];
                                    $scope.bardata = [
                                        [$scope.data[0], $scope.data[1]]
                                    ];
                                    $scope.barcolors = ['#717984', '#F1C40F'];
                                    $scope.baroptions =  {
                                        responsive: false,
                                        maintainAspectRatio: false
                                    }

                                    count--;
                                }

                                if (i == Math.round(response.length * 20 / 100)) {
                                    maxIDSearch = response[response.length - 1];
                                    return setPosNeg(search, count, $scope);
                                }


                            });

                        })(response, i);
                    }
                } else {
                    console.log("Error in setposneg 1");
                }
            });


        } else {
            return;
        }
    }

    function setPosNeg2(search, count, $scope, $http) {
        $scope.countries = [];
        if (count > 0) {

            var tweet = getTweets.getTweets(search, maxIDPopular2, 1);
            tweet.tweet.then(function (response) {
                if (response["Error"] == undefined) {

                    for (var i = 0; i < response.length - 1; i++) {
                        (function (response, i) {

                            //get country
                            var separators = [' ', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?', ',', '!'];
                            var splitted_address = response[i]["tweeterslocation"].split(new RegExp(separators.join('|'), 'g'));
                            var address = splitted_address;
                            for(var i=1; i<splitted_address.length; i++){
                                address = address + " " + splitted_address[i];
                            }
                            var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyDqtKh83UC16va5rExAQkumKax699B-rLY";

                            $scope.getcountryid = function(country_name){
                                if(country_name == 'Afghanistan'){
                                    return '93';
                                }
                                if(country_name == 'Albania'){
                                    return '120';
                                }
                                if(country_name == 'Argentina'){
                                    return '25';
                                }
                                if(country_name == ''){
                                    return '';
                                }
                                if(country_name == 'Australia'){
                                    return '175';
                                }
                                if(country_name == 'Austria'){
                                    return '131';
                                }
                                if(country_name == 'Bangladesh'){
                                    return '96';
                                }
                                if(country_name == 'Belgium'){
                                    return '133';
                                }
                                if(country_name == 'Bolivia'){
                                    return '26';
                                }
                                if(country_name == 'Brazil'){
                                    return '27';
                                }
                                if(country_name == 'Cambodia'){
                                    return '100';
                                }
                                if(country_name == 'Canada'){
                                    return '05';
                                }
                                if(country_name == 'Chile'){
                                    return '28';
                                }
                                if(country_name == 'China'){
                                    return '101';
                                }
                                if(country_name == 'Colombia'){
                                    return '29';
                                }
                                if(country_name == 'Egypt'){
                                    return '53';
                                }
                                if(country_name == 'France'){
                                    return '141';
                                }
                                if(country_name == 'Georgia'){
                                    return '103';
                                }
                                if(country_name == 'Germany'){
                                    return '142';
                                }
                                if(country_name == 'Greece'){
                                    return '143';
                                }
                                if(country_name == 'Greenland'){
                                    return '24';
                                }
                                if(country_name == '	Haiti'){
                                    return '13';
                                }
                                if(country_name == 'Hong Kong'){
                                    return '127';
                                }
                                if(country_name == 'Iceland'){
                                    return '145';
                                }
                                if(country_name == 'India'){
                                    return '104';
                                }
                                if(country_name == 'Indonesia'){
                                    return '105';
                                }
                                if(country_name == 'Iran'){
                                    return '106';
                                }
                                if(country_name == 'Iraq'){
                                    return '191';
                                }
                                if(country_name == 'Ireland'){
                                    return '146';
                                }
                                if(country_name == 'Israel'){
                                    return '192';
                                }
                                if(country_name == 'Italy'){
                                    return '147';
                                }
                                if(country_name == 'Jamaica'){
                                    return '15';
                                }
                                if(country_name == 'Japan'){
                                    return '107';
                                }
                                if(country_name == 'Jordan'){
                                    return '193';
                                }
                                if(country_name == 'Kazakhstan'){
                                    return '108';
                                }
                                if(country_name == 'North Korea'){
                                    return '109';
                                }
                                if(country_name == 'South Korea'){
                                    return '110';
                                }
                                if(country_name == 'Lebanon'){
                                    return '195';
                                }
                                if(country_name == 'Liberia'){
                                    return '63';
                                }
                                if(country_name == 'Libya'){
                                    return '64';
                                }
                                if(country_name == 'Luxembourg'){
                                    return '151';
                                }
                                if(country_name == 'Madagascar'){
                                    return '65';
                                }
                                if(country_name == 'Malta'){
                                    return '153';
                                }
                                if(country_name == 'Mauritius'){
                                    return '92';
                                }
                                if(country_name == 'Mexico'){
                                    return '16';
                                }
                                if(country_name == 'Netherlands'){
                                    return '157';
                                }
                                if(country_name == 'New Zealand'){
                                    return '181';
                                }
                                if(country_name == 'Norway'){
                                    return '158';
                                }
                                if(country_name == 'Pakistan'){
                                    return '116';
                                }
                                if(country_name == 'Philippines'){
                                    return '117';
                                }
                                if(country_name == 'Poland'){
                                    return '159';
                                }
                                if(country_name == 'Russia'){
                                    return '118';
                                }
                                if(country_name == 'Romania'){
                                    return '161';
                                }
                                if(country_name == 'Saudi Arabia'){
                                    return '198';
                                }
                                if(country_name == 'South Africa'){
                                    return '80';
                                }
                                if(country_name == 'Spain'){
                                    return '166';
                                }
                                if(country_name == 'Sri Lanka'){
                                    return '120';
                                }
                                if(country_name == 'Sweden'){
                                    return '167';
                                }
                                if(country_name == 'Switzerland'){
                                    return '168';
                                }
                                if(country_name == 'Syria'){
                                    return '199';
                                }
                                if(country_name == 'Taiwan'){
                                    return '126';
                                }
                                if(country_name == 'Thailand'){
                                    return '122';
                                }
                                if(country_name == 'Turkey'){
                                    return '173';
                                }
                                if(country_name == 'Uganda'){
                                    return '86';
                                }
                                if(country_name == 'Ukraine'){
                                    return '169';
                                }
                                if(country_name == 'United Arab Emirates'){
                                    return '200';
                                }
                                if(country_name == 'United Kingdom'){
                                    return '170';
                                }
                                if(country_name == 'United States'){
                                    return '23';
                                }
                                if(country_name == 'Uzbekistan'){
                                    return '124';
                                }
                                if(country_name == 'Venezuela'){
                                    return '38';
                                }
                                if(country_name == 'Vietnam'){
                                    return '125';
                                }
                                else{
                                    return '0';
                                }



                            };

                            $.get(url, function(data) {
                                if(data.status == 'OK'){
                                    //console.log(data.results);
                                    for(var i=0; i<data.results.length; i++){
                                        //console.log(data.results[i]["address_components"]);
                                        for(var x=0; x<data.results[i]["address_components"].length; x++){
                                            //console.log(data.results[i]["address_components"][x]["types"]);
                                            if(data.results[i]["address_components"][x]["types"][0] == 'country'){
                                                //console.log(data.results[i]["address_components"][x].long_name);
                                                $scope.countries.push(data.results[i]["address_components"][x].long_name);

                                                //console.log($scope.countries.length);

                                                $scope.counts = {};
                                                angular.forEach($scope.countries, function (value, key){
                                                    if(value in $scope.counts){
                                                        $scope.counts[value]++;
                                                    }else{
                                                        $scope.counts[value] = 1;
                                                    }
                                                });

                                                $scope.contryarray = [];
                                                angular.forEach($scope.counts, function (value, key){
                                                    //var temparr = [];
                                                    //temparr = [{id:key, value:value}];
                                                    var cid = $scope.getcountryid(key);
                                                    $scope.contryarray.push({id:cid, value:value});
                                                });

                                                console.log($scope.contryarray);



                                                FusionCharts.ready(function(){
                                                    var salesByState = new FusionCharts({
                                                        "type": "maps/worldwithcountries",
                                                        "renderAt": "chartContainer",
                                                        "width": "600",
                                                        "height": "400",
                                                        "dataFormat": "json",
                                                        "dataSource": {
                                                            "chart": {
                                                                "caption": "Annual Sales by State",
                                                                "subcaption": "Last year",
                                                                "entityFillHoverColor": "#cccccc",
                                                                "numberScaleValue": "1,10,10",
                                                                "showLabels": "0",
                                                                "theme": "fint"
                                                            },
                                                            "colorrange": {
                                                                "color": [
                                                                    {
                                                                        "minvalue": "0",
                                                                        "maxvalue": "24",
                                                                        "code": "#ABEBC6",
                                                                        "displayValue": "Less"
                                                                    },
                                                                    {
                                                                        "minvalue": "25",
                                                                        "maxvalue": "49",
                                                                        "code": "#F39C12",
                                                                        "displayValue": "Okay"
                                                                    },
                                                                    {
                                                                        "minvalue": "50",
                                                                        "maxvalue": "74",
                                                                        "code": "#AF7AC5",
                                                                        "displayValue": "Better"
                                                                    },
                                                                    {
                                                                        "minvalue": "75",
                                                                        "maxvalue": "100",
                                                                        "code": "#E74C3C",
                                                                        "displayValue": "Perfect"
                                                                    }
                                                                ]
                                                            },
                                                            "data":$scope.contryarray,
                                                        }
                                                    });
                                                    salesByState.render();
                                                });
                                            }
                                        }
                                    }
                                }
                            });

                            //FusionCharts.ready(function () {
                            //    var salesByState = new FusionCharts({
                            //        "type": "maps/world",
                            //        "renderAt": "chartContainer",
                            //        "width": "600",
                            //        "height": "400",
                            //        "dataFormat": "json",
                            //        "dataSource": {
                            //            "chart": {
                            //                "caption": "Annual Sales by State",
                            //                "subcaption": "Last year",
                            //                "entityFillHoverColor": "#cccccc",
                            //                "numberScaleValue": "1,1000,1000",
                            //                "numberScaleUnit": "K,M,B",
                            //                "numberPrefix": "$",
                            //                "showLabels": "1",
                            //                "theme": "fint"
                            //            },
                            //            "colorrange": {
                            //                "minvalue": "0",
                            //                "startlabel": "Low",
                            //                "endlabel": "High",
                            //                "code": "#e44a00",
                            //                "gradient": "1",
                            //                "color": [
                            //                    {
                            //                        "maxvalue": "56580",
                            //                        "displayvalue": "Average",
                            //                        "code": "#f8bd19"
                            //                    },
                            //                    {
                            //                        "maxvalue": "100000",
                            //                        "code": "#6baa01"
                            //                    }
                            //                ]
                            //            },
                            //            "data":$scope.counts,
                            //        }
                            //    });
                            //    salesByState.render();
                            //});

                            //$scope.countries.forEach(function(i) { $scope.count[i] = ($scope.count[i]||0)+1;  });
                            //console.log($scope.count);

                            //for (var i = 0, j = $scope.countries.length; i < j; i++) {
                            //    $scope.count[$scope.countries[i]] = ($scope.count[$scope.countries[i]] || 0) + 1;
                            //}

                            //console.log($scope.countries);

                            var posNeg = checkPosNeg.getType(response[i]["text"]);
                            posNeg.type.then(function (result) {

                                if(result["score"] >= 0.05 || result["score"] <= -0.05 || result["ratio"] == 1) {

                                    if ($scope.loading) {
                                        $scope.loading = false;
                                    }

                                    if (result["type"] == "positive") {
                                        pos2 += 1;
                                    } else if (result["type"] == "negative") {
                                        neg2 += 1;
                                    }

                                    $scope.positive2 = Math.round(100 * pos2 / (pos2 + neg2));
                                    $scope.negative2 = Math.round(100 * neg2 / (pos2 + neg2));

                                    //console.log("data2");
                                    //console.log($scope.positive2);
                                    //console.log($scope.negative2);


                                    //pie chart2
                                    $scope.labels2 = ["Good2", "Bad2"];
                                    $scope.data2 = [$scope.positive2, $scope.negative2];
                                    $scope.colors2 = ['#FFC0CB', ' 6#FFFF00', '#717984', '#F1C40F'];
                                    $scope.options2 =  {
                                        responsive: false,
                                        maintainAspectRatio: false
                                    }

                                    //bar chart2
                                    $scope.barlabels2 = ["Good2", "Bad2"];
                                    $scope.bardata2 = [
                                        [$scope.positive2, $scope.negative2]
                                    ];
                                    $scope.barcolors2 = ['#717984', '#F1C40F'];
                                    $scope.baroptions2 =  {
                                        responsive: false,
                                        maintainAspectRatio: false
                                    }

                                    count--;
                                }

                                if (i == Math.round(response.length * 20 / 100)) {
                                    maxIDSearch2 = response[response.length - 1];
                                    return setPosNeg2(search, count, $scope);
                                }


                            });




                        })(response, i);
                    }

                } else {
                    console.log("Error in setposneg 2");
                }
            });


        } else {
            return;
        }

        //console.log($scope.ccount);
        //console.log($scope.countries);
        //console.log($scope.countries.length);
    }

    return {
        setPosNeg: function (search, count, $scope) {
            return setPosNeg(search, count, $scope);
        },
        setPosNeg2: function (search, count, $scope) {
            return setPosNeg2(search, count, $scope);
        }
    }
});


//twitterThing.factory('getPosNeg', function($http) {
//    function setPosNeg(search, count, $scope){
//        if (count > 0) {
//            $http.get(baseUrl + "/public/get_tweets", {
//                params: {search: search, maxID: maxIDSearch, recent: true}
//            }).success(function (response) {
//
//                console.log(response.length);
//
//                if (response["Error"] == undefined) {
//                    for (var i = 0; i < response.length - 1; i++) {
//
//                        //var sentences = [];
//                        //for(var j = i; (j < response.length - 1 && j <= i + 2); j++){
//                        //    sentences[sentences.length] = response[j];
//                        //}
//                        //i += sentences.length;
//                        //
//                        //$http.get(baseUrl + "/public/get_pos_neg", {
//                        //    params : {sentences: JSON.stringify(sentences)}
//                        //}).success(function (percentages) {
//                        //    pos += percentages["positive"];
//                        //    neg += percentages["negative"];
//                        //
//                        //    $scope.positive = pos;
//                        //    $scope.negative = neg;
//                        //});
//                        (function (response, i) {
//                            $http.get("https://twinword-sentiment-analysis.p.mashape.com/analyze/", {
//                                headers: {
//                                    'X-Mashape-Key': 'ojF8QuQu1ZmshWjxUrOGDmm5iuV2p1S2cpwjsnmHgOkkAsMmzO',
//                                    'Accept': 'application/json'
//                                },
//                                params: {text: response[i]}
//                            }).success(function (result) {
//
//                                if (result["type"] == "positive") {
//                                    pos += 1;
//                                } else if (result["type"] == "negative") {
//                                    neg += 1;
//                                }
//
//                                $scope.data[0] = Math.round(100 * pos / (pos + neg));
//                                $scope.data[1] = Math.round(100 * neg / (pos + neg));
//
//                                if (i == Math.round(response.length * 20 / 100)) {
//                                    maxIDSearch = response[response.length - 1];
//                                    return setPosNeg(count - 1, $scope);
//                                }
//
//                            });
//                        })(response, i);
//                    }
//                } else {
//                    console.log("Error");
//                }
//            });
//        } else {
//            return;
//        }
//    }
//
//    return {
//        setPosNeg : function (search, count, $scope) {
//            return setPosNeg(search, count, $scope);
//        }
//    }
//});

//twitterThing.factory('getTops', function(getTweets, checkPosNeg, settingTopTweetAnalyzer) {
//
//    function setTops(search, countPos, countNeg, $scope) {
//
//        var tweet = getTweets.getTweets(search, maxIDPopular, 0);
//        tweet.tweet.then(function (response) {
//            if (response["Error"] == undefined) {
//                for (var i = 0; i < response.length - 1; i++) {
//
//                    (function (response, i) {
//
//                        var posNeg = checkPosNeg.getType(response[i]["text"]);
//                        posNeg.type.then(function (result) {
//
//                            if($scope.loading){
//                                $scope.loading = false;
//                            }
//
//                            if (result["type"] == "positive" && (result["score"] >= 0.05 || result["ratio"] == 1) && !$scope.positives.some(function(el) { return el.text === response[i]["text"]; })) {
//                                if (countPos > 0) {
//
//                                    currentTopTweetResponse["pos"][countPos] = {
//                                        text: response[i]["text"].split(" "),
//                                        result: result
//                                    };
//
//                                    $scope.justTweets["pos"][countPos] = true;
//                                    $scope.topAnalyzer["pos"][countPos] = false;
//
//                                    $scope.positives.push({
//                                        text: response[i]["text"],
//                                        retweet: response[i]["retweet"],
//                                        user: response[i]["user"],
//                                        number: countPos,
//                                        analyzed: [],
//                                        total: 0
//                                    });
//                                    countPos--;
//
//                                    var posLength = $scope.positives.length;
//                                    (function (lastIndex, result) {
//                                        setTimeout(settingTopTweetAnalyzer.settingAnalyzer($scope.positives, lastIndex, result), 0);
//                                    })(posLength - 1, result);
//                                }
//                            } else if (result["type"] == "negative" && (result["score"] <= -0.05 || result["ratio"] == 1) && !$scope.negatives.some(function(el) { return el.text === response[i]["text"]; })) {
//                                if (countNeg > 0) {
//
//                                    currentTopTweetResponse["neg"][countNeg] = {
//                                        text: response[i]["text"].split(" "),
//                                        result: result
//                                    };
//
//                                    $scope.justTweets["neg"][countNeg] = true;
//                                    $scope.topAnalyzer["neg"][countNeg] = false;
//
//                                    $scope.negatives.push({
//                                        text: response[i]["text"],
//                                        retweet: response[i]["retweet"],
//                                        user: response[i]["user"],
//                                        number: countNeg,
//                                        analyzed: [],
//                                        total: 0
//                                    });
//                                    countNeg--;
//
//                                    var negLength = $scope.negatives.length;
//                                    (function (lastIndex, result) {
//                                        setTimeout(settingTopTweetAnalyzer.settingAnalyzer($scope.negatives, lastIndex, result), 0);
//                                    })(negLength - 1, result);
//                                }
//                            }
//
//                            if (i == response.length - 2 && (countNeg > 0 || countPos > 0)) {
//                                return setTops(search, countPos, countNeg, $scope);
//                            } else if (countNeg == 0 && countPos == 0) {
//
//                                for(var posNegRequestsCount = 0; posNegRequestsCount < GetTopTweetPosNegRequests.length; posNegRequestsCount++){
//                                    GetTopTweetPosNegRequests[posNegRequestsCount].cancelChecker("Top 5 completed");
//                                }
//                                GetTopTweetPosNegRequests.length = 0;
//
//                                for(var getTopTweetsRequestsCount = 0; getTopTweetsRequestsCount < GetTopTweetsRequests.length; getTopTweetsRequestsCount++){
//                                    GetTopTweetsRequests[getTopTweetsRequestsCount].cancelTweet("Top 5 completed");
//                                }
//                                GetTopTweetsRequests.length = 0;
//                            }
//                        });
//
//                        GetTopTweetPosNegRequests[GetTopTweetPosNegRequests.length] = posNeg;
//                    })(response, i);
//                }
//            }
//        });
//
//        GetTopTweetsRequests[GetTopTweetsRequests.length] = tweet;
//    }
//
//    return {
//        setTops: function (search, countPos, countNeg, $scope) {
//            return setTops(search, countPos, countNeg, $scope);
//        }
//    }
//});
//
//twitterThing.directive('topTweet', function($compile){
//    return {
//        scope: {
//            tweet: '=tweet'
//        },
//        controller: function($scope, $element) {
//
//            var ele = $compile( "<div style='word-wrap: break-word'></div>" )( $scope );
//            var currentTypingLabel = $compile( "<span style='font-weight: bold;' ></span>" )( $scope );
//
//            var tweetTxt = $scope.tweet.split(" ");
//            var previousSpecialDetail = false;
//
//            for(var i = 0; i < tweetTxt.length; i++){
//                if(tweetTxt[i][0] == "@" || tweetTxt[i][0] == "#"){
//                    var userAccount;
//                    if(tweetTxt[i][0] == "#") {
//
//                        userAccount = [];
//
//                        var replacingString = tweetTxt[i].replace("#", ",%.%#")
//
//                        var hashTags = replacingString.split(",%.%");
//                        for(var j = 0; j < hashTags.length; j++){
//
//                            var word = hashTags[j].substring(1);
//                            if(/^[a-zA-Z0-9]+$/.test(word)) {
//                                userAccount[j] = $compile('<span ng-click="$parent.newSearch(\'' + hashTags[j] + '\')" style="text-decoration: underline; color: blue; cursor:pointer; font-weight: bold;">' + hashTags[j] + '</span>')($scope);
//                            } else {
//                                var lastLetterIndex = 0;
//                                for(var k = 0; k < word.length; k++){
//                                    if(!(/^[a-zA-Z0-9]/.test(word[k]))){
//                                        lastLetterIndex = k;
//                                        break;
//                                    }
//                                }
//
//                                if(lastLetterIndex != 0) {
//                                    userAccount[j] = $compile(
//                                        '<span ng-click="$parent.newSearch(\'' + hashTags[j].substring(0, lastLetterIndex + 1) + '\')" style="text-decoration: underline; color: blue; cursor:pointer; font-weight: bold;">' + hashTags[j].substring(0, lastLetterIndex + 1) + '</span>' +
//                                        '<span>' + hashTags[j].substring(lastLetterIndex + 1) + '</span>'
//                                    )($scope);
//                                } else {
//                                    userAccount[j] = $compile(
//                                        '<span>' + hashTags[j] + '</span>'
//                                    )($scope);
//                                }
//                            }
//                        }
//
//                    } else {
//                        userAccount = $compile('<span style="color: blue; text-decoration: underline; cursor:pointer; font-weight: bold;">' + tweetTxt[i] + '</span>')($scope);
//                    }
//
//                    ele.append(userAccount);
//                    previousSpecialDetail = true;
//                } else {
//                    if(previousSpecialDetail && currentTypingLabel.text() != ""){
//                        previousSpecialDetail = false;
//                        ele.append(currentTypingLabel);
//                        currentTypingLabel = $compile( "<span style='font-weight: bold;'></span>" )( $scope );
//                        currentTypingLabel.text(" " + tweetTxt[i] + " ");
//                    } else {
//                        currentTypingLabel.text(" " + currentTypingLabel.text() + tweetTxt[i] + " ");
//                    }
//                }
//            }
//
//            ele.append(currentTypingLabel);
//            $element.append(ele);
//        }
//    }
//});

//twitterThing.directive('sentimentHowToPopOver', function () {
//
//    return {
//        restrict: "A",
//        link: function (scope, element, attrs) {
//            var options = {
//                content: document.getElementById("sentiment-howto").innerHTML,
//                placement: "bottom",
//                html: true,
//                trigger: "hover"
//            };
//            $(element).popover(options);
//        }
//    };
//});