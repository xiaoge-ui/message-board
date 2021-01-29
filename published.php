<?php
header("content-type:text/html;charset=utf-8");
	if($_SERVER['REQUEST_METHOD']=="POST"){
		$author=@$_POST['author'];
		$title=@$_POST['title'];
		$content=@$_POST['content'];
		$face=@$_POST['face'];
		include("conn.php");
		$rs=mysql_query("insert into message(author,title,content,face,addTime)values('$author','$title','$content','$face',now())");
		if($rs>0){
			echo '{"status":"10001","msg":"success"}';
		}else{
			echo '{"status":"20001","msg":"failed"}';
		}
	}else{
		header("location:error.html");
	}
?>