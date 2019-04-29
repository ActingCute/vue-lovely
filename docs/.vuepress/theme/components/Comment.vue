<template>
  <section class="comments">
    <h1>Comments</h1>
    <article class="comment" v-for="(item,index) in comment_data">
      <div class="meta">
        <img :src="GetLeiMu(item.user.id)" class="avatar">
        <h3>
          <a href="#" class="author">{{item.user.name}}</a>
        </h3>
        <a href="#" class="date">
          <time datetime="2015-01-01">{{item.comment.update_time}}</time>
        </a>
      </div>
      <div class="content">
        <p>{{item}}</p>
      </div>
    </article>
  </section>
</template>

<script>
  import {GetLeiMu} from '../util'
  import {
    CommentGet
  } from '../util/api'
  import {
    GetUrl
  } from '../util'

  export default {
    name: "comment",
    data() {
      return {
        comment_data:[]
      }
    },
    mounted: function () {
      this.CommentGet()
    },
    methods: {
      //获取当前页评论
      GetLeiMu(id){
        return GetLeiMu(id)
      },
      CommentGet() {
        console.log("leimu -- ",GetLeiMu(100))
        let url = GetUrl()
        CommentGet({
          url
        }).then(response => {
          let code = response.Result
          switch (code) {
            case this.Code.SUCCESS:
              this.comment_data = response.Data
              break
            default:
              this.Msg("code:" + code + " 获取评论失败",2)
          }
          console.log(response)
        })
      }
    }
  }
</script>



<style lang="stylus" scoped>
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Merriweather', serif;
    font-weight: 700;
  }

  .comments {
    max-width: 780px;
  }

  .comments article.comment {
    position: relative;
    margin-bottom: 30px;
  }

  .comments article.comment .meta {
    height: 60px;
    margin-bottom: 17px;
    position: relative;
  }

  .comments article.comment .meta img.avatar {
    position: absolute;
    border-radius: 30px;
    width: 60px;
    height: 60px;
    left: 0px;
    top: 0px;
  }

  .comments article.comment .meta a.author,
  .comments article.comment .meta a.date {
    text-decoration: none;
    position: absolute;
  }

  .comments article.comment .meta a.author {
    color: inherit;
    left: 73px;
    line-height: 29px;
    padding: 0px 7px;
    top: 3px;
  }

  .comments article.comment .meta a.date {
    font-size: 14px;
    line-height: 19px;
    color: #666;
    left: 80px;
    top: 35px;
  }

  .comments article.comment .content {
    background-color: #fff;
    border: 1px solid #dadada;
    border-radius: 4px;
    padding: 22px 25px;
    position: relative;
  }

  .comments article.comment .content:after,
  .comments article.comment .content:before {
    bottom: 100%;
    left: 30px;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .comments article.comment .content:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #fff;
    border-width: 12px;
    margin-left: -12px;
  }

  .comments article.comment .content:before {
    border-color: rgba(245, 47, 47, 0);
    border-bottom-color: #dadada;
    border-width: 13px;
    margin-left: -13px;
  }
</style>