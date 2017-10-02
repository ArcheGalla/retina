import './coundown.scss';

const end = Math.floor((new Date("05/4/2018")).getTime() / 1000);
const start = Math.floor((new Date("1/7/2017")).getTime() / 1000);
const now = Math.floor((new Date).getTime() / 1000);

$(".countdown").final_countdown({
	'start': start,
	'end': end,
	'now': now
}, () => console.log("finish call back"));
