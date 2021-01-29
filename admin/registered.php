<?php
	header("content-type:text/html;charset=utf-8");
	if($_SERVER['REQUEST_METHOD']=="POST"){
		$userName=@$_POST['userName'];
		$userPwd=@md5($_POST['userPwd']);
		include("../conn.php");
		$rs=mysql_query("insert into admin(userName,userPwd,addTime) values('$userName','$userPwd',now())");
		if($rs>0){
			echo '{"status":"30001","msg":"success"}';
		}else{
			echo '{"status":"30002","msg":"failed"}';
		}
	}else{
		header("location:../error.html");
	}
?>