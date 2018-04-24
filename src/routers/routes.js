import NotFound from "../page/notFound";
import baseRoutes from "./base.js";
import feedRoutes from "./feed.js";
import newsRoutes from "./news.js";
import rankRoutes from "./rank.js";
import postRoutes from "./post.js";
import groupRoutes from "./group.js";
import messageRoutes from "./message.js";
import questionRoutes from "./question.js";
/* eslint-disable one-var */
const /* 公共页面 */

  // 用户标签选择
  chooseTags = () =>
    import(/* webpackChunkName: 'common' */ "../page/common/chooseTags"),
  postGroupFeed = () =>
    import(/* webpackChunkName: 'common' */ "../page/common/postGroupFeed/");

/**
 * 钱包页面
 * @auth:  jsonleex <jsonleex@163.com>
 * @return {[type]}
 */
const wallet = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/wallet");
/**
 * 充值
 * @auth: jsonleex <jsonleex@163.com>
 */
const WalletRecharge = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/WalletRecharge");
/**
 * 提现
 * @auth: jsonleex <jsonleex@163.com>
 */
const WalletWithdraw = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/WalletWithdraw");
/**
 * 明细
 * @auth: jsonleex <jsonleex@163.com>
 */
const WalletDetail = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/WalletDetail");

const router = [
  /* 基础入口 */
  { path: "/", redirect: "/signin" },
  ...baseRoutes,

  ...feedRoutes,
  ...postRoutes,
  ...newsRoutes,
  ...rankRoutes,
  ...groupRoutes,
  ...messageRoutes,
  ...questionRoutes,

  /**
   * 消息页面路由
   */
  /**
   * 消息页面路由结束
   */

  {
    path: "/wallet",
    component: wallet,
    meta: {
      title: "钱包",
      requiresAuth: true
    }
  },
  {
    path: "/wallet/recharge",
    component: WalletRecharge,
    meta: {
      title: "充值"
    }
  },
  {
    path: "/wallet/withdraw",
    component: WalletWithdraw,
    meta: {
      title: "提现"
    }
  },
  {
    path: "/wallet/detail",
    component: WalletDetail,
    meta: {
      title: "明细"
    }
  },

  /* 公共页面 */
  {
    path: "/tags",
    component: chooseTags,
    meta: { title: "选择标签" }
  } /* 选择标签 */,

  {
    path: "/post/fatie",
    name: "postGroupFeed",
    component: postGroupFeed,
    meta: {
      keepAlive: true,
      title: "发布帖子",
      requiresAuth: true
    }
  },
  { path: "*", component: NotFound } /* 404 页面 */
];

export default router;
