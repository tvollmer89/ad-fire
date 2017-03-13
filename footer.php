  <footer>
    <div class="col-md-12">
    <div id="foot-wrap" class="row">
      <div id="foot1" class="col-sm-6 col-md-4">
        <p>Copyright 2016 A/D Fire Protection Systems</p>
      </div>
      <div id="foot2" class="col-md-4">
        <ul>
          <li class="bottom-li">
            <a href="/" class="bottom-a">AD Fire</a>
          </li>
          <li> | </li>
          <li class="bottom-li">
            <a href="contact-us.html" class="bottom-a">Contact Us</a>
          </li>
          <li> | </li>
          <li class="bottom-li">
            <a href="privacy-policy.html" class="bottom-a">Privacy Policy</a>
          </li>
          <li> | </li>
          <li class="bottom-li">
            <a href="terms.html" class="bottom-a">Terms of Use</a>
          </li>
        </ul>
      </div>
      <div id="foot3" class="col-sm-6 col-md-4">
        <p>
          A/D Fire Protection Systems is part of the Carboline Company.
        </p>
      </div>
    </div>
  </div>
  </footer>


  <script src="scripts/tabcordion.min.js"></script>
  <script src="scripts/bootstrap.min.js"></script>
  <script type="text/javascript" src="scripts/jquery.mmenu.min.all.js"></script>
  <script type="text/javascript">
    $(function() {
      $('nav#menu').mmenu();
    });
  </script>

  <script type="text/javascript">
  $(document).ready(function() {

    $("#menu").mmenu({
     // options
    }, {
     // configuration
     offCanvas: {
      pageNodetype: "section",
      position:"right"
     }

   }); //mmenu close
   var api = $("#menu").data( "mmenu" );

    window.onresize = function closeMenu(e) {

       var windowWidth = window.innerWidth;
       if(windowWidth > 800)
        {

          api.close();

        }
     } // end window resize

  });
  </script>

</body>
</html>