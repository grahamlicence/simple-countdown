var App = App || {};
(function () {
	App.Countdown = {
		end: false,
		DOM: {
			days: '',
			hrs: '',
			min:'',
			sec: ''
		},
		set: function (el) {

			this.DOM.days = el.querySelectorAll('.day')[0];
			this.DOM.hrs = el.querySelectorAll('.hrs')[0];
			this.DOM.min = el.querySelectorAll('.min')[0];
			this.DOM.sec = el.querySelectorAll('.sec')[0];

			if (el.dataset) {
				this.endDate = Date.parse(el.dataset.end);
			} else {
				//IE fallback for dataset
				var attributes = el.attributes;

				for (var i = 0, l = attributes.length; i < l; i += 1) {
					if (/^data-.*/.test(attributes[i].name) && attributes[i].name === 'data-end') {
						this.endDate = Date.parse(attributes[i].value);
					}
				}
			}

			this.timer();

			if (!App.Countdown.end) {
				this.timing = setInterval(this.timer, 1000 );
			}
		},
		complete: function () {
			console.log('countdown has ended..do something?!');
		},
		double: function (num) {
			return num > 9 ? num : '0' + num;
		},
		timer: function () {
			var dom = App.Countdown.DOM,
				diff = App.Countdown.endDate - new Date(),
				days = Math.floor(diff / (1000*60*60*24)),
				hour = Math.floor(diff / (1000*60*60)),
				mins = Math.floor(diff / (1000*60)),
				secs = Math.floor(diff / 1000);

			if (diff < 0) {
				App.Countdown.end = true;
				clearInterval(App.Countdown.timing);
				days = 0;
				hour = 0;
				mins = 0;
				secs = 0;
				App.Countdown.complete();
			}
			dom.days.innerHTML = App.Countdown.double(days) + ':';
			dom.hrs.innerHTML = App.Countdown.double(hour - days * 24) + ':';
			dom.min.innerHTML = App.Countdown.double(mins - hour * 60) + ':';
			dom.sec.innerHTML = App.Countdown.double(secs - mins * 60);
		}
	};
	return App.Countdown.set(document.querySelector('.countdown'));
}());