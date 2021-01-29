$(()=>{
	var jwt=localStorage.getItem("jwt");
	console.log(jwt);
	if(jwt){
		axios.defaults.headers.common['token']=jwt;
		axios.get("login.php").then(res=>{
			location.href="index.html";
		})
	}
	$("#btn").click(()=>{
		if($("#userName").val()!="" && $("#userPwd").val()!=""){
			var params=new URLSearchParams();
			params.append("userName",$("#userName").val());
			params.append("userPwd",$("#userPwd").val());
			console.log(params);
			axios.post("login.php?action=login",params).then(res=>{
				if(res.data.result=="success"){
					console.log(res.data);
					localStorage.setItem('jwt',res.data.jwt);
					axios.defaults.headers.common['token']=res.data.jwt;
					location.href="index.html";
				}else{
					$("#tips").html(res.data.msg);
				}
			}).catch(e=>{
				console.log(e.message);
			})
		}else{
			alert("信息不能为空");
		}
	})
})