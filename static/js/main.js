(function ($) {
    /**
     * update: 2018/02/01
     * 产生随机数
     * @param int lower 最小数
     * @param int upper 最大数
     */
    function random (lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }
    random(1,100);
    //返回顶部
    var backTop = $("#back_top");
    $(document).scroll(function(){
        var scrollTop = $(document).scrollTop() || $("body").scrollTop(),
            showHeight = 800;
        if(scrollTop>showHeight){
            backTop.removeClass("t-hide");
        }else {
            backTop.addClass("t-hide");
        }
    });
    backTop.on("click",function(){
        $('html,body').animate({scrollTop:0},400);
        return false;
    });
    // 手机端头部导航
    $('#nav_btn').on('click', function () {
        sliderToggle();
    });
    $('#nav_list').on('click', 'a', function () {
        sliderToggle();
    });
    $('#nav_btn_close').on('click', function () {
        sliderToggle();
    });
    var isShow = false;
    function sliderToggle () {
        $('#nav_mask').fadeToggle(400);
        if (isShow) {
            $('#nav').css({ 'right': '-70%' });

        } else {
            $('#nav').css({ 'right': '0' });
        }
        isShow = !isShow;
    }

})(jQuery);