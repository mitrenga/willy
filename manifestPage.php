<?php

require_once 'abstractPage.php';

class manifestPage extends abstractPage {

  public function init($serverURL) {
    parent::init($serverURL);
  } // init


  public function createPage() {
    $this->data['name'] = 'Hero Willy';
    $this->data['short_name'] = 'Hero Willy';
    $this->data['start_url'] = $this->serverURL;
    $this->data['display'] = 'standalone';
    $this->data['background_color'] = '#666';
    $this->data['theme_color'] = '#666';
    $this->data['scope'] = '/';
    $this->data['icons'] = [];
    foreach (['192', '512', '1024', '1980'] as $dimension) {
      $icon = [];
      $icon['src'] = $this->serverURL.'images/app-icon-'.$dimension.'x'.$dimension.'.png';
      $icon['sizes'] = $dimension.'x'.$dimension;
      $icon['type'] = 'image/png';
      $icon['purpose'] = 'any maskable';
      $this->data['icons'][] = $icon;
    }
    $icon = [];
    $icon['src'] = $this->serverURL.'images/app-icon.svg';
    $icon['type'] = 'image/svg+xml';
    $icon['purpose'] = 'any maskable';
    $this->data['icons'][] = $icon;
  } // createPage

  
  public function showPage() {
		header ("Content-type: application/manifest+json");
		header ('X-SendFile: manifest.webmanifest');
    echo json_encode($this->data, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
  } // showPage

} // manifestPage
