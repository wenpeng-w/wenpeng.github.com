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
})(jQuery);