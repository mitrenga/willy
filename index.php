<!DOCTYPE html>
<html>
  <head>
    <title>Hero Willy</title>
    <link rel="stylesheet" type="text/css" href="css/main.css?ver=<?php echo md5(time()); ?>">
    <link rel="preload" as="image" href="images/willy-jetpac.png">
    <link rel="preload" as="image" href="images/willy-car.png">
    <link rel="preload" as="image" href="images/willy-plane.png">
  </head>
  <body>
    <div id="canvas" class="canvas"></div>
    <script>srcVersion = "<?php echo md5(time()); ?>";</script> 
    <script type="module" src="js/main.js?ver=<?php echo md5(time()); ?>"></script> 
  </body>
</html>
