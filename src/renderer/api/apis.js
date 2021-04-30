import { get, formData, remove, put, post } from './methodApis'

/**
 * 登录
 * @param param
 */
export function Login(param={}) {
  return get('/login_cellphone', param)
}

/**
 * 登录状态
 * @param param
 */
export function LoginStatus(param={}) {
  return get('/login_status', param)
}

/**
 * banner图
 * @param param
 */
export function banner(param={}) {
  return get('/banner', param)
}

/**
 * 推荐歌单
 * @param param
 */
export function recommendSong(param={}) {
  return get('/personalized', param)
}

/**
 * 独家放送
 * @param param
 */
export function privatecontent(param={}) {
  return get('/personalized_privatecontent_list', param)
}

/**
 * 推荐MV
 * @param param
 */
export function personalizedMv(param={}) {
  return get('/personalized_mv', param)
}

/**
 * 最新MV
 * @param param
 */
export function newMv(param={}) {
  return get('/mv_first', param)
}
/**
 * 最新MV
 * @param param
 */
export function topMv(param={}) {
  return get('/top_mv', param)
}

/**
 * 推荐新音乐
 * @param param
 */
export function newsong(param={}) {
  return get('/personalized_newsong', param)
}


/**
 * 每日推荐歌单
 * @param param
 */
export function resource(param={}) {
  return get('/recommend_resource', param)
}

/**
 * 每日推荐歌单
 * @param param
 */
export function dragonBall(param={}) {
  return get('/homepage_dragon_ball', param)
}

/**
 * 获取歌单详情
 * @param param
 */
export function playListDetail(param={}) {
  return get('/playlist_detail', param)
}

/**
 * 获取音乐播放地址
 * @param param
 */
export function musicUrl(param={}) {
  return get('/song_url', param)
}

/**
 * 获取音乐详情
 * @param param
 */
export function songDetail(param={}) {
  return get('/song_detail', param)
}


/**
 * 热门电台列表
 * @param param
 */
export function djHot(param={}) {
  return get('/dj_hot', param)
}

/**
 * 最热主播榜列表(电台)
 * @param param
 */
export function djPopular(param={}) {
  return get('/dj_toplist_popular', param)
}

/**
 * 主播新人榜列表(电台)
 * @param param
 */
export function djNewcomer(param={}) {
  return get('/dj_toplist_newcomer', param)
}

/**
 * 今日优选(电台)
 * @param param
 */
export function djPerfered(param={}) {
  return get('/dj_today_perfered', param)
}

/**
 * 推荐电台
 * @param param
 */
export function djprogram(param={}) {
  return get('/personalized_djprogram', param)
}

/**
 * 鉴权接口
 */

/**
 * 获取用户歌单
 * @param param
 */
export function userPlaylist(param={}) {
  return get('/user_playlist', param)
}

/**
 * 收藏歌单或者取消收藏歌单
 * @param param
 */
export function playSubscribe(param={}) {
  return get('/playlist_subscribe', param)
}

/**
 * 获取用户信息
 * @param param
 */
export function userSubcount(param={}) {
  return get('/user_subcount', param)
}

/**
 * 刷新登录状态
 * @param param
 */
export function loginRefresh(param={}) {
  return get('/login_refresh', param)
}
