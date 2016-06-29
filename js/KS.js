(function ($) {
    var utils = {
        parseNum2Num:function(i){
            if(i<10){
                return '0'+i;
            }else{
                return i;
            }
        }
    }

    function KS(config) {
        var defaults = {
            endTime:1452772554849
        }
        var config = $.extend({}, defaults, config);
        this.config = config;
        this.login();
        this.$menuCz = $('.main-left li');
        this.$header_sun1 = $($('.header-sun')[0]);
        this.$operation = $('.menu .operation');
        this.$new = $('.new');
        this.item = $('.item');
        this.$header_suns = $('.header-sun');
        this.drag_btnY = 0;
        this.nowY = 0;
        this.endY = 0;
        this.$drag_btn = $('.drag_btn')
        this.bindEvents();
        this.operation();
        this.DSQ();
    }

    KS.prototype.DSQ = function(){
        var self = this
        self.newDate("yyyy-MM-dd HH:mm:ss");
        self.surplusDate(self.config.endTime);
        setInterval(function(){
            self.newDate("yyyy-MM-dd HH:mm:ss");
            self.surplusDate(self.config.endTime);
        },500)
    }

    KS.prototype.bindEvents = function () {
        var self = this
        self.$header_sun1.find('li').click(function () {
            var index = $(this).index(),
                id = '#set' + index
            self.$header_sun1.find('li').removeClass('active');
            $(this).addClass('active')
            self.$header_suns.slideUp()
            $(id).modal({backdrop: 'static', keyboard: false})

        })
        self.$menuCz.click(function () {
            self.$menuCz.removeClass('active');
            $(this).addClass('active')
        })
        self.$new.click(function(){
            self.$new.removeClass('active');
            $(this).addClass('active')
        })
        self.item.click(function(){
            self.item.removeClass('active');
            $(this).addClass('active')
        })
        $('.break_btn').click(function(){
            window.frames["iframe"].location.reload();
        })
        self.$drag_btn.mousedown(function(e){
            var evnt = e || event;                   // 得到鼠标事件
            var $rightTop = $('.right-top .panel-body'),
                $rightFooter = $('.right-footer .panel-body')
            var $rightTopHeight = $('.right-top .panel-body').height(),
                $rightFooterHeight = $('.right-footer .panel-body').height()
            self.nowY = evnt.clientY
            // 鼠标移动时
            document.onmousemove = function(e) {
                var evnt = e || event;
                self.endY = evnt.clientY
                self.drag_btnY = self.endY - self.nowY
                if(self.drag_btnY < 0){
                    if($rightTop.height() > 60){
                        $rightTop.height($rightTopHeight + self.drag_btnY)
                        $rightFooter.height($rightFooterHeight - self.drag_btnY)
                    }
                }else{
                    if($rightFooter.height() > 60){
                        $rightTop.height($rightTopHeight + self.drag_btnY)
                        $rightFooter.height($rightFooterHeight - self.drag_btnY)
                    }
                }
            };

            // 鼠标抬起时
            document.onmouseup = function() {
                document.onmousemove =null;
                document.onmouup = null;
            };

            return false;

        })
    }
    KS.prototype.operation = function () {
        var self = this,
            $header_sun_li = $('.header-sun li')
        //菜单滑动
        self.$operation.click(function () {
            var $header_sun = $(this).find('.header-sun')
            if ($header_sun.is(':hidden')) {
                self.$header_suns.slideUp()
                $header_sun.slideDown()
                self.$header_suns.mouseleave(function () {
                    $(this).slideUp()
                })
            } else {
                $header_sun.slideUp()
            }
        })
        $header_sun_li.click(function (e) {
            e.stopPropagation();
        })
    }
    KS.prototype.login = function () {
        $('#login').modal({backdrop: 'static', keyboard: false});
    }
    KS.prototype.newDate = function (fmt) {
        var date = new Date()
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        $('.newDate').html(fmt)
    }


    KS.prototype.surplusDate = function(nub){
        //console.log((new Date("2011/11/11 20:10:10")).getTime())
        //获取服务器时间
        /*var xmlhttp=new XMLHttpRequest("MSXML2.XMLHTTP.3.0");
        xmlhttp.open("GET","https://www.hao123.com/",false);
        xmlhttp.setRequestHeader("If-Modified-Since","q");
        xmlhttp.send();
        var dateStr= xmlhttp.getResponseHeader("Date");
        console.log(dateStr)
        var d = new Date(dateStr);
        console.log(d);*/
        //结束时间
        var endTime = new Date(nub),
        //当前时间
            nowDate = new Date(),
        //时间差
            leftTime = parseInt((endTime.getTime()-nowDate.getTime())/1000),
            d = parseInt(leftTime/(24*60*60)),
            h = utils.parseNum2Num(parseInt(leftTime/(60*60)%24)),
            m = utils.parseNum2Num(parseInt(leftTime/60%60)) ,
            s = utils.parseNum2Num(parseInt(leftTime%60)),
            dateText = d + '天'+ h +'小时 ' + m +'分'+ s +'秒'
        if(leftTime < 0){
            $('.leftTime').text('开奖结束')
        }else{
            $('.leftTime').text(dateText)
        }
    }



    window.KS = KS;

})(jQuery,window)