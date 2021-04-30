<template>
  <el-scrollbar class="scrollbar" v-loading="loading">
    <div class="padding">
      <template v-if="playlist && show">
        <div class="flex padding-tb-lg top">
          <div class="cover">
            <img :src="playlist.coverImgUrl"/>
          </div>
          <div class="flex flex-direction justify-between info">
            <div class="title">{{playlist.name}}</div>
            <div class="author">
              <img :src="playlist.creator.avatarUrl"/>
              <span>{{playlist.creator.nickname}}</span>
            </div>
            <div class="desc line-1">{{playlist.description}}</div>
            <div class="actions">
              <el-button @click="playAll" size="mini" type="primary" icon="iconfont icon-play--filled--alt">播放全部
              </el-button>
              <template v-if="playlist.subscribed">
                <el-button size="mini" icon="iconfont icon-collect" @click="collectPlaylist(2)">
                  已收藏({{playlist.subscribedCount}})
                </el-button>
              </template>
              <template v-else>
                <el-button size="mini" icon="iconfont icon-collect" @click="collectPlaylist(1)">
                  收藏({{playlist.subscribedCount}})
                </el-button>
              </template>
              <el-button size="mini" icon="iconfont icon-down-load">下载</el-button>
            </div>
          </div>
        </div>
        <div class="padding-tb-lg tracks">
          <div class=""></div>
          <div class="list">
            <el-table size="small" :data="playlist.tracks">
              <el-table-column label="歌曲">
                <template slot-scope="scope">
                  <div class="flex align-center justify-between name-row">
                    <div class="flex align-center left">
                      <span class="margin-right-xs lineht-1 pointer">
                        <i @click="likeMusic(scope.row)" class="iconfont icon-collect"></i>
                      </span>
                      <span class="line-1 lineht-1 name" :title="scope.row.name">{{scope.row.name}}</span>
                      <img class="pointer tag" src="../../assets/images/sq.png"/>
                      <img v-if="scope.row.mv>0" class="pointer tag" src="../../assets/images/mv.png"/>
                    </div>
                    <div class="flex align-center flex-shrink justify-end btns">
                      <i class="pointer iconfont icon-play--filled--alt play" @click="play(scope.row)"></i>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="200" label="歌手" prop="ar[0].name">
                <template slot-scope="scope">
                  <span style="width: 140px;" class="line-1 hover">{{scope.row.ar[0].name}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" label="专辑" prop="al.name">
                <template slot-scope="scope">
                  <span style="width: 190px;" class="line-1 hover">{{scope.row.al.name}}</span>
                </template>
              </el-table-column>
              <el-table-column width="60" label="时长" prop="dt">
                <template slot-scope="scope">
                  <span>{{scope.row.dt|formatDuring}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>

<script>
  import {playListDetail, playSubscribe} from "@/api/apis";
  import {mapGetters} from 'vuex'

  export default {
    name: "PlayList",
    data() {
      return {
        id: '',
        loading: true,
        show: false,
        playlist: false
      }
    },
    mounted() {

    },
    computed: {
      ...mapGetters(['playSongId'])
    },
    activated() {
      this.getPlayList()
    },
    methods: {
      getPlayList() {
        this.loading = true
        playListDetail({id: this.$route.params.id, s: 15}).then(res => {
          setTimeout(() => {

            const delaySubscribeLists = this.$store.getters.delaySubscribeLists
            const delayCancelSubscribeLists = this.$store.getters.delayCancelSubscribeLists
            if (delaySubscribeLists.includes(Number(this.$route.params.id)) && !res.playlist.subscribed) {
              res.playlist.subscribed = true;
              console.log(true)
            }else if(delayCancelSubscribeLists.includes(Number(this.$route.params.id)) && res.playlist.subscribed){
              res.playlist.subscribed = false;
              console.log(false)
            }else {
              console.log('no')
              this.$store.dispatch('delay/removeSubscribeId',Number(this.$route.params.id))
            }
            this.playlist = res.playlist;
            this.show = true
            this.loading = false
          }, 300)
        })
      },
      likeMusic(item) {

      },
      // 单曲播放
      play(item) {
        if (this.playSongId !== item.id) {
          this.$store.dispatch('player/playMusic', item.id);
          this.$store.commit('player/SET_PLAYER_LIST', this.playlist.tracks);
        }
      },
      // 播放全部
      playAll() {
        console.log('播放列表（全部播放）')
        this.$store.dispatch('player/playPlaylist', this.playlist.id)
      },

      /* 收藏歌单 */
      collectPlaylist(t) {
        playSubscribe({t: t, id: this.$route.params.id}).then(res => {
          /* 防止延迟 */
          this.$store.dispatch('delay/setSubscribeLists', {id:Number(this.$route.params.id), t})

          /* 更新收藏状态 */
          this.getPlayList()
          /* 更新用户歌单列表 */
          this.$store.dispatch('user/userAllPlaylist', this.$store.getters.uid)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .top {
    .cover {
      width: 147px;
      height: 147px;
      position: relative;
      flex-shrink: 0;
      img {
        width: 147px;
        height: 147px;
      }
    }
    .info {
      margin-left: 20px;
      .title {
        font-size: 22px;
        color: #000;
        font-weight: bold;
      }
      .author {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #555;
        img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .desc {
        font-size: 13px;
        color: #555;
        line-height: 20px;
      }
      /deep/ .actions {
        button {
          min-width: 90px;
          i {
            font-size: 13px;
            margin-right: 3px;
          }
        }
      }
    }
  }

  .tracks {
    .list {
      /deep/ .el-table {
        background: none;
        th {
          background: none;
        }
        tr {
          background: none;
        }
        tr:hover {
          .btns {
            visibility: visible;
            .iconfont:hover {
              color: #31c27c;
            }
          }
        }
      }
      .name-row {
        .left {
          width: 100%;
          .icon-collect:hover {
            color: #31c27c;
          }
          .tag {
            height: 20px;
            margin-left: 5px;
          }
          .name {
            width: calc(100% - 50px);
            line-height: 1.5;
          }
        }
        .btns {
          width: 50px;
          visibility: hidden;
        }
      }
    }
  }
</style>
