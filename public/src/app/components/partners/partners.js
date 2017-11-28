import $ from 'jquery';
import './partners.scss';

$(function () {
    const partners = $('.partners-carousel');

    partners.carouFredSel({
        items: 4,
        width: '90%',
        height: 300,
        direction: "left",
        transition: true,
        scroll: {
            items: 2,
            easing: "elastic",
            duration: 500,
            pauseOnHover: false
        }
    });
});