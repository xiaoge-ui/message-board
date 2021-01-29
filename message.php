<?php
	header("content-type:text/html;charset=utf-8");
	if($_SERVER['REQUEST_METHOD']=="POST"){
		$page=@$_POST['page'];
		include("conn.php");
		$json='{"status":"10001","msg":"success","page":'.$page.',"data":[';
		$rs=mysql_query('select * from message where flag=1 order by addTime desc limit '.(($page-1)*5).',5');
		$num=mysql_num_rows($rs);
		if($num>0){
			while($info=mysql_fetch_assoc($rs)){
				$json.=json_encode($info).',';
			}
			echo substr($json,0,-1).']}';
		}else{
			echo '{"status":"20001","msg":"failed"}';
		}
	}else{
		header("location:error.html");
	}
?>