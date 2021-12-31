const timeAgo = (date, locale) => {
    if (date) {
        try {
            var oldTime = date.getTime();
            var currTime = new Date().getTime();
            var diffValue = currTime - oldTime;

            var days = Math.floor(diffValue / (24 * 3600 * 1000));
            if (days === 0) {
                //计算相差小时数
                var leave1 = diffValue % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1 / (3600 * 1000));
                if (hours === 0) {
                    //计算相差分钟数
                    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
                    var minutes = Math.floor(leave2 / (60 * 1000));
                    if (minutes === 0) {
                        //计算相差秒数
                        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
                        var seconds = Math.round(leave3 / 1000);
                        return seconds + ` ${locale['timeago']['seconds']}`;
                    }
                    return minutes + ` ${locale['timeago']['minutes']}`;
                }
                return hours + ` ${locale['timeago']['hours']}`;
            }
            if (days < 0) return locale['timeago']['now'];

            if (days < 8) {
                return days + ` ${locale['timeago']['days']}`;
            } else {
                return dateFormat(date)
            }
        } catch (error) {
            console.log(error)
        }
    }
}


const dateFormat = (date) => {
    var vDay = padWithZeros(date.getDate(), 2);
    var vMonth = padWithZeros(date.getMonth() + 1, 2);
    var vYear = padWithZeros(date.getFullYear(), 2);
    // var vHour = padWithZeros(date.getHours(), 2);
    var vMinute = padWithZeros(date.getMinutes(), 2);
    // var vSecond = padWithZeros(date.getSeconds(), 2);
    var apHour, vHour = date.getHours();
    if (vHour >= 19) {
        apHour = '晚间' + (vHour - 12)
    } else if (vHour >= 17) {
        apHour = '傍晚' + (vHour - 12)
    } else if (vHour >= 14) {
        apHour = '下午' + (vHour - 12)
    } else if (vHour > 12) {
        apHour = '中午' + (vHour - 12)
    } else if (vHour == 12) {
        apHour = '中午' + vHour
    } else if (vHour >= 8) {
        apHour = '上午' + vHour
    } else if (vHour >= 6) {
        apHour = '早上' + vHour
    } else {
        apHour = '凌晨' + vHour
    }
    return `${vYear}-${vMonth}-${vDay} ${apHour}:${vMinute}`;
}


const padWithZeros = (vNumber, width) => {
    var numAsString = vNumber.toString();
    while (numAsString.length < width) {
        numAsString = '0' + numAsString;
    }
    return numAsString;
}

module.exports = timeAgo