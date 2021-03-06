<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="description" content="AD Fire Home Page" />

    <!-- jQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <!-- Datatables -->
  <script type="text/javascript" src="https://cdn.datatables.net/v/dt/jq-2.2.3/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.12/b-1.2.2/b-html5-1.2.2/b-print-1.2.2/r-2.1.0/sc-1.4.2/se-1.2.0/datatables.min.js"></script>

  <!-- MMenu Styles -->
  <link type="text/css" rel="stylesheet" href="css/jquery.mmenu.all.css" />
  <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jQuery.mmenu/5.7.0/extensions/positioning/jquery.mmenu.positioning.min.css" />
  <!-- Stylesheets -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/jq-2.2.3/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.12/b-1.2.2/b-html5-1.2.2/b-print-1.2.2/r-2.1.0/sc-1.4.2/se-1.2.0/datatables.min.css"/>

    <link rel="stylesheet" type="text/css" href="css/system-search.css" />
    <link rel="stylesheet" href="css/main-min.css" />
  <link rel="stylesheet" type="text/css" media="only screen and (min-width:801px) and (max-width:1100px), only screen and (max-device-width: 1100px)" href="css/newTablet.css" />
  <link rel="stylesheet" type="text/css" media="only screen and (max-width:800px), only screen and (max-device-width: 800px)" href="css/phone.css" />

  <link rel="stylesheet" type="text/css" href="fonts/MyFontsWebfontsKit/MyFontsWebfontsKit.css">
  <!-- <link rel="stylesheet" type="text/css" href="css/vollmer.css"/> -->
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body>
<div id="header">
  <div class="wrapper">
    <!-- Mobile Nav -->
    <a id="themenu" href="#menu"><i class="fa fa-bars" aria-hidden="true"></i></a>
    <nav id="menu">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="products.php">Products</a></li>
        <li><a href="projects.php">Projects</a></li>
        <li><a href="links.php">Links</a></li>
        <li><a href="contact-us.php">Contact Us</a></li>
      </ul>
    </nav>
    <!-- LogoTitle -->
    <div id="nav1">
      <div class="logo-div">
        <a href="/"><img src="images/ad-fire-logo-white.svg" class="logo-text-img" /></a>
      </div>
    </div>
    <!-- News, Contact, Search -->
    <div id="nav2">
      <div class="menu">
        <div id="form">
          <input type="search" id="searchBox" placeholder="Search AD Fire" />
          <span><i class="fa fa-search" id="m-glass"></i></span>
        </div>
        <ul class="news-contact">
          <li class="top-li"><a href="contact-us/">Contact Us</a></li>
        </ul>
      </div>
      <!-- Main Nav -->
      <div class="menu">
        <ul>
          <li class="main-li"><a href="/">Home</a></li>
          <li class="main-li"><a href="products.php">Products</a></li>
          <li class="main-li"><a href="projects.php">Projects</a></li>
          <li class="main-li"><a href="links.php">Links</a></li>
        </ul>
      </div>
    </div>

  <script type="text/javascript">
    ( function() {
      var open = false;
      $('#m-glass').on('click', function(e) {
      e.preventDefault();
        var searched = $("#searchBox").val();
        if(searched.length > 2)
        {
          window.location.href = "/search-results/?ap-q="+searched;
        }
      });
      $('#searchBox').on('keyup', function(e){
        if(e.keyCode == 13){
          var searched = $("#searchBox").val();
          if(searched.length > 2)
          {
            window.location.href = "/search-results/?ap-q="+searched;
          }
        }
      });
    } () );
  </script>
  </div>
</div>