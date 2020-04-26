<style type="text/css">
#layer_selector_box {
  background-color: #fff;
  border: 2px solid #fff;
  margin-bottom: 22px;
  text-align: center;

  color: rgb(25, 25, 25);
  font-family: Roboto, Arial, sans-serif;
  font-size: 12px;
  line-height: 38px;
  padding-left: 5px;
  padding-right: 5px;
}

#layer_selector_head {
  font-size: 18px;
}

.layer_selector_item {
  cursor: pointer;
  margin-top: 3px;
  margin-bottom: 3px;
}

.layer_selector_item.active {
  border-bottom: 1px solid #f00;
}

.layer_entity_item {
  padding-left: 10px;
}

.layer_entity_item label {
  font-size: 12px !important;
}

.layer_entity_item svg {
  scale: 0.5 !important;
}

#layer_selector_datasource_container
{
  margin-top: 30px;
}
</style>

<div style="display:hidden">
  <div id="layer_selector_box">
    <div id="layer_selector_head">Data</div>
    <div class="layer_selector">
<?php foreach($layers as $l): ?>
    <div id="select-<?=$l["id"]?>" data-value="<?=$l["id"]?>" class="layer_selector_item"><?=$l["name_en"]?></div>
<?php endforeach; ?>
    </div>

    <div id="layer_selector_datasource_container">
      <div>Data Source</div>
      <select id="layer_selector_datasource">
        <?php foreach($datasources as $d): ?>
        <option value="<?=$d["id"]?>"><?=$d["name_en"]?></option>
        <?php endforeach; ?>
      </select>
    </div>
  </div>
</div>
