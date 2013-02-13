<?php 

$games_db = "games2012fall_test";
$coaches_db = "coaches";

//common_db.inc
$dbhost = '127.0.0.1';
$dbusername = 'root';
$dbpassword = '';
$default_dbname = 'ayso';

function sql_error($db) {
	global $MYSQL_ERRNO, $MYSQL_ERROR;

	return $db->errno . ": " . $db->error;
}

?>