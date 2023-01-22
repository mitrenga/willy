<?php

class abstractPage {

  var $serverURL;
  var $data = [];

  public function init($serverURL) {
    $this->serverURL = $serverURL;
  } // init


  public function createPage() {
  } // createPage


  public function showPage() {
  } // showPage

} // abstractPage
