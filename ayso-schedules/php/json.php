<?php
//Connect to MySQL
require_once("dbase.php");
$mysqli = new mysqli($dbhost, $dbusername, $dbpassword);

if ($mysqli->connect_errno) {
	$json_array['Error'] = "Failed to connect to MySQL: " . $mysqli->connect_error;
	$json_array["Version"] = "0000-00-00"; //Set to bad date on Error
	$json_array["Games"] = [];
	$json_array["Coaches"] = [];
	
	echo json_encode($json_array);
	exit();
}

$mysqli->select_db("ayso");

//SQL function
function sql_to_array($sql) {
	global $mysqli;
	$result = $mysqli->query($sql);
	
	//Pass through error for 
	if(!$result) return [ "error" => sql_error($mysqli) ];
	
	return $result->fetch_all(MYSQLI_ASSOC);
}

//Setup version check
if(isset($_REQUEST['lastUpdate'])) {
	$timestamp = strtotime($_REQUEST['lastUpdate']);
	if($timestamp) $lastUpdate = date("Y-m-d",$timestamp);
		else $lastUpdate = "0000-00-00";
} else {
	//Default to lowest possible to include all results
	$lastUpdate = "0000-00-00";
}



//Setup JSON Array
$json_array["Version"] = date('Y-m-d');
$json_array["Error"] = "";

$json_array["Games"] = sql_to_array(
	"SELECT ID, Week, Jour, Heur, Divis, Away, Home, Field FROM $games_db
		WHERE Field <> 'Delete' AND (Home <> '-' OR Away <> '-')
		AND LastRev > '$lastUpdate';");

if($lastUpdate == "0000-00-00") {
	$json_array["Coaches"] = sql_to_array(
		"SELECT ID, Divis, TeamNo, Coach, Phone FROM $coaches_db
			WHERE TRIM(TeamNo) <> '-';");
} else {
	$json_array["Coaches"] = [];
}

if(isset($_GET['pretty'])) {
	echo '<pre>';
	echo json_encode($json_array, JSON_PRETTY_PRINT);
	echo '</pre>';
} else echo json_encode($json_array);
?>