export const streaming = {
    disposeLyric(lyricStc){
        // 匹配所有[]字符串以及里面的一切内容, 返回数组
        let reg = /\[.+?\]/g
        let timeArr = lyricStc.match(reg) 
        // 按照[]拆分歌词字符串, 返回一个数组
        let contentArr = lyricStc.split(/\[.+?\]/).slice(1)
        let lyricObj = {}
        timeArr.forEach((item, index) => {
            // 拆分[00:00.000]这个格式字符串, 把分钟数字取出, 转换成秒
            let ms = item.split(':')[0].split('')[2] * 60
            // 拆分[00:00.000]这个格式字符串, 把十位的秒拿出来, 如果是0, 去拿下一位数字, 否则直接用2位的值
            let ss = item.split(':')[1].split('.')[0].split('')[0] === '0' ? item.split(':')[1].split('.')[0].split('')[1] : item.split(':')[1].split('.')[0]
            // 秒数作为key, 对应歌词作为value
            lyricObj[ms + Number(ss)] = contentArr[index]
        })
        return lyricObj
    }
}