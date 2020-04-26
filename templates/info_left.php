<style type="text/css">
#infobox_left_container {
  margin-left: 10px;
  position: absolute;
}

#infobox_left_close {
  position: absolute;
  cursor: pointer;
  right: 15px;
  top: 5px;
}

#infobox_left_close i {
  scale: 0.8;
}

#infobox_left {
  background-color: #fff;
  border: 2px solid #fff;
  text-align: left;

  padding: 15px;

  margin-right: 10px;
  font-size: 16px;

  border: 1px #aaa solid;

  height: 60%;
}

#infobox_left_head {
  font-size: 22px;
  text-align: center;
}

.infobox_left_item {
  margin-top: 10px;
  margin-bottom: 3px;
}

.infobox_left_subitem {
  padding-left: 10px;
}
</style>

<?php
$db = $dbClient->covspace;
$rq_dataSource = $_REQUEST["dataSource"];
$rq_countryId = $_REQUEST["countryId"];

$country = $db->countries->findOne(['_id'=> new \MongoDB\BSON\ObjectId($rq_countryId)]);
//$ds = $db->datasources->findOne([ 'id' => $rq_dataSource ]);
$dss = $db->datasources->find()->toArray();
?>

<div id="infobox_left_close"><i class="material-icons">close</i></div>
  <div id="infobox_left">
    <div id="infobox_left_head"><?=$country['country_name']?></div>
<?php
    foreach($dss as $ds)
    {
      echo '<div class="infobox_left_item">Data Source: '.$ds["name_en"];

      $dsId = $ds['id'];
      $entry = $db->$dsId->findOne([ 'country_id' => new MongoDB\BSON\ObjectId($rq_countryId) ]);
      echo "<div>Date: ".$entry["date"]->toDateTime()->format('Y-m-d')."</div>";
      if($entry != null)
      {
        echo "<ul>";
        foreach($ds["data_entities"] as $de)
        {
          $globalDe = $db->data_entities->findOne([ '_id' => $de['entity_id'], 'active' => true ]);
          if($globalDe != null)
          {
            echo "<li>".$globalDe['id']." (".$de["this_id"]."): ".$entry[$de["this_id"]]."</li>";
          }

        }
        echo "</ul></div>";
      } else {
        echo "no data";
      }
    }
      ?>
  <div class="infobox_left_item">Data Source: CCCSL
    <div>Date: whatever </div>
    <div>Intervention Measures</div>
  </div>
  </div>
