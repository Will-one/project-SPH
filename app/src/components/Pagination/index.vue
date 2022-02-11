<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo - 1)">上一页</button>
    <button v-show="PaginationInfo.frontEllipsisShow" @click="$emit('getPageNo',1)">1</button>
    <button v-show="PaginationInfo.frontEllipsisShow">···</button>
    <button :disabled="pageNo == n" :class="{active:pageNo==n}" v-for="(n, index) in PaginationInfo.continueArr" :key="index" @click="$emit('getPageNo',n)">{{ n }}</button>
    <button v-show="PaginationInfo.backEllipsisShow">···</button>
    <button v-show="PaginationInfo.backEllipsisShow" @click="$emit('getPageNo',totalPages)">{{ totalPages }}</button>
    <button :disabled="pageNo == totalPages" @click="$emit('getPageNo',pageNo/1 + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:['pageNo','continues','total','totalPages'],
        computed:{
            PaginationInfo(){
                const {pageNo,continues,totalPages} = this
                let start = 0, end = 0
                let frontEllipsisShow = false
                let backEllipsisShow = false

                if (totalPages > ((continues/1) + 4)) {
                    // 页数足够，有省略号的情况
                    if(pageNo <= (Math.ceil(continues/2) + 2)){
                        // 当前页码处于头部位置，无前省略号，有后省略号
                        start = 1
                        end = continues / 1 + 2
                        backEllipsisShow = true
                    } else if(pageNo >= (totalPages - parseInt((continues / 2) + 2))){
                        // 当前页码处于尾部位置，有前省略号，无后省略号
                        start = totalPages - ((continues / 1) + 1)
                        end = totalPages
                        frontEllipsisShow = true
                    } else {
                        // 当前页码不处于头尾位置，有前后省略号
                        start = pageNo - parseInt(continues/2)
                        end = (pageNo / 1) + parseInt(continues/2)
                        frontEllipsisShow = true
                        backEllipsisShow = true
                    }
                } else {
                    // 页数不足，没有省略号的情况
                    start = 1
                    end = totalPages
                }

                // 构建连续部分的数组
                let continueArr = []
                for (let i = 1; i <= (end - start + 1); i++){
                    continueArr.push(start + i - 1)
                }

                return {continueArr,frontEllipsisShow,backEllipsisShow}
            }
        }
    }
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>