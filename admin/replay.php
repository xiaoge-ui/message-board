<?php
	header("content-type:text/html;charset=utf-8");
	if($_SERVER['REQUEST_METHOD']=="POST"){
		$jwt=$_SERVER['HTTP_TOKEN'];
		require 'va.php';
		if(va($jwt)=="success"){
			$messageId=@$_POST['messageId'];
			$replay=@$_POST['replay'];
			include("../conn.php");
			$flag=mysql_query("update message set replay='$replay' where messageId='$messageId'");
			if($flag>0){
				echo '{"status":"60001","msg":"success"}';
			}else{
				echo '{"status":"60002","msg":"failed"}';
			}
		}
	}else{
		header("../error.html");
	}
?>