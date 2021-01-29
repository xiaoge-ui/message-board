<?php
	header("content-type:text/html;charset=utf-8");
	if($_SERVER['REQUEST_METHOD']=="POST"){
		$jwt=@$_SERVER['HTTP_TOKEN'];
		require 'va.php';
		if(va($jwt)=="success"){
			$messageId=@$_POST['messageId'];
			include("../conn.php");
			$flag=mysql_query("update message set flag=1 where messageId='$messageId'");
			if($flag>0){
				echo '{"status":"40001","msg":"success"}';
			}else{
				echo '{"status":"40002","msg":"很遗憾，审核状态无法修改！！！"}';
			}
		}
	}else{
		header("location:../error.html");
	}
?>