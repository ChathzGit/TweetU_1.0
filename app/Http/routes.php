<?php

use App\Http\Controllers\Controller;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomePageController@index');

Route::get('TweetAnalyzePage', 'WelcomeController@index');

Route::get('home', 'HomePageController@index');

Route::get('tweetAnalytics', 'TweetAnalyticsController@index');



Route::get('get_compare_tweets', 'TweetComparisonController@getTweets');

Route::get('get_ombeds', 'TweetComparisonController@getOmbeds');

Route::get('comparison_view', 'TweetComparisonController@index');



Route::get('get_tweets', 'SentimentController@getTweets');


/*
 * Admin routes
 */
Route::get('admin_home', 'AdminHomepageController@index');

//not using for now
//Route::get('get_pos_neg', 'SentimentController@getPositiveNegative');

//Route::controllers([
//	'auth' => 'Auth\AuthController',
//	'password' => 'Auth\PasswordController',
//]);

Route::get('get_profiles','ProfileController@getProfiles');
Route::get('get_profiles_view','ProfileController@index');

Route::get('get_selected_profile','ProfileController@getSelectedProfileInfo');

Route::get('getProfileTweets','ProfileController@getProfileTweets');

Route::get('viewProfileController','ProfileController@viewProfileCompair');

Route::get('getTweetInfo','ProfileController@getProfileTweetsInfo');

Route::get('getUserLocation','ProfileController@GetUserLocations');

/*
 * User accounts routes
 */
Route::get('register_user', 'UserAccountController@index');
Route::get('adminUserRegistration', 'UserAccountController@adminUserRegistration');

Route::post('save_user', 'UserAccountController@saveUser');
Route::get('user_accounts', 'UserAccountController@loadUserPage');

Route::get('load_all_users','UserAccountController@getAllUsers');
Route::post('delete_user', 'UserAccountController@deleteUser');

/*
 * Login interface routes
 */
Route::get('login_page', 'LoginController@index');
Route::post('check_credentials', 'LoginController@checkCredentials');
Route::get('logout', 'LoginController@logout');
Route::get('checkSession', 'LoginController@checkSession');


/*
 * Search log routes
 */
Route::get('getAllSearchLogs', 'SearchLogController@getAllSearchLogs');
Route::get('getPercentageChange', 'SearchLogController@getPercentageChanges');

Route::post('getAllSearchLogCount', 'SearchLogController@getAllSearchLogCount');
Route::get('getMonthlySearchLogCount', 'SearchLogController@getMonthlySearchLogCount');

Route::get('getSearchLogs', 'SearchLogController@getSearchLogs');
Route::get('SearchLogTestData', 'SearchLogController@loadSearchDataTestDataInterface');
Route::get('loadUsageStatistics', 'SearchLogController@loadUsageStatisticsPage');

Route::post('saveSearchLog', 'SearchLogController@saveSearchLog');



Route::get('send-tweets','SendTweetsController@sendTweets');

Route::get('keyword-count','GetKeywordCountController@getWeeklySearchCount');

Route::get('view-cloud','WordCloudController@getKeywords');
