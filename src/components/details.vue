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
					<a @click="getActor(article.id)" class="casts-name" v-for="article in casts">
						{{ article.name }}
					</a>
				</p>
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
				summary: ''
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
