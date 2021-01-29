$(()=>{
	var page=1;//设置默认的页码
	var param2=new URLSearchParams();
	param2.append("page",page);
	console.log(param2);
	axios.post("message.php",param2).then(res=>{
		var data=res.data.data;
		console.log(data);
		console.log(`img/face/${data[0].face}`);
		var str;
		$.each(data,(index,value)=>{
			str+=`<tr data-id=${value.messageId}><td><img src=img/face/${value.face}> 昵称:${value.author} 在 ${value.addTime} 发表: </td></tr>`+`<tr data-id=${value.messageId}><td> 主题:${value.title}</td></tr>`+`<tr data-id=${value.messageId}><td>内容:${value.content}</td></tr>`+(value.replay!=null?'<tr data-id="'+value.messageId+'"><td class=content>管理员回复道:'+value.replay+"</td></tr>":"<tr><td class=content>管理员回复道:</td></tr>");
		})
		$("table").html(str);
	})
	
	// 发表留言
	$(".header>h3").click(()=>{
		$(".hide").fadeIn();
		$("#btn").click(()=>{
			if($("#author").val()!="" && $("#title").val()!="" && $("content").val() !=""){
				var param=new URLSearchParams();
				param.append("author",$("#author").val());
				param.append("title",$("#title").val());
				param.append("face",$("#face").val());
				param.append("content",$("#content").val());
				console.log(param);
				axios.post("published.php",param).then(res=>{
					if(res.data.status=="10001"){
						alert("恭喜您，发表成功，等待管理员审核");
						$("#author,#title,#content").val("");
						$(".hide").fadeOut();
					}else{
						alert("很遗憾，发表失败，请重新发表");
						$(".hide").fadeOut();
					}
				})
			}else{
				alert("信息不全，不能发布");
			}
		});
	})
	// 头像显示
	let facestr="";
	for(var i=1;i<=42;i++){
		facestr+=`<option value=${i}.gif>${i}.gif</option>`;
		console.log(facestr);
	}
	$("#face").html(facestr).change(function(){
		console.log($(this).val());
		$("#pic").attr("src",`img/face/${$(this).val()}`);
	});
	// 记录内容多少字
	$("#content").on("input",function(){
		$("p span").html($(this).val().length);
	})
	
	//取消发布留言
	$("#quit").click(()=>{
		$(".hide").fadeOut();
	})
	
	
	var recount=0;//设置总的记录数
	var repage=1;  //设置总的页数
	axios.get("recount.php").then(res=>{
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
				axios.post("message.php",param3).then(res=>{
					var data=res.data.data;
					console.log(res.data.data);
					var str;
					$.each(data,(index,value)=>{
						str+=`<tr data-id=${value.messageId}><td><img src=img/face/${value.face}> 昵称:${value.author} 在 ${value.addTime} 发表: </td></tr>`+`<tr data-id=${value.messageId}><td> 主题:${value.title}</td></tr>`+`<tr data-id=${value.messageId}><td>内容:${value.content}</td></tr>`+(value.replay!=null?'<tr data-id="'+value.messageId+'"><td class=content>管理员回复道:'+value.replay+"</td></tr>":"<tr><td class=content>管理员回复道:</td></tr>");
					})
					$("table").html(str);
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
				axios.post("message.php",param3).then(res=>{
					var data=res.data.data;
					console.log(res.data.data);
					var str;
					$.each(data,(index,value)=>{
						str+=`<tr data-id=${value.messageId}><td><img src=img/face/${value.face}> 昵称:${value.author} 在 ${value.addTime} 发表: </td></tr>`+`<tr data-id=${value.messageId}><td> 主题:${value.title}</td></tr>`+`<tr data-id=${value.messageId}><td>内容:${value.content}</td></tr>`+(value.replay!=null?'<tr data-id="'+value.messageId+'"><td class=content>管理员回复道:'+value.replay+"</td></tr>":"<tr><td class=content>管理员回复道:</td></tr>");
					})
					$("table").html(str);
				})
			}
		}
	})
	
})