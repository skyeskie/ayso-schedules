<?php
require_once("dbase.php");
$mysqli = new mysqli($dbhost, $dbusername, $dbpassword);

$json_array["Version"] = date('Y-m-d');
$json_array["Error"] = "";

if ($mysqli->connect_errno) {
	$json_array['Error'] = "Failed to connect to MySQL: " . $mysqli->connect_error;
	
	echo json_encode($json_array);
	exit();
}

$mysqli->select_db("ayso");

function sql_to_array($sql) {
	global $mysqli;
	$result = $mysqli->query($sql);
	
	//Pass through error for 
	if(!$result) return [ "error" => sql_error($mysqli) ];
	
	return $result->fetch_all(MYSQLI_ASSOC);
}

$json_array["Games"] = sql_to_array(
	"SELECT ID, Week, Jour, Heur, Divis, Away, Home, Field FROM $games_db
		WHERE Field <> 'Delete' OR (Home <> '-' AND Away <> '-');");

$json_array["Coaches"] = sql_to_array(
	"SELECT ID, Divis, TeamNo, Coach, Phone FROM $coaches_db
		WHERE TRIM(TeamNo) <> '-';");

if(isset($_GET['pretty'])) {
	echo '<pre>';
	echo json_encode($json_array, JSON_PRETTY_PRINT);
	echo '</pre>';
} else echo json_encode($json_array);
?>