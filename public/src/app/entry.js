import '!!file-loader?name=[name].[ext]!../favicon.ico';

// vendors
import $ from 'jquery';
import 'imports-loader?jQuery=jquery!bootstrap-sass/assets/javascripts/bootstrap.js';

// jquery plugins
import './libs/classie';
import './libs/cbpAnimatedHeader.min';
import 'imports-loader?jQuery=jquery,Kinetic=kinetic!./libs/jquery.final-countdown';
import 'imports-loader?jQuery=jquery!./libs/jquery.carouFredSel-6.2.1';
import 'imports-loader?jQuery=jquery!./libs/jquery.easing.min';
import 'imports-loader?jQuery=jquery!./libs/jquery.transit.min';

// components
import './components/countdown/countdown';
import './components/header/header';
import './components/introduction/introduction.js';
import './components/theses/theses';
import './components/location/location';
import './components/registration/registration';
import './components/schedule/schedule';
import './components/partners/partners';

// self work services
import './services/successful-payment';

// styles
import "../styles/index.scss";

$(document).ready(function(){
    $(this).scrollTop(0);
});