<?php

require_once 'abstractPage.php';

class dataLevel extends abstractPage {

  public function init($serverURL) {
    parent::init($serverURL);
  } // init


  public function createPage() {
    if(file_exists('data/001.json')) {
	    $filename = 'data/001.json';
	    $data = file_get_contents($filename);
    	$this->data = json_decode($data);
  } else {
    $this->data = [];
  }
  } // createPage

  
  public function showPage() {
		header ("Content-type: application/json");
		header ('X-SendFile: 001.json');
    echo json_encode($this->data, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
  } // showPage

} // dataLevel
