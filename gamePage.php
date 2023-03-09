<?php

require_once 'abstractPage.php';

class gamePage extends abstractPage {

  public function init($serverURL) {
    parent::init($serverURL);
  } // init

  
  public function createPage() {
    $scriptsVersion = md5(time());

    $this->data[] = '<!DOCTYPE html>';
    $this->data[] = '<html lang="cs">';
    $this->data[] = '  <head>';
    $this->data[] = '    <title>Hero Willy</title>';
    $this->data[] = '    <meta name="description" lang="cs" content="Hero Willy">';
    $this->data[] = '    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, viewport-fit=cover">';
    $this->data[] = '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
    $this->data[] = '    <meta name="robots" content="noindex, nofollow">';
    $this->data[] = '    <meta name="mobile-web-app-capable" content="yes">';
    $this->data[] = '    <link rel="shortcut icon" sizes="256x256" href="images/app-icon-256x256.png" id="app-icon">';
    $this->data[] = '    <link rel="apple-touch-icon" sizes="192x192" href="images/app-icon-192x192.png">';
    $this->data[] = '    <meta name="theme-color" content="#666">';
    $this->data[] = '    <link rel="manifest" href="'.$this->serverURL.'manifest.webmanifest">';
    $this->data[] = '    <meta http-equiv="X-UA-Compatible" content="IE=Edge; IE=11;" />';
    $this->data[] = '    <link rel="stylesheet" type="text/css" href="css/main.css?ver='.$scriptsVersion.'">';
    $this->data[] = '    <link rel="preload" as="image" href="images/willy-jetpac.png">';
    $this->data[] = '    <link rel="preload" as="image" href="images/willy-car.png">';
    $this->data[] = '    <link rel="preload" as="image" href="images/willy-plane.png">';
    $this->data[] = '  </head>';
    $this->data[] = '  <body>';
    $this->data[] = '    <div id="canvas" class="canvas"></div>';
    $this->data[] = '    <script>srcVersion = "'.$scriptsVersion.'";</script>';
    $this->data[] = '    <script type="module" src="js/main.js?ver='.$scriptsVersion.'";></script>';
    $this->data[] = '  </body>';
    $this->data[] = '</html>';
  } // createPage


  public function showPage() {
    foreach ($this->data as $line) {
      echo $line."\n";
    }
  } // showPage

} // gamePage
