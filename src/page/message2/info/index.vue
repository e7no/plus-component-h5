<template>
    <ul class="m-box-model m-entry-group">
      <router-link v-for="item in system" tag='li' class="m-entry" :key="item.url" :to='item.url'>
        <svg class="m-style-svg m-svg-big m-entry-prepend m-flex-grow0 m-flex-shrink0">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`#${item.icon}`"></use>
        </svg>
        <div class="m-box-model m-justify-bet m-flex-grow1 m-flex-shrink1 m-flex-base0 m-entry-main">
          <h2 class="m-text-cut">{{ item.title }}</h2>
          <p class="m-text-cut">{{ computedGetter(item.placeholder) }}</p>
        </div>
        <div class="m-box-model m-flex-grow0 m-flex-shrink0 m-entry-end m-justify-bet">
          <h5 v-if="computedGetter(item.time) !== '' && item.time">
            {{ +new Date((computedGetter(item.time))) + 10 || '' | time2tips }}
          </h5>
          <h5 v-else></h5>
          <div class="m-box m-aln-center m-justify-end">
            <span 
              :class="`${prefixCls}-time-count`" 
              v-if="computedGetter(item.count) !== 0">
              <i>{{ computedGetter(item.count) }}</i>
            </span>
          </div>
        </div>
      </router-link>
    </ul>
</template>
<script>
import { mapState } from "vuex";
const prefixCls = "msg";

export default {
  name: "msg",
  data() {
    return {
      prefixCls,
      system: {
        system: {
          title: "系统消息",
          placeholder: "sPlaceholder",
          icon: "message-tongzhi",
          hanBadge: 0,
          url: "/message/notification",
          count: "sCount",
          time: "sTime"
        },
        comments: {
          title: "收到的评论",
          placeholder: "cPlaceholder",
          icon: "message-pinglun",
          hanBadge: 0,
          url: "/message/comments",
          count: "cCount",
          time: "cTime"
        },
        diggs: {
          title: "收到的赞",
          placeholder: "dPlaceholder",
          icon: "message-zan",
          hanBadge: 0,
          url: "/message/likes",
          count: "dCount",
          time: "dTime"
        },
        audits: {
          title: "审核通知",
          placeholder: "aPlaceholder",
          icon: "message-shenghe",
          hanBadge: 0,
          url: "/message/audits/feedcomments",
          count: "aCount"
        }
      }
    };
  },
  methods: {
    computedGetter(key) {
      return this[key];
    }
  },

  computed: {
    ...mapState({
      msg: state => state.MESSAGE.UNREAD_COUNT.msg,
      newMsg: state => state.MESSAGE.NEW_UNREAD_COUNT,
      sCount: state => state.MESSAGE.NEW_UNREAD_COUNT.system || 0
    }),

    cPlaceholder() {
      return this.msg.comments.placeholder;
    },
    dPlaceholder() {
      return this.msg.diggs.placeholder;
    },
    aPlaceholder() {
      return this.aCount ? "你有未审核的信息请及时处理" : "暂无未审核的申请";
    },
    sPlaceholder() {
      return this.msg.system.placeholder;
    },
    cTime() {
      return this.msg.comments.time;
    },
    dTime() {
      return this.msg.diggs.time;
    },
    sTime() {
      return this.msg.system.time;
    },
    cCount() {
      return this.newMsg.commented || 0;
    },
    dCount() {
      return this.newMsg.liked || 0;
    },
    aCount() {
      return (
        ~~this.newMsg["feed-comment-pinned"] +
        ~~this.newMsg["news-comment-pinned"] +
        ~~this.newMsg["post-comment-pinned"] +
        ~~this.newMsg["post-pinned"] +
        ~~this.newMsg["group-join-pinned"]
      );
    }
  }
};
</script>
<style lang="less">
.msg-time-count {
  i {
    padding: 0 10px;
    border-radius: 50px;
    background: red;
    color: #fff;
  }
}
</style>
