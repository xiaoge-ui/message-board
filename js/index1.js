$(()=>{
	var page=1;//设置默认的页码
	axios.defaults.headers.common['token']=localStorage.getItem("jwt");
	console.log(axios.defaults.headers.common['token']);
	axios.post("login.php").then(res=>{
		console.log(res.data);
		if(res.data.result=="success"){
			$("#adminName").html(res.data.info.data.userName);
			var param2=new URLSearchParams();
			param2.append("page",page);
			console.log(param2);
			axios.post("message.php",param2).then(res=>{
				var data=res.data.data;
				console.log(data);
				console.log(`../img/face/${data[0].face}`);
				var str;
				$.each(data,(index,value)=>{
					str+=`<tr data-id=${value.messageId}><td><img src=../img/face/${value.face}> 昵称:${value.author} 在 ${value.addTime} 发表: </td></tr>`+`<tr data-id=${value.messageId}><td> 主题:${value.title}</td></tr>`+`<tr data-id=${value.messageId}><td>内容:${value.content}</td></tr>`+(value.replay!=null?'<tr data-id="'+value.messageId+'"><td>管理员回复道:'+value.replay+"</td></tr>":"<tr><td>暂无任何回复</td></tr>")+'<tr data-id="'+value.messageId+'"><td class="sh">审核状态:'+(value.flag==0?'<span data-id="'+value.messageId+'">'+"未审核</span>":"已审核")+`<tr data-id=${value.messageId}><td class=content><a href=javascript:; id=delete data-id=${value.messageId}>删除</a> | <a href=javascript:; class=replay data-id=${value.messageId}>回复留言</a>`;
				})
				$("table").html(str);
				
				//审核功能
				audit();
				//删除功能
				delete1();
				// 回复功能
				replay();
			})
			
			var recount=0;//设置总的记录数
			var repage=1;  //设置总的页数
			axios.get("../recount.php").then(res=>{
				console.log(res.data.recount);
				recount=res.data.recount;
				repage=Math.ceil(recount/5);
				console.log(repage);
			}).catch(e=>{
				console.log(e.message);
			})
			// 下一页:
			// 设置一个ajax标识
			$("#next").click(()=>{
				var flag=true;
				console.log("page",page);
				console.log("repage",repage);
				if(page>repage){
					page=repage;
				}else{
					if(page<repage){
						page++;
					}else{
						flag=false;
					}
					if(page<=repage && flag){
						var param3=new URLSearchParams();
						param3.append("page",page);
						axios.post("../admin/message.php",param3).then(res=>{
							var data=res.data.data;
							console.log(res.data.data);
							var str;
							$.each(data,(index,value)=>{
								str+=`<tr data-id=${value.messageId}><td><img src=../img/face/${value.face}> 昵称:${value.author} 在 ${value.addTime} 发表: </td></tr>`+`<tr data-id=${value.messageId}><td> 主题:${value.title}</td></tr>`+`<tr data-id=${value.messageId}><td>内容:${value.content}</td></tr>`+(value.replay!=null?'<tr data-id="'+value.messageId+'"><td>管理员回复道:'+value.replay+"</td></tr>":"<tr><td>暂无任何回复</td></tr>")+'<tr data-id="'+value.messageId+'"><td class="sh">审核状态:'+(value.flag==0?'<span data-id="'+value.messageId+'">'+"未审核</span>":"已审核")+`<tr data-id=${value.messageId}><td class=content><a href=javascript:; id=delete data-id=${value.messageId}>删除</a> | <a href=javascript:; class=replay data-id=${value.messageId}>回复留言</a>`;
							})
							$("table").html(str);
							//审核功能
							audit();
							//删除功能
							delete1();
							// 回复功能
							replay();
						})
					}
				}
			})
			
			// 上一页
			$("#on").click(()=>{
				var flag1=true;
				console.log("page",page);
				console.log("repage",repage);
				if(page<1){
					page=1;
				}else{
					if(page>1){
						page--;
					}else{
						flag1=false;
					}
					if(page>=1 && flag1){
						var param3=new URLSearchParams();
						param3.append("page",page);
						axios.post("../admin/message.php",param3).then(res=>{
							var data=res.data.data;
							console.log(res.data.data);
							var str;
							$.each(data,(index,value)=>{
								str+=`<tr data-id=${value.messageId}><td><img src=../img/face/${value.face}> 昵称:${value.author} 在 ${value.addTime} 发表: </td></tr>`+`<tr data-id=${value.messageId}><td> 主题:${value.title}</td></tr>`+`<tr data-id=${value.messageId}><td>内容:${value.content}</td></tr>`+(value.replay!=null?'<tr data-id="'+value.messageId+'"><td>管理员回复道:'+value.replay+"</td></tr>":"<tr><td>暂无任何回复</td></tr>")+'<tr data-id="'+value.messageId+'"><td class="sh">审核状态:'+(value.flag==0?'<span data-id="'+value.messageId+'">'+"未审核</span>":"已审核")+`<tr data-id=${value.messageId}><td class=content><a href=javascript:; id=delete data-id=${value.messageId}>删除</a> | <a href=javascript:; class=replay data-id=${value.messageId}>回复留言</a>`;
							})
							$("table").html(str);
							//审核功能
							audit();
							//删除功能
							delete1();
							// 回复功能
							replay();
						})
					}
				}
			})
		}else{
			localStorage.removeItem("jwt");
			location.href="index.html";
		}
	})
	
	
	// 审核功能
	function audit(){
		$(".sh span").click(function(){
			axios.defaults.headers.common['token']=localStorage.getItem("jwt");
			var _this=$(this);
			console.log($(this))
			console.log(_this.attr("data-id"));
			var params=new URLSearchParams();
			params.append("messageId",_this.attr("data-id"));
			axios.post("audit.php",params).then(res=>{
				console.log(res.data);
				if(res.data.status=="40001"){
					_this.html("已审核");
					_this.parent("td").removeClass("sh");
				}else{
					alert(res.data.msg);
				}
			})
		})
	}
	
	// 删除功能
	function delete1(){
		$("a#delete").on("click",function(){
			axios.defaults.headers.common['token']=localStorage.getItem("jwt");
			var _this=$(this);
			console.log(_this.attr("data-id"));
			var params=new URLSearchParams();
			params.append("messageId",_this.attr("data-id"));
			axios.post("delete.php",params).then(res=>{
				console.log(res.data);
				if(res.data.status=="50001"){
					alert("恭喜您，删除成功");
					console.log(_this.parents("tr").add($(_this.parents("tr").siblings("tr"+'[data-id='+_this.attr("data-id")+']'))));
					_this.parents("tr").add($(_this.parents("tr").siblings("tr"+'[data-id='+_this.attr("data-id")+']'))).remove();
				}else{
					alert("删除失败，请重新删除");
				}
			})
		})
	}
	
	// 回复留言
	function replay(){
		$("a.replay").on("click",function(){
			var _this=$(this);
			$(".hide").fadeIn();
			$("#btn").click(()=>{
				if($("#replay1").val()!=""){
					axios.defaults.headers.common['token']=localStorage.getItem('jwt');
					var params=new URLSearchParams();
					params.append("replay",$("#replay1").val());
					params.append("messageId",_this.attr("data-id"));
					axios.post("replay.php",params).then(res=>{
						if(res.data.status=="60001"){
							alert("恭喜您,回复留言成功");
							_this.parents("tr").prev("tr"+'[data-id='+_this.attr("data-id")+']').prev("tr").html('<td>管理员回复到:'+$("#replay1").val()+'</td>');
							$(".hide").fadeOut();
							$("#replay1").val("");
						}else{
							alert("很遗憾，回复留言失败");
							$(".hide").fadeOut();
						}
					})
				}else{
					alert("信息不全，不能发布");
				}
			})
		})
	}
	
	// 记录内容多少字
	$("#replay1").on("input",function(){
		$(".show p span").html($(this).val().length);
	})
	
	//取消发布留言
	$("#quit").click(()=>{
		$(".hide").fadeOut();
	})
	// 注销功能
	$("#exit").click(()=>{
		localStorage.removeItem("jwt");
	})
	
})