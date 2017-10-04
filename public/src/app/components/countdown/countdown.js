import './coundown.scss';

const end = Math.floor((new Date("05/4/2018")).getTime() / 1000);
const start = Math.floor((new Date("1/7/2017")).getTime() / 1000);
const now = Math.floor((new Date).getTime() / 1000);

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

if (width > 480) {
	$(".countdown").final_countdown({
		'start': start,
		'end': end,
		'now': now
	}, () => console.log("finish call back"));
}
