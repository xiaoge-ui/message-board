<?php
	header("content-type:text/html;charset=utf-8");
	if($_SERVER['REQUEST_METHOD']=="POST"){
		$userName=@$_POST['userName'];
		include("../conn.php");
		$rs=mysql_query("select userName from admin where userName='$userName'");
		$num=mysql_num_rows($rs);
		if($num>0){
			echo '{"status":"30003","msg":"用户名已占用"}';
		}else{
			echo '{"status":"30004","msg":"已通过"}';
		}
	}else{
		header("location:../error.html");
	}
?>