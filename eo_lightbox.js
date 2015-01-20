(function($,f){
    var eo = function(){
        var _ = this;
        _.o = {
            imgContainerClass:".lightbox-imgContainer",
            imgBoxContainerClass:'.lightbox-imgBoxContainer',
            imgBtnClass:".lightbox-btn",
            touchOffBtnClass:".lightbox-touchOffBtn",
            voteBtnClass:'.vote',
            closeBtnClass:'.lightbox-close',
            disVoteBtn:false,
            res:{},
            voteCallback:function(){},
            touchOffCallback:function(){},
            imgBtnCallback:function(){},
            showWindowCallback:function(){}
        };

        _.init = function(el,o)
        {
            _.el = el;
            _.o  = $.extend(_.o,o);
            var imgBtn = $(_.o.imgBtnClass),
                voteBtn = $(_.o.voteBtnClass),
                touchOffBtn = $(_.o.touchOffBtnClass),
                imgConta = $(_.o.imgContainerClass),
                infoBox = $(_.o.infoClass),
                closeBtn = $(_.o.closeBtnClass);

            if (_.o.disVoteBtn) {
                _.voteDisable();
            }

            touchOffBtn.click(function(){
                $.isFunction(_.o.touchOffCallback) && _.o.touchOffCallback(_,$(this));
                return _.showWindow($(this));
            });
            imgBtn.click(function(){
                $.isFunction(_.o.imgBtnCallback) && _.o.imgBtnCallback(_,$(this));

                _.loadImg($(this));
            })
            voteBtn.click(function(){
                _.voteClick($(this));
            })
            closeBtn.click(function(){
                _.closeWindow();
            })
        }

        _.showWindow = function(touchOffBtn)
        {
            $.isFunction(_.o.showWindowCallback) && _.o.showWindowCallback(_);
            _.el.css({display:'block'}).animate({opacity:1});
            var obj = $(_.o.imgBtnClass).eq(touchOffBtn.closest('li').index());
            _.loadImg(obj);
        }

        _.loadImg = function(o)
        {
            var img = new Image(),
                marginOfDocument = _.el.position().top,
                boxSize = _.el.height(),
                documentHeight = $(window).height(),
                newHeight = 0;
            img.src = o.attr('src');
            if( (newHeight = (documentHeight - boxSize)) > 60 ) {
                newHeight = newHeight / 2;
            } else {
                newHeight = 10;
            }
            _.el.find(_.o.imgBoxContainerClass).css({marginTop:newHeight+'px'}); //  判断图片的容器是不是大于窗口
            _.loadBigImg(o.attr('src'));
            _.setTouchOff(o);
            _.setVoteAttr(o);
        }
        _.loadBigImg = function(src)
        {
            var container = $(_.o.imgContainerClass);
            // do somthing like callback complete of before
            container.attr('src',src);
            // do somthing like callback complete of after
        }
        _.setTouchOff = function(obj)
        {
            var o = obj.parent();

            obj.addClass('lightbox-img-btn-active'); // obj是li下的img
            o.siblings().children('img').removeClass('lightbox-img-btn-active');//选择li下的img作处理
        }

        _.btnClick = function(o)
        {
            _.loadImg($(this));
        }
        _.voteClick = function(o)
        {
            if (!_.o.disVoteBtn) {
                $.isFunction(_.o.voteCallback)&& _.o.voteCallback(_,o);
            }
            // do somthing like callbak complete of call
        }
        _.getVoteList = function()
        {
            return _.el.find(_.o.voteBtnClass);
        }
        _.voteDisable = function()
        {
            _.o.disVoteBtn = true;
            //_.el.find(_.o.voteBtnClass).attr('disabled','disabled')
            return this;
        }
        _.voteEnable = function()
        {
            _.o.disVoteBtn = false;
            //_.el.find(_.o.voteBtnClass).attr('enable','enable');
            return this;
        }

        _.closeWindow = function(){
            _.el.animate({opacity:0}).css({display:'none'});

        }
        _.getImgList = function()
        {
            return $(_.o.imgBtnClass);
        }

        _.setVoteAttr = function(obj)
        {
            $(_.o.voteBtnClass).attr('data-id',obj.closest('li').attr('data-id')).attr('cid',obj.closest('li').attr('cid'));
        }
    }

    $.fn.eo = function (o) {
        return (new eo).init($(this),o);
    }

})(jQuery,false)

