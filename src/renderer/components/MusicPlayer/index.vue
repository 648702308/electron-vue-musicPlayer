<template>
  <div class="flex align-center player">
    <!--播放控件-->
    <div class="flex align-center justify-center flex-shrink padding control">
      <el-button type="text" @click="playBefore" :disabled="!prevBtn">
        <i class="iconfont icon-skip--back--filled"></i>
      </el-button>
      <el-button class="play-btn" type="text" @click="playClick">
        <i class="iconfont icon-play--filled--alt" v-if="!isPlay"></i>
        <i class="iconfont icon-pause--filled" v-else></i>
      </el-button>
      <el-button type="text" @click="playAfter('click')" :disabled="!nextBtn">
        <i class="iconfont icon-skip--forward--filled"></i>
      </el-button>
    </div>

    <!--头像-->
    <div class="flex align-center flex-shrink margin-lr cover">
      <img class="cover-image" :src="cover"/>
      <audio v-show="false" ref="audio" v-if="playUrl" :src="playUrl.url" preload @ended="playEnded"/>
    </div>

    <!--进度条-->
    <div class="progress-info">
      <div class="padding-tb-xs progress-top">
        <span class="name">{{name}}</span>
        <span class="ar_name" v-if="arName"> - {{arName}}</span>
      </div>
      <div class="flex align-center justify-between padding-tb-xs progress-time">
        <div class="flex-shrink time">{{playTime*1000|formatDuring}}</div>
        <div class="padding-lr-sm progress-view">
          <el-slider :show-tooltip="false" v-model="playTime" :min="min" :max="max"
                     @change="playTimeChange"></el-slider>
        </div>
        <div class="flex-shrink time">{{playSong.dt|formatDuring}}</div>
      </div>
    </div>

    <div class="flex align-center flex-shrink padding-lr actions">
      <el-button type="text">
        <i class="iconfont icon-collect"></i>
      </el-button>
      <el-button type="text" @click="switchMode">
        <i class="iconfont icon-danquxunhuan1" v-if="playType===0"></i>
        <i class="iconfont icon-liebiaoxunhuan" v-else-if="playType===1"></i>
        <i class="iconfont icon-shunxubofang" v-else-if="playType===2"></i>
        <i class="iconfont icon-suijibofang" v-else-if="playType===3"></i>
      </el-button>
      <el-button type="text">
        <i class="iconfont icon-volume--down"></i>
      </el-button>
      <el-button type="text" @click.native="showPlaylist">
        <i class="iconfont icon-menu"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {createPlaySong} from '@/utils/song'

  export default {
    components: {},
    data() {
      return {
        audio: null,
        playTime: 0,
        max_time: 0,
        interval: null,
        playType: 1,//播放次序 0单曲循环 1列表循环 2顺序播放 3随机播放
      }
    },
    watch: {
      isPlay(val) {
        try {
          this.$nextTick(() => {
            this.audio = this.$refs['audio'];
            if (val) {
              this.audio.play();
              this.max_time = this.audio.duration;
              this.getPlayTime();
            } else {
              this.audio.pause();
              clearInterval(this.interval)
            }
          })
        } catch (e) {
          console.log('play error')
        }
      },
      currentTime(val) {
        this.playTime = val
      }
    },
    computed: {
      ...mapGetters([
        'playList',
        'playSong',
        'musicUrls',
        'isPlay'
      ]),
      min() {// 歌曲开始时间
        return 0
      },
      max() { // 歌曲结束时间
        try {
          return this.playSong.dt / 1000
        } catch (e) {
          return 0
        }
      },
      cover() {
        try {
          return this.playSong.al.picUrl;
        } catch (e) {
          return 'http://p1.music.126.net/dPn_6T9d5VUuCDvhJdZ_8A==/109951163399691488.jpg'
        }
      },
      name() {
        try {
          return this.playSong.name || '网易音乐，畅听无限'
        } catch (e) {
          return '网易音乐，畅听无限'
        }
      },
      arName() {
        try {
          return this.playSong.ar[0].name
        } catch (e) {
          return false
        }
      },
      playUrl() {
        return this.musicUrls[0] || false
      },
      currentTime() {
        return this.$store.state.player.currentTime
      },
      prevBtn() {
        return !!this.playList.length;
      },
      nextBtn() {
        return !!this.playList.length;
      }
    },
    mounted() {

    },
    methods: {
      /*播放/暂停按钮点击*/
      playClick() {
        if (this.playSong) {
          this.$store.commit('player/SET_IS_PLAY', !this.isPlay);
        }
      },
      /*获取当前已播放时间*/
      getPlayTime() {
        this.interval = setInterval(() => {
          this.$store.commit('player/SET_CURRENT_TIME', this.audio.currentTime);
        }, 1000)
      },
      /*改变播放时间 (拖动进度条)*/
      playTimeChange(val) {
        console.log('时间：',val)
        if (this.playSong) {
          this.audio.currentTime = val;
          this.$store.commit('player/SET_CURRENT_TIME', val);
        }
      },
      /*播放结束事件*/
      playEnded() {
        console.log('-------------playEnded')
        switch (this.playType) {
          case 0:
            this.rePlay();
            break;
          default:
            if (this.playList.length === 1) {
              this.rePlay();
            } else {
              this.playAfter('auto');
            }
            break;
        }
      },
      /*重新播放*/
      rePlay() {
        this.$store.commit('player/SET_IS_PLAY', false);
        this.$store.commit('player/SET_CURRENT_TIME', 0);
        setTimeout(() => {
          this.$store.commit('player/SET_IS_PLAY', true);
        }, 1000);
      },
      /*上一曲*/
      playBefore() {
        const playSong = createPlaySong(this.playList, this.playType, this.playSong.id, 'prev')
        console.log('----上一曲', playSong)
        if (playSong) {
          this.$store.dispatch('player/playMusic', playSong.id)
        }else{
          this.$store.commit('player/SET_IS_PLAY', !this.isPlay);
          this.playTime= 0
        }
      },
      /*下一曲*/
      playAfter(trigger = 'click') {
        const playSong = createPlaySong(this.playList, this.playType, this.playSong.id, 'next',trigger)
        console.log('----下一曲', playSong)
        if (playSong) {
          this.$store.dispatch('player/playMusic', playSong.id)
        }else{
          this.$store.commit('player/SET_IS_PLAY', !this.isPlay);
          this.playTime= 0
        }
      },
      /*弹出播放列表*/
      showPlaylist() {
        // this.$bus.$emit('showPlaylist')
      },
      /*切换模式*/
      switchMode() {
        if (this.playType >= 3) {
          this.playType = 0
        } else {
          this.playType++
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $height: 70px;
  .player {
    display: flex;
    align-items: center;
    .control {
      width: 200px;
      /deep/ .el-button {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        margin: 0 7px;
        color: #333;
        padding: 0;
        font-size: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        i {
          font-size: 16px;
        }
        &:hover {
          color: #2fab67;
        }
        &.play-btn {
          background-color: rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s;
          &:hover {
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
      }
    }

    .cover {
      width: 50px;
      .cover-image {
        width: 50px;
        height: 50px;
        border-radius: 6px;
      }
    }

    /*进度*/
    .progress-info {
      width: 100%;
      .progress-top {
        font-size: 13px;
        color: #444;
      }
      .progress-time {
        height: 22px;
        .time {
          font-size: 12px;
          color: #999;
          line-height: 1;
        }
        .progress-view {
          width: 100%;
          /deep/ .el-progress {
            .el-progress-bar__outer {
              border-radius: 0;
            }
            .el-progress-bar__inner {
              border-radius: 0;
            }
          }
          /deep/ .el-slider {
            .el-slider__runway {
              height: 4px;
              display: flex;
              align-items: center;
              margin: 4px 0;
            }
            .el-slider__bar {
              height: 4px;
            }
            .el-slider__button-wrapper {
              width: 20px;
              height: 20px;
              top: initial;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .el-slider__button {
              width: 10px;
              height: 10px;
            }
          }
        }
      }
    }

    .actions {
      width: 200px;
      .el-button {
        color: #333;
        flex: 1;
        flex-shrink: 0;
        &:hover {
          color: #31c27c;
        }
        i {
          font-size: 20px;
        }
      }
    }
  }
</style>
