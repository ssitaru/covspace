<?php
$templates = new League\Plates\Engine('templates');

$dbClient = new MongoDB\Client("mongodb://localhost:27017");
