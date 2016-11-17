<?php
  require ("header.php");
  $json_file = file_get_contents('json/filters.json');
  $jfo = json_decode($json_file);
  $filters = $jfo->filters;
?>

<!-- <script type="text/javascript" src="scripts/range-filter.js"></script> -->
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
          <!-- Selectors -->
          <div class="row">
            <form id="system-filters">
              <div id="accordion" class="panel-group">
                <!-- TestingAuth -->
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <a data-toggle="collapse" href="#tAuth" aria-expanded="true"><i class="fa fa-chevron-down"></i><span class="type">Testing Authority</span></a>
                  </div>
                  <div id="tAuth" class="panel-collapse collapse in">
                    <div class="panel-body">
                      <div class="radio">
                        <label>
                          <input type="radio" name="1" id="r-filter1" value="ULC" checked>ULC/cUL</label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="1" id="r-filter2" value="UL">UL
                        </label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="1" id="r-filter3" value="Intertek">Intertek
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Begin auto-fill -->
                <?php foreach ($filters as $filter) {
                  $name = $filter->name;
                  $category = (string)$filter->category;
                  $panelID = preg_replace('/\W/', '', strtolower($category));
                  $options = $filter->options;
                ?>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <a data-toggle="collapse" href="<?php echo "#".$panelID; ?>" aria-expanded="false"><i class="fa fa-chevron-down"></i><span class="type"><?php echo $filter->category; ?></span></a>
                  </div>
                  <div id="<?php echo $panelID; ?>" class="panel-collapse collapse">
                    <div class="panel-body">
                      <?php foreach ($options as $option) {
                        $value = $option->value;
                        $text = $option->text;
                      ?>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="<?php echo $name; ?>" value="<?php echo $value; ?>"><?php echo $text; ?>
                        </label>
                      </div>
                     <?php } ?>
                    </div>
                  </div>
                </div>
                <?php } ?>

              </div>
            </form>
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
                  <th>Penetration Construction</th>
                  <th>Penetration Types</th>
                  <th>Max Size Penetrant (mm)</th>
                  <th>Application Method</th>
                  <th>Movement Capabilities (%)</th>
                  <th>F Rating (h)</th>
                  <th>FT Rating (h)</th>
                  <th>FH Rating (h)</th>
                  <th>FTH Rating (h)</th>
                  <th>Minimum Annular Space</th>
                  <th>Maximum Annular Space</th>
                  <th>Sleeve</th>
                  <th>Insulation Type</th>
                  <th>L Rating</th>
                  <th>Mold &amp; Mildew Resistance</th>
                  <th>Seismic Performance</th>
                  <th>Water Rating</th>
                  <th>STC Rating</th>
                  <th>Trade</th>
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

<script type="text/javascript" src="scripts/system-search-min.js"></script>
<?php include("footer.php"); ?>