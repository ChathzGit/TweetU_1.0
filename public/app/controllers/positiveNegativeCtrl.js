/**
 * Created by ACer on 10/28/2016.
 */

app.controller('posNegSentiment', function ($scope, getPosNeg, getTops, $window) {

    $scope.loading = false;

    $scope.labels = ["Negative", "Positive"];
    $scope.data = [50, 50];
    $scope.positives = [];
    $scope.negatives = [];

    $scope.getInfo = function () {

        $scope.loading = true;

        for (var posNegRequestsCount1 = 0; posNegRequestsCount1 < GetTopTweetPosNegRequests.length; posNegRequestsCount1++) {
            GetTopTweetPosNegRequests[posNegRequestsCount1].cancelChecker("New Request");
        }
        GetTopTweetPosNegRequests.length = 0;

        for (var getTopTweetsRequestsCount1 = 0; getTopTweetsRequestsCount1 < GetTopTweetsRequests.length; getTopTweetsRequestsCount1++) {
            GetTopTweetsRequests[getTopTweetsRequestsCount1].cancelTweet("New Request");
        }
        GetTopTweetsRequests.length = 0;

        for (var posNegRequestsCount2 = 0; posNegRequestsCount2 < GetTweetPosNegRequests.length; posNegRequestsCount2++) {
            GetTweetPosNegRequests[posNegRequestsCount2].cancelChecker("New Request");
        }
        GetTweetPosNegRequests.length = 0;

        for (var getTopTweetsRequestsCount2 = 0; getTopTweetsRequestsCount2 < GetTweetRequests.length; getTopTweetsRequestsCount2++) {
            GetTweetRequests[getTopTweetsRequestsCount2].cancelTweet("New Request");
        }
        GetTweetRequests.length = 0;

        //getting to pie chart...
        // 20 change how much time you need from twitter... 1 ~ (aaaasannawa)100i.. sometimes under 40 but taking as near 100 :D
        getPosNeg.setPosNeg($scope.search, 2, $scope);

        //getting top good bad, tweets
        var topResultCount = 5; // change here how much you need to get... hehe mama ganne 5i :D
        $scope.positives.length = 0;
        $scope.negatives.length = 0;
        getTops.setTops($scope.search, topResultCount, topResultCount, $scope);
    };

    $scope.newSearch = function (search) {
        $scope.search = search;
        $window.scrollTo(0, 0);
    }
});