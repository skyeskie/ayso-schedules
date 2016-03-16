<?php
//Connect to MySQL
/**
 * Configuration file not included in Git to avoid including passwords, etc.
 * Required parameters:
 *
 * - $dbhost (host of SQL server)
 * - $dbusername (login for SQL server)
 * - $dbpassword (user password)
 * - $default_dbname (database to select)
 * - $games_db (table with game info)
 * - $coaches_db (table with coach info)
 */
require_once("dbase.php");

//
// Mapping
//

function getRegionNumber($teamNum) {
    $code = substr($teamNum, 0, 1);

    switch($code) {
        case 1: return 49;
        case 2: return 105;
        case 4: return 208;
        case 5: return 253;
        case 6: return 491;
        default: return 0;
    }
}

function mapCoaches($coach) {
    $team = array();
    $team['code'] = $coach['TeamNo'];
    $team['coach'] = $coach['Coach'];
    $team['telephone'] = $coach['Phone'];
    $team['region'] = getRegionNumber($coach['TeamNo']);
    $team['gender'] = $coach['gender'];
    $team['u_age'] = $coach['u_age']*1;
    if($team['u_age'] > 50) {
        if($coach['Divis'] === '7C') {
            $team['u_age'] = 6;
        }
        if($coach['Divis'] === '8C') {
            $team['u_age'] = 5;
        }
    }
    //unset($team['Divis']);
    return $team;
}

//
// Utility functions
//
function sql_error($db) {
    global $MYSQL_ERRNO, $MYSQL_ERROR;

    return $db->errno . ": " . $db->error;
}
function sql_to_array($sql) {
    global $mysqli, $json_array;
    $result = $mysqli->query($sql);

    //Pass through error for
    if(!$result) {
        $json_array['Error'] .= sql_error($mysqli);
        return array();
    }

    $out = array();

    while($row = $result->fetch_array( MYSQLI_ASSOC ) ) {
        $out[] = $row;
    }

    return $out;
}

//
// Main script
//

//Connect to database
$mysqli = new mysqli($dbhost, $dbusername, $dbpassword);
$json_array = array();

if ($mysqli->connect_errno) {
    $json_array['Error'] = "Failed to connect to MySQL: " . $mysqli->connect_error;
    $json_array["Version"] = "0000-00-00"; //Set to bad date on Error
    $json_array["Games"] = array();
    $json_array["Coaches"] = array();

    echo json_encode($json_array);
    exit();
}

$mysqli->select_db($default_dbname);

//Determine version for getting updates
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
$json_array["DataVersion"] = 1.1;
$json_array["Error"] = "";

$json_array["Games"] = sql_to_array(
    "SELECT ID, Week, Jour, Heur, Divis, Away, Home, Field, RefLead, RefAsst1, RefAsst2
        FROM $games_db
        WHERE Field <> 'Delete' AND (Home <> '-' OR Away <> '-')
        AND LastRev > '$lastUpdate';");

if($lastUpdate == "0000-00-00") {
    $json_array["Coaches"] = sql_to_array(
        "SELECT ID, Divis, TeamNo, Coach, Phone FROM $coaches_db
            WHERE TRIM(TeamNo) <> '-';");

    //Hardcoded week starts -- put on Tuesday (midnight) for flip to next week
    $json_array["Weeks"] = array(
        '2016-03-08', '2016-03-15', '2016-03-22', '2016-03-29',
        '2016-04-05', '2016-04-12', '2016-04-19', '2016-04-26',
    );

//New format with gender and division separate
//    $res = sql_to_array("SELECT TeamNo, Divis, Coach, Phone,
//                                SUBSTRING(UTeamNo FROM 2 FOR 2) as u_age,
//                                SUBSTRING(UTeamNo FROM 4 FOR 1) as gender
//                         FROM $coaches_db WHERE TRIM(TeamNo) <> '-';");
//
//    $json_array["Teams"] = array_map("mapCoaches", $res);
} else {
    $json_array["Coaches"] = array();
    $json_array["Teams"] = array();
    $json_array["Weeks"] = null;
}

//Emit JSON. Optional pretty print for manual viewing
if(isset($_GET['pretty']) && version_compare(phpversion(), "5.4.0", ">")) {
    echo '<pre>';
    echo json_encode($json_array, constant('JSON_PRETTY_PRINT'));
    echo '</pre>';
} else echo json_encode($json_array);
?>
