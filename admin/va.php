<?php
	header("content-type:text/html;charset=utf-8");
	date_default_timezone_set('PRC');
	require '../JWT.php';
	use \Firebase\JWT\JWT;
	define("KEY","1hgrsd45we12gr5sv5h5r4he1eger3v");
	function va($jwt){
		$res['result'] = 'failed';//定义result初始值
		if(empty($jwt)){
			$res['msg']="非法登录";
			return $res['result'];
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
		return $res['result'];
	}
?>