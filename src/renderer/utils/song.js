/**
 * 生成播放歌曲
 * @param playList
 * @param playType
 * @param curId
 * @param direction
 * @param trigger
 * @returns {*}
 */
export function createPlaySong(playList = [], playType = 1, curId, direction = 'next', trigger = 'click') {
  let s_index = -1
  let curIndex = playList.findIndex((item, index) => {
    return item.id === curId
  })
  if (curIndex === -1) return false
  switch (playType) {
    case 2:
      /*顺序播放*/
      if (direction === 'next') {
        if (curIndex < playList.length - 1) {
          s_index = curIndex + 1
        }
        return s_index >= 0 ? playList[s_index] : (trigger === 'click' ? playList[0] : false);
      } else {
        if (curIndex < playList.length - 1) {
          s_index = curIndex - 1
        }
        return s_index >= 0 ? playList[s_index] : (trigger === 'click' ? [...playList].pop() : false);
      }
      break;
    case 3:
      /*随机播放*/
      let randomNum = Math.floor(Math.random() * playList.length);
      if (randomNum === curIndex && randomNum < playList.length - 2) {
        randomNum++
      } else if (randomNum === curIndex && randomNum < 2) {
        randomNum++
      } else {
        randomNum--
      }
      // console.log('randomNum', randomNum)
      return randomNum >= 0 ? playList[randomNum] : false;
      break;
    default:
      /*列表循环 和 单曲循环点击切换*/
      if (direction === 'next') {
        if (curIndex < playList.length - 1) {
          s_index = curIndex + 1
        }
        return s_index >= 0 ? playList[s_index] : playList[0];
      } else {
        if (curIndex < playList.length - 1) {
          s_index = curIndex - 1
        }
        return s_index >= 0 ? playList[s_index] : [...playList].pop();
      }
      break;
  }
}
