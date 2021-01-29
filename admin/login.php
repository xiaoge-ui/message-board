<?php
	header("content-type:text/html;charset=utf-8");
	date_default_timezone_set('PRC');
	require '../JWT.php';
	use \Firebase\JWT\JWT;
	define("KEY","1hgrsd45we12gr5sv5h5r4he1eger3v");
	$res['result']="failed";
	$action=@$_GET['action'];
	//判断是否为登录操作
	if($action=="login"){
		if($_SERVER['REQUEST_METHOD']=="POST"){
			$userName=@$_POST['userName'];
			$userPwd=@md5($_POST['userPwd']);
			include("../conn.php");
			$rs=mysql_query("select * from admin where userName='$userName' and userPwd='$userPwd'");
			$num=mysql_num_rows($rs);
			if($num>0){
				//获得当前时间戳
				$nowtime=time();
				// 创建token
				$token=[
					'iss'=>"http://localhost",
					'aud'=>"http://localhost",
					'iat'=>$nowtime,
					'nbf'=>$nowtime+0,
					'exp'=>$nowtime+1200,
					'data'=>[
						'userId'=>1,
						'userName'=>$userName,
					]
				];
				// 创建JWT
				$jwt=JWT::encode($token,KEY);
				$res['result']="success";
				$res['jwt']=$jwt;
			}else{
				// 用户名或密码不正确
				$res['msg']="用户名或密码错误";
			}
			mysql_free_result($rs);
			mysql_close($conn);
		}
		echo json_encode($res);
	}else{
		// 非登录操作
		//验证请求头，token为空报错，非法登录
		$jwt=@$_SERVER['HTTP_TOKEN'];
		if(empty($jwt)){
			$res['msg']="非法登录";
			echo json_encode($res);
			exit;
		}
		try{
			JWT:$leeway=60;
			$decoded=JWT::decode($jwt,KEY,['HS256']);
			$arr=(array)$decoded;
			if($arr['exp']<time()){
				$res['msg']="请重新登录";
			}else{
				$res['result']="success";
				$res['info']=$arr;
			}
		}catch(Exception $e){
			$res['msg']="Token验证失败，请重新登录";
		}
		echo json_encode($res);
	}
?>