<template>
	<div class="content">
		<div class="titleBox">
			<a href="javascript:;" class="back-btn" onclick="javascript:history.back(-1);"></a>
			<h1>{{ msg }}</h1>
		</div>
		<div class="main">
			<div class="actorsBox">
				<img class="actors-img" v-bind:src="actorsImg"/>
				<p class="actorsTitle"><span class="actor-item">中文名：</span>{{ actorsName }}</p>
				<p class="actorsTitle"><span class="actor-item">英文名：</span>{{ actorsEnName }}</p>
				<p class="actorsSex"><span class="actor-item">性别：</span>{{ actorsSex }}</p>
				<p class="born-place"><span class="actor-item">出生地：</span>{{ born_place }}</p>
				<ul class="actorWorks">
					<li><p>代表作：</p></li>
					<li class="works" v-for="article in actorsWorks"><p>{{ article.subject.title }}</p></li>
				</ul>
				<!--<p class="actorsBirthday">出生日期：{{ actorsBirthday }}</p>-->
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'details',
		data(){
			return {
				msg: '演员简介',
				actorsName: '',
				actorsEnName: '',
				actorsSex:'',
				actorsImg:'',
				born_place:'',
				actorsWorks:[]
//				actorsBirthday:''
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
			        url: "https://api.douban.com/v2/movie/celebrity/"+id,
			        dataType: "jsonp",
			        success: function(response){
				        console.log(response);
				        self.actorsName=response.name;
				        self.actorsEnName=response.name_en;
				        self.actorsSex=response.gender;
				        self.actorsImg=response.avatars.medium;
				        self.born_place=response.born_place;
				        self.actorsWorks=response.works;
				        
//				        self.actorsBirthday=response.birthday;
				    },  
			        error:function(response){
				        console.log(response);
				    }
				})
			}
		}
	}
</script>

<style lang="less">
	@import '../assets/style.less';
	@import '../assets/reset.css';
</style>
