<?php
    namespace App\Front;


define('LARAVEL_START', microtime(true));

require __DIR__.'/../vendor/autoload.php';

use App\Models\AdditionInfo;
use Illuminate\Foundation\Http\Kernel;
use Illuminate\Http\Request;

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$kernel->handle(
    $request = Request::capture()
);



$addInfos = AdditionInfo::where('name', 'like', 'site_%')->get();

$title = $addInfos->where('name', 'site_title')->isNotEmpty() ? $addInfos->where('name', 'site_title')->first()->value : null;
$description = $addInfos->where('name', 'site_description')->isNotEmpty() ? $addInfos->where('name', 'site_description')->first()->value : null;
$keywords = $addInfos->where('name', 'site_keywords')->isNotEmpty() ? $addInfos->where('name', 'site_keywords')->first()->value : null;
?>
<!DOCTYPE html>
<!--[if lt IE 7]>
<html lang="en" ng-app="app" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>
<html lang="en" ng-app="app" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>
<html lang="en" ng-app="app" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en" ng-app="app" class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title><?php echo $title ?></title>
    <meta name="description" content="<?php echo $description ?>">
    <meta name="keywords" content="<?php echo $keywords ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

    <!--<link rel="shortcut icon" href="./content/images/cropped-dot-32x32.png" type="image/x-icon">-->
    <!--<link rel="icon" href="./content/images/cropped-dot-32x32.png" type="image/x-icon">-->

    <!-- inject-vendor:css -->
    <link rel="stylesheet" href="content/css/vendor.min.css?v=1541701506109">
    <!-- endinject -->

    <!-- inject:css -->
    <link rel="stylesheet" href="content/css/all.min.css?v=1541701506115">
    <!-- endinject -->

    <!--<link rel="manifest" href="/manifest.json">-->
</head>

<body>
<!--<div ui-view></div>-->

<div ng-include="'layout/shell/shell.html'"
     style="height: 100%; min-height: 100%; max-width: 100%;">
</div>

<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js"></script>-->
<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyD6o8M_KOerds2uacnudjI62elbLTMyBaY"></script>
<script src="https://www.gstatic.com/firebasejs/5.3.1/firebase.js"></script>
<!-- inject-vendor:js -->
<script src="vendor.min.js?v=1541701506119"></script>
<!-- endinject -->

<!-- inject:js -->
<script src="all.min.js?v=1541701506122"></script>
<!-- endinject -->

<!-- inject-templates:js -->
<script src="templates.js?v=1541701506125"></script>
<!-- endinject -->
</body>
</html>
