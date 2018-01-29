(function ($) {
    /**
     * 产生随机数
     * @param int lower 最小数
     * @param int upper 最大数
     *
     */
    function random (lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }

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
        $('#nav').fadeToggle(400);
        if (isShow) {
            $('#nav_list').animate({ 'right': '-70%' }, 300);
            $('html body').css('overflow','auto');

        } else {
            $('#nav_list').animate({ 'right': '0' }, 300);
            $('html body').css('overflow','hidden');
        }
        isShow = !isShow;
    }

})(jQuery);