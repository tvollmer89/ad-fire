<?php
  require ("header.php");
  $json_file = file_get_contents('json/filters.json');
  $jfo = json_decode($json_file);
  $filters = $jfo->filters;
  $name = 4;
?>

 <div id="content">
  <div class="content-inner container">
    <div class="col-md-12">
      <h2>Firestop Systems</h2>
      <div class="row">
        <div id="filters" class="col-xs-12 col-md-4">
          <!-- Text Search -->
          <div class="row">
            <div class="col-xs-12 col-md-7 search-filter">
              <label>
                <input id="tableSearch" type="text" class="form-control" placeholder="SEARCH DESIGNS">
              </label>
            </div>
            <div id="mobile-filter" class="col-xs-7">
              <a data-toggle="collapse" href="#system-filters" aria-expanded="false">Show Filters</a>
            </div>
            <div class="col-xs-5 col-md-5 clear-filter">
              <a id="clear-all" href="#" class="pull-right">Clear All</a>
            </div>
          </div>
          <!-- Selectors -->
          <div class="row">
            <form id="system-filters" class="collapse">
              <div id="accordion" class="panel-group">
                <!-- TestingAuth -->
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <a data-toggle="collapse" href="#tAuth" aria-expanded="true"><i class="fa fa-chevron-down"></i><h4>Testing Authority</h4></a>
                  </div>
                  <div id="tAuth" class="panel-collapse collapse in">
                    <div class="panel-body">
                      <div class="radio">
                        <label>
                          <input type="radio" name="2" value="UL" checked>UL
                        </label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="2" value="intertek">Intertek
                        </label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="2" value="ULC">ULC/cUL</label>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- System Type -->
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <a data-toggle="collapse" href="#sType" aria-expanded="true"><i class="fa fa-chevron-down"></i><h4>System Type</h4></a>
                  </div>
                  <div id="sType" class="panel-collapse collapse in">
                    <div class="panel-body">
                      <div class="radio">
                        <label>
                          <input type="radio" name="3" value="Joint">Joint
                        </label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="3" value="Penetration">Penetration
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Begin auto-fill -->
                <?php foreach ($filters as $filter) {
                  $name = (string)$name;
                  $category = (string)$filter->category;
                  $group = (string)$filter->group;
                  $panelID = preg_replace('/\W/', '', strtolower($category));
                  $type = (string)$filter->type;
                  $options = $filter->options;
                ?>
                <div class="panel panel-default <?php echo $group; ?>">
                  <div class="panel-heading">
                    <a data-toggle="collapse" href="<?php echo "#".$panelID; ?>" aria-expanded="false"><i class="fa fa-chevron-down"></i><h4><?php echo $filter->category; ?></h4></a>
                  </div>
                  <div id="<?php echo $panelID; ?>" class="panel-collapse collapse">
                    <div class="panel-body">
                      <?php foreach ($options as $option) {
                        $value = $option->value;
                        $text = $option->text;
                      ?>
                      <div class="<?php echo $type; ?>">
                        <label>
                          <input id="filter-box" type="<?php echo $type; ?>" name="<?php echo $name; ?>" value="<?php echo $value; ?>"><?php echo $text; ?>
                        </label>
                      </div>
                     <?php } ?>
                    </div>
                  </div>
                </div>
                <?php $name++; } ?>

              </div>
            </form>
          </div>
        </div>
        <!-- Table -->
        <div id="designs" class="col-xs-12 col-md-8">
          <table id="systems" class="display table table-bordered dt-responsive" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th><input name="select_all" value="1" type="checkbox"></th>
                <th>Design Number</th>
                <th>Testing Authority</th>
                <th>System Type</th>
                <th>Joint Type</th>
                <th>Joint Conditions</th>
                <th>Max. Joint Width</th>
                <th>Penetration Construction</th>
                <th>Penetration Types</th>
                <th>Max. Size Penetrant</th>
                <th>Application Method</th>
                <th>Products</th>
                <th>Curtain Wall Type</th>
                <th>Movement Capabilities (%)</th>
                <th>F Rating (h)</th>
                <th>FT Rating (h)</th>
                <th>FH Rating (h)</th>
                <th>FTH Rating (h)</th>
                <th>Min. Annular Space</th>
                <th>Max. Annular Space</th>
                <th>Sleeve</th>
                <th>Insulation Type</th>
                <th>L Rating</th>
                <th>PDF Download</th>
              </tr>
            </thead>
          </table>
          <div class="row">
            <div class="col-sm-3">
              <div class="pdf-download">
                <button id="download-zip" class="btn" type="submit">Download Selected</button>

              </div>
            </div>
            <div class="col-sm-9">
              <div id="progress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript" src="//gyrocode.github.io/jquery-datatables-checkboxes/1.0.3/js/dataTables.checkboxes.min.js"></script>
<script type="text/javascript" src="bundle-min.js"></script>
<!-- <script type="text/javascript" src="scripts/system-search-min.js"></script> -->
<!-- <script type="text/javascript" src="scripts/downloader.js"></script> -->



<?php include("footer.php"); ?>