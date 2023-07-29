<?php

  $protocol = (((isset($_SERVER['HTTPS'])) && ($_SERVER['HTTPS'] == 'on')) ? 'https' : 'http');
  $tmpURL = $protocol.'://'.$_SERVER['SERVER_NAME'].$_SERVER['PHP_SELF'];
  if ($tmpURL[strlen ($tmpURL)-1] == '/')
    $tmpURL = substr($tmpURL, 0, -1);
  $appURL = substr($tmpURL, 0, -strlen('index.php'));

  if ($_SERVER['QUERY_STRING'] === '001.level') {
    require_once 'dataLevel.php';
    $page = new dataLevel();
  } // xxx.level
  elseif ($_SERVER['QUERY_STRING'] === 'manifest.webmanifest') {
    require_once 'manifestPage.php';
    $page = new manifestPage();
  } // manifestPage
  else
  {
    require_once 'gamePage.php';
    $page = new gamePage();
  } // gamePage

  $page->init($appURL);
  $page->createPage();
  $page->showPage();
