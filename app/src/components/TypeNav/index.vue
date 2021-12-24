<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex">
        <h2 class="all" @mouseenter="categoryListShow">全部商品分类</h2>
        <transition name="sort">
        <div class="sort" v-show="isShow">
          <!-- 做了事件委派，但是所有的子节点都能触发，是一个问题。还要区分是几级的标签 -->
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              v-if="c1.categoryId < 17"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1ID="c1.categoryId"
                >
                  {{ c1.categoryName }}
                </a>
              </h3>
              <!-- 二、三级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2ID="c2.categoryId"
                      >
                        {{ c2.categoryName }}
                      </a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3ID="c3.categoryId"
                        >
                          {{ c3.categoryName }}
                        </a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: false,
    };
  },

  // 组件挂载完毕，就向服务器发送请求[数据的请求放到App组件中，请求一次即可]
  mounted() {
    if (this.$route.path == "/home") {
      this.isShow = true;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    // 引入lodash里面的节流函数_.throttle，防止鼠标移动过快，造成浏览器卡顿
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path == "/search") {
        this.isShow = false;
      }
    },

    goSearch() {
      // 编程式导航+事件委派 【要对子节点进行区分并传递对应的参数】
      let element = event.target;
      if (element) {
        let { categoryname, category1id, category2id, category3id } =
          element.dataset;

        if (categoryname) {
          let location = { name: "search" };
          let query = { categoryName: categoryname };

          if (category1id) {
            query.category1Id = category1id;
          } else if (category2id) {
            query.category2Id = category2id;
          } else if (category3id) {
            query.category3Id = category3id;
          }
          location.query = query;
          this.$router.push(location);
        }
      }
    },

    categoryListShow() {
      if (this.$route.path == "/search") {
        this.isShow = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态（进入的开始状态）
    .sort-enter{
      height: 0;
    }
    // 过渡动画的结束状态（进入）
    .sort-enter-to{
      height: 461px;
    }
    // 定义动画的时间。速率
    .sort-enter-active{
      transition: all .1s linear;
    }
  }
}
</style>