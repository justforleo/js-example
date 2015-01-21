(function($,f){

	var eo_slider = function () {
		var _ = this;
		_.o = {
			prevBtn: '.slider-btn-prev',
			nextBtn: '.slider-btn-next',
			container: '.slider-container',
			box: '.slider-box',
			position: 54,
			autoPlay: true

		};
		_.init = function(el,o) {
			_.o = $.extend(_.o, o);
			_.container = $(_.o.container);
			_.box = $(_.o.box);

			_.container.css({position:'relative'});
			_.box.css({position:'absolute'});

			$(_.o.prevBtn).click(_.prev);
			$(_.o.nextBtn).click(_.next);
			if (_.o.autoPlay) {
				setInterval(_.next,5000);
			}
		}
		_.prev = function() {
			if (_.box.position().top == 0) {
				_.box.css({'top':-_.box.height()});
			}
			_.slider(_.o.position);
		}
		_.next = function() {
			if (_.box.position().top - _.o.position < _.o.position - _.box.height()) {
				_.box.css({'top':0});
			}
			_.slider('-'+_.o.position);
		}
		_.slider = function(pos) {
            if (!_.box.is(':animated')) {
                var pos = ((_.box.position().top / pos) + 1) * pos;
                _.box.stop(true,true).animate({'top':pos+'px',queue:true});
            }
		}
	}

	$.fn.eo_slider = function(o) {
		var len = this.length;
		return this.each(function(index){
			var me = $(this),
				key = 'eo_slider' + (len > 1 ? '-' + ++index : ''),
				instance = (new eo_slider).init(me, o);

			me.data(key, instance).data('key', key);
		})
	}


})(jQuery,false)
