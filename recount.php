<?php
	header("content-type:text/html;charset=utf-8");
	include("conn.php");
	$rs=mysql_query("select * from message");
	$num=mysql_num_rows($rs);
	if($num>0){
		echo '{"status":"10001","recount":'.$num.'}';
	}else{
		echo '{"status":"20001","msg":"failed"}';
	}
?>