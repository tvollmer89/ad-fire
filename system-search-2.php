<?php include("header.html"); ?>
  <script type="text/javascript" src="scripts/tree.js"></script>
  <div id="mainImage">
    <img src="images/header-1.jpg" class="bg-img2">
  </div>
 <div id="content">
  <div class="content-inner container">
    <div class="col-md-12">
      <h2>Firestop Systems</h2>
      <div class="row">
        <div id="filters" class="col-md-4">
          <!-- Text Search -->
          <div class="row">
            <div class="col-sm-8 search-filter">
              <label>
                <input id="tableSearch" type="text" class="form-control" placeholder="Search Designs">
              </label>
            </div>
            <div class="col-sm-4 clear-filter">
              <a id="clear-all" href="#" class="pull-right">Clear All</a>
            </div>
          </div>
          <div class="row">
            <div id="tree"></div>
          </div>
        </div>
        <!-- Table -->
        <div id="designs" class="col-md-8">
          <table id="systems" class="display table table-striped table-bordered" cellspacing="0" width="100%">
            <thead>
              <tr>
                  <th>Design Number</th>
                  <th>Testing Authority</th>
                  <th>System Type</th>
                  <th>Joint Type</th>
                  <th>Joint Conditions</th>
                  <th>Max Joint Width (mm)</th>
                  <th>Penetration Types</th>
                  <th>Max Size Penetrant (mm)</th>
                  <th>Application Method</th>
                  <th>Movement Capabilities (%)</th>
                  <th>F Rating (h)</th>
                  <th>T Rating (h)</th>
                  <th>Trade</th>
                  <th>Minimum Annular Space</th>
                  <th>Maximum Annular Space</th>
                  <th>Sleeve</th>
                  <th>Insulation Type</th>
                  <th>L Rating</th>
                  <th>Mold &amp; Mildew Resistance</th>
                  <th>Seismic Performance</th>
                  <th>Water Rating</th>
                  <th>STC Rating</th>
                  <th>Products</th>
                  <th>PDF Download</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<?php include("footer.php"); ?>