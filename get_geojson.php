<?php
error_reporting(E_ALL);

header('Content-type: text/json');

require 'vendor/autoload.php';
require '_include.php';

$req = array('error' => true, 'msg' => '', 'data' => '');

try
{
	$db = $dbClient->covspace;
	$rq_dataSource = $_REQUEST["dataSource"];
	$rq_dataEntity = $_REQUEST["dataEntity"];
	$col = $db->$rq_dataSource;
	$dataObj = array('type' => 'FeatureCollection', 'features' => '');
	$featuresObj = array();

	$entity = $db->data_entities->findOne(['id' => $rq_dataEntity]);
	$dataSource = $db->datasources->findOne(['id' => $rq_dataSource]);
	$entityKey = '';
	foreach($dataSource['data_entities'] as $de)
	{
		if($entity['_id'] == $de['entity_id'])
		{
			$entityKey = $de['this_id'];
		}
	}

	/*$dStart = new DateTime('2020-04-24T00:00:00.000Z');
	$dEnd = new DateTime('2020-04-25T00:00:00.000Z');
	$data = $col->find(['date' => ['$gte' => $dStart, '$lt' => $dEnd]]);*/
	$data = $col->find();
	foreach($data as $entry)
	{
		$feature = array('id' => $entry['_id']->__toString(), 'type' => 'Feature');
		$feature['properties'] = array('dataSource' => $rq_dataSource, 'countryId' => $entry['country_id']->__toString(), $rq_dataEntity => $entry[$entityKey]);
		$country = $db->countries->findOne( [ '_id' => $entry['country_id'] ] );
		$feature['geometry'] = array('type' => 'Point', 'coordinates' => array($country['lng'], $country['lat']));
		array_push($featuresObj, $feature);
	}
	$dataObj['features'] = $featuresObj;
	$req['data'] = $dataObj;
	$req['error'] = false;
}
catch(Throwable $t)
{
	$req['msg'] = $t->__toString();
}



echo json_encode($req);
