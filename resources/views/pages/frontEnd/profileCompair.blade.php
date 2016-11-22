<?php
/**
 * Created by PhpStorm.
 * User: Kasun
 * Date: 9/23/2016
 * Time: 4:02 PM
 */
?>

@extends('pages.index')

@section('content')

    {{--<!Doctype html>--}}
    {{--<html ng-app="myAppProfile">--}}
    {{--<head>--}}
    {{--<title>Profile analysis</title>--}}
    {{--<meta name="csrf-token" content="{{ csrf_token() }}"/>--}}
    {{--<script src="{{ asset('/js/jquery.min.js') }}"></script>--}}
    {{--<script src="{{ asset('/js/angular.min.js') }}"></script>--}}
    {{--<script src="{{ asset('/js/profileInfo.js') }}"></script>--}}
    {{--<script src="{{ asset('/js/Chart.js') }}"></script>--}}
    {{--<script src="{{ asset('/js/angular-chart.js') }}"></script>--}}

    {{--</head>--}}
    {{--<body>--}}



















    <div class="container-fluid" ng-controller="ctrlInfoProf">

        <div class="loading-gif-one"
             ng-if="loading"
                ></div>

        <div class="container">


            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <div class="row m-t-20 well bg-opc-65">


                <div class="col-sm-1"></div>

                <div class="col-sm-10">


                    <div class="col-sm-11 col-xs-10 p-0">
                        <div class="col-sm-6 col-xs-12 m-b-5">
                            <input id="search" class="form-control" type="text" ng-model="searchCriteria1"
                                   placeholder="First Account"
                                   ng-keyup="$event.keyCode == 13 && loadProfiles()">
                        </div>

                        <div class="col-sm-6 col-xs-12 m-b-5">
                            <input id="search" class="form-control" type="text" ng-model="searchCriteria2"
                                   placeholder="Second Account"
                                   ng-keyup="$event.keyCode == 13 && loadProfiles()">
                        </div>
                    </div>

                    <div class="col-sm-1 col-xs-2">
                        <Button id="search-btn" class="btn btn-default" ng-click="loadProfiles()">
                            <i class="fa fa-search"></i>
                        </Button>
                    </div>


                </div>

                <div class="col-sm-1"></div>


            </div>


            <!-- --------------------------------------------------------------------------------------------------------------- -->


            <div class="row m-t-20 well bg-opc-65" ng-if="isSearched">

                <div class="col-xs-12 col-sm-5"
                     style="height: 400px; overflow: scroll; padding-top: 20px; margin-bottom: 10px;">

                    <div ng-show="profiles1.length >0">




                        <div class="col-xs-12 selected-profile m-b-5" ng-repeat="items in profiles1">

                            <div class="col-xs-2"><img src="<%items['url']%>" height="42" width="42"></div>

                            <div class="col-xs-10">
                                <div class="col-xs-12 col-sm-7">

                                    <strong><%items["name"]%></strong><i class="fa-li fa fa-check-circle text-twitter"
                                                                         ng-show="items['verify']"></i>


                                </div>

                                <div class="col-xs-12 col-sm-5">
                                    <button class="btn btn-twitter-custom" ng-click="loadSelection($index)">Select
                                        Profile
                                    </button>
                                </div>
                            </div>

                        </div>


                        <br>
                    </div>
                </div>



                <div class="col-sm-2">

                </div>


                <div class="col-xs-12 col-sm-5"
                     style="height: 400px; overflow: scroll; padding-top: 20px; margin-bottom: 10px;">

                    <div ng-show="profiles1.length >0">




                        <div class="col-xs-12 selected-profile m-b-5" ng-repeat="items in profiles2">

                            <div class="col-xs-2"><img src="<%items['url']%>" height="42" width="42"></div>

                            <div class="col-xs-10">
                                <div class="col-xs-12 col-sm-7">

                                    <strong><%items["name"]%></strong><i class="fa-li fa fa-check-circle text-twitter"
                                                                         ng-show="items['verify']"></i>


                                </div>

                                <div class="col-xs-12 col-sm-5">
                                    <button class="btn btn-twitter-custom" ng-click="loadSelection($index)">Select
                                        Profile
                                    </button>
                                </div>
                            </div>

                        </div>


                        <br>
                    </div>
                </div>
            </div>

{{----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------}}











            {{--first profile set--}}
            <div class="col-xs-6 col-sm-6 " id="searchResult" hidden>


                {{--first result set--}}
                <div ng-show="profiles1.length >0" ng-repeat="items in profiles1" ng-if="isclicked1stprof">
                    <table class="table">
                        <tr class="col-xs-12 profiles profile-search">
                            <td class="col-xs-2"><img src="<%items['url']%>" height="42" width="42"></td>
                            <td class="col-xs-8">
                                <label><%items["name"]%></label>
                                <i class="fa-li fa fa-check-square" ng-show="items['verify']"></i>
                            </td>
                            <td>
                                <button class="btn btn-primary" ng-click="selectFirstProfile($index)">Select Profile
                                </button>
                            </td>
                        </tr>

                    </table>
                    <br>
                </div>


                {{--selected first profile--}}
                <div class="col-xs-12" style="border: solid; border-color: #66ccff" ng-if="firstprofileselected">
                    <table class="table">
                        <tr>
                            <td><img src="<% selectedFirstProfile['url'] %>" height="80" width="80"></td>

                            <td><label><% selectedFirstProfile["name"] %></label></td>
                        </tr>

                    </table>
                </div>


            </div>

            {{--second profile set--}}
            <div class="col-xs-6 col-sm-6 " id="searchResult" hidden>

                {{--second result set--}}
                <div ng-show="profiles2.length >0" ng-repeat="items in profiles2" ng-if="isclicked2ndprof">
                    <table class="table">
                        <tr class="col-xs-12 profiles good-tweet">
                            <td class="col-xs-2"><img src="<%items['url']%>" height="42" width="42"></td>
                            <td class="col-xs-8">
                                <label><%items["name"]%></label>
                                <i class="fa-li fa fa-check-square" ng-show="items['verify']"></i>
                            </td>
                            <td>
                                <button class="btn btn-primary" ng-click="selectSecondProfile($index)">Select Profile
                                </button>
                            </td>
                        </tr>

                    </table>
                    <br>
                </div>


                {{--selected second profile--}}
                <div class="col-xs-12" style="border: solid; border-color: #88ff4d" ng-if="secondprofileselected">
                    <table class="table">
                        <tr>
                            <td><img src="<% selectedSecondProfile['url'] %>" height="80" width="80"></td>

                            <td><label><% selectedSecondProfile["name"] %></label></td>
                        </tr>

                    </table>
                </div>


            </div>

            <button class="btn btn-primary" ng-click="Compare()">Compare Profile</button>


            {{--comparison results--}}
            <div class="row col-sm-12" ng-if="compare">

                <div class="col-sm-12 col-xs-12">

                    <div class="panel panel-info">
                        <div class="panel-heading">Twitter Popularity</div>
                        <div class="panel-body">

                            <div class="col-sm-6 col-xs-6">
                                <canvas id="pie" class="chart chart-pie" style="height:160px;"
                                        chart-data="data" chart-labels="labels" chart-options="options"
                                        chart-colors="colors">
                                </canvas>
                            </div>

                            <div class="col-sm-6 col-xs-6">
                                <table class="table">
                                    <tr>
                                        <td style="border: none">
                                            <div style="height: 10px; width: 10px; background-color: #66ccff"></div>
                                        </td>
                                        <td style="border: none"> <% selectedFirstProfile["name"] %> </td>
                                    </tr>

                                    <tr>
                                        <td style="border: none">
                                            <div style="height: 10px; width: 10px; background-color: #88ff4d"></div>
                                        </td>
                                        <td style="border: none"> <% selectedSecondProfile["name"] %> </td>
                                    </tr>
                                </table>

                            </div>

                        </div>
                    </div>


                </div>


                <div class="col-sm-12 col-xs-12">

                    <div class="panel panel-info">
                        <div class="panel-heading">Twitter Usage</div>
                        <div class="panel-body">

                            <div class="col-sm-6 col-xs-6">
                                <canvas id="pie2" class="chart chart-pie" style="height:160px;"
                                        chart-data="data1" chart-labels="labels1" chart-options="options1"
                                        chart-colors="colors1">
                                </canvas>
                            </div>

                            <div class="col-sm-6 col-xs-6">
                                <table class="table">
                                    <tr>
                                        <td style="border: none">
                                            <div style="height: 10px; width: 10px; background-color: #66ccff"></div>
                                        </td>
                                        <td style="border: none"> <% selectedFirstProfile["name"] %> </td>
                                    </tr>

                                    <tr>
                                        <td style="border: none">
                                            <div style="height: 10px; width: 10px; background-color: #88ff4d"></div>
                                        </td>
                                        <td style="border: none"> <% selectedSecondProfile["name"] %> </td>
                                    </tr>
                                </table>

                            </div>

                        </div>
                    </div>


                </div>

                <div class="col-sm-6 col-xs-6">


                </div>
            </div>


        </div>

    </div>
    {{--</body>--}}
    {{--</html>--}}