<template>
	<div class="content">
		<div class="titleBox">
			<h1>{{ msg }}</h1>
		</div>
		<div class="main">
			<div class="blankBox">
				<div class="HitBox clearfix">
					<h3>正在热映</h3>
					<ul class="Hit-list">
						<li v-for="article in Hits">
							<a @click="getDetail(article.id)" >
								<p>{{ article.title }}</p>
								<div class="imgBox">
									<img v-bind:src="article.images.small" />
								</div>
							</a>
						</li>
					</ul>
				</div>
				<div class="upcomingBox">
					<h3 class="red">即将上映</h3>
					<ul class="upcoming-list">
						<li v-for="article in soon">
							<a @click="getDetail(article.id)" >
								<p>{{ article.original_title }}</p>
								<div class="imgBox">
									<img v-bind:src="article.images.small" />
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
	data(){
		return {
			msg: '豆瓣Movie',
			Hits:[],
			soon:[]
		}
	},
	created:function(){
		this.Hit();
		this.Upcoming();
	},
	methods:{
		Hit(){
			var self = this;
			this.myHttp({
				type: "get",    
		        url: "https://api.douban.com/v2/movie/in_theaters",
		        dataType: "jsonp",
		        success: function(response){
			        console.log(response);
			        self.Hits=response.subjects;
			        console.log(self.Hits);
			    },
		        error:function(response){
			        console.log(response);
			    }
			})
		},
		Upcoming(){
			var self = this;
			this.myHttp({
				type: "get",
		        url: "https://api.douban.com/v2/movie/coming_soon",  
		        dataType: "jsonp",
		        success: function(response){
			        console.log(response);
			        self.soon=response.subjects;
			    },
		        error:function(response){
			        console.log(response);
			    }
			})
		},
		getDetail(id){
			this.$router.push({ name: 'Details', params: { id }})
		}
	}
}
</script>

<style lang="less">
	@import '../assets/style.less';
	@import '../assets/reset.css';
</style>
