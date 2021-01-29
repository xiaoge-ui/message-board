$(()=>{
	//用户名验证
		//当失去焦点，验证用户名是否被占用
	$("#userName").blur(()=>{
		if($("#userName").val()!=""){
			var params=new URLSearchParams();
			params.append("userName",$("#userName").val());
			axios.post("userName.php",params).then(res=>{
				if(res.data.status=="30004"){
					$("#userNameTips").html(res.data.msg).css({"color":"#0f5"});
					// 注册验证#btn按钮
					$("#btn").click(()=>{
						if($("#userName").val()!="" && $("#userPwd").val()!="" && $("#userPwd2").val()!="" && $("#userPwd").val()==$("#userPwd2").val()){
							// var params=new URLSearchParams();
							// params.append("userName",$("#userName").val());
							params.append("userPwd",$("#userPwd").val());
							axios.post("registered.php",params).then(res=>{
								console.log(res.data);
								if(res.data.status=="30001"){
									alert("恭喜您，注册成功！");
									location.href="login.html";
								}else{
									alert("很遗憾，注册失败，请重新注册");
								}
							}).catch(e=>{
								console.log(e.message);
							})
						}else{
							alert("信息填写有误，请重新填写！！！");
						}
					})
				}else{
					$("#userNameTips").html(res.data.msg).css({"color":"#f50"});
				}
			}).catch(e=>{
				console.log(e.message);
			})
		}
	})
	
	// 密码不允许有空格,有空格,密码不能使用
		//没有空格，通过，可以使用
		$("#userPwd").blur(()=>{
			if($("#userPwd").val()!=""){
				var password=$.trim($("#userPwd").val());
				if(password!=$("#userPwd").val()){
					$("#userPwdTips").html("不能包含空格").css({"color":"#f50"});
				}else{
					$("#userPwdTips").html("已通过").css({"color":"#0f5"});
				}
			}
		})
		
		// 判断两次密码输入是否一致
		$("#userPwd2").blur(()=>{
			if($("#userPwd2").val()!=""){
				if($("#userPwd").val()==$("#userPwd2").val()){
					$("#userPwd2Tips").html("两次密码输入一致").css({"color":"#0f5"});
				}else{
					$("#userPwd2Tips").html("两次密码输入不一致").css({"color":"#f50"});
				}
			}
		})
	// 当用户名/密码/确认密码获得焦点时,提示信息消失
	$("#userName").focus(()=>{
		$("#userNameTips").html("*").css({"color":"#333"});
	})
	$("#userPwd").focus(()=>{
		$("#userPwdTips").html("*").css({"color":"#333"});
	})
	$("#userPwd2").focus(()=>{
		$("#userPwd2Tips").html("*").css({"color":"#333"});
	})
})