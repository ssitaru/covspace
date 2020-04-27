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
  margin-bottom: 20px;
}

.infobox_left_item summary {
  font-weight: bold;
}
.infobox_left_item summary:hover {
  cursor: pointer;
}

.infobox_left_item ul {
  margin-top: 8px;
}

.infobox_left_subitem {
  padding-left: 10px;
}

.infobox_left_date {
  font-style: italic;
  margin-left: 1em;
}
</style>

<?php
$db = $dbClient->covspace;
$rq_dataSource = $_REQUEST["dataSource"];
$rq_countryId = $_REQUEST["countryId"];

$country = $db->countries->findOne(['_id'=> new \MongoDB\BSON\ObjectId($rq_countryId)]);
//$ds = $db->datasources->findOne([ 'id' => $rq_dataSource ]);
$dss = $db->datasources->find()->toArray();
$interventions = $db->interventions->find([ 'country_id' => new MongoDB\BSON\ObjectId($rq_countryId) ])->toArray();
$icons = $db->intervention_icons->find()->toArray();
?>

<div id="infobox_left_close"><i class="material-icons">close</i></div>
  <div id="infobox_left">
    <div id="infobox_left_head"><?=$country['country_name']?></div>
<?php
    foreach($dss as $ds)
    {
      echo '<details class="infobox_left_item"><summary>Data Source: '.$ds["name_en"].'</summary>';

      $dsId = $ds['id'];
      $entry = $db->$dsId->findOne([ 'country_id' => new MongoDB\BSON\ObjectId($rq_countryId) ]);
      if($entry["date"] != null)
      {
        echo '<div class="infobox_left_date">Date: '.$entry["date"]->toDateTime()->format('Y-m-d').'</div>';
      }
      if($entry != null)
      {
        echo "<ul>";
        foreach($ds["data_entities"] as $de)
        {
          $globalDe = $db->data_entities->findOne([ '_id' => $de['entity_id'], 'show_in_detail' => true ]);
          if(($globalDe != null) && ($entry[$de["this_id"]] != -1))
          {
            echo "<li>".$globalDe['name_en'].': <span class="db_data" data-type="'.$de['type'].'">'.$entry[$de["this_id"]]."</span></li>";
          }

        }
        echo "</ul></details>";
      } else {
        echo "<div>no data</div></details>";
      }
    }
      ?>
  <div class="infobox_left_item">Data Source: CCCSL
    <div>Date: whatever </div>
    <div>Intervention Measures</div>
  </div>
  </div>
