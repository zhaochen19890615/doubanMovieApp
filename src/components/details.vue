<template>
	<div class="content">
		<div class="titleBox">
			<a href="javascript:;" class="back-btn" onclick="javascript:history.back(-1);"></a>
			<h1>{{ msg }}</h1>
		</div>
		<div class="main">
			<div class="detailsBox">
				<p class="movieTitle">{{ mytitle }}</p>
				<div class="poster-box">
					<img class="movie-poster" v-bind:src="myposter"/>
				</div>
				<p class="casts">
					<span>主演：</span>
					<a @click="getActor(article.id)" class="casts-name fc_green" v-for="article in casts">
						{{ article.name }}
					</a>
				</p>
				<p class="details-text">评分：<span class="fc_orange">{{ rating.average }}</span></p>
				<p class="details-text">
					<span class="">想看人数：<span class="fc_orange">{{ wish }}</span></span>
				</p>
				<p class="details-text">
					<span class="">看过人数：<span class="fc_orange">{{ collect }}</span></span>
				</p>
				<p class="details-text">年代：<span class="fc_orange">{{ year }}</span></p>
				<a v-bind:href="mobile_url" class="movie-href fc_green">电影详情</a>
				<p class="movieText">{{ summary }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'details',
		data(){
			return {
				msg: '电影简介',
				mytitle: '',
				myposter: '',
				casts: [],
				rating:'',
				summary: '',
				wish:'',
				collect:'',
				year:'',
				mobile_url:''
			}
		},
		created:function(){
			this.init();
		},
		methods:{
			init(){
				let id = this.$route.params.id;
				console.log(id);
				var self = this;
				this.myHttp({
					type: "get",    
			        url: "https://api.douban.com/v2/movie/subject/"+id,
			        dataType: "jsonp",
			        success: function(response){
				        console.log(response);
				        self.mytitle=response.title;
				        self.myposter=response.images.large;
						self.summary=response.summary;
						self.casts=response.casts;
						self.rating=response.rating;
						self.wish=response.wish_count;
				        self.collect=response.collect_count;
				        self.year=response.year;
				        self.mobile_url=response.mobile_url;
				    },  
			        error:function(response){
				        console.log(response);
				    }
				})
			},
			getActor(id){
//				this.$router.push({ name: 'Actors', params: { id }})
				window.location.href = "https://movie.douban.com/celebrity/" + id + "/mobile"; 
			}
		}
	}
</script>

<style lang="less">
	@import '../assets/style.less';
	@import '../assets/reset.css';
</style>
