<?php
  include("header.html");
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
                    <a data-toggle="collapse" href="#tAuth" aria-expanded="true"><h4><i class="fa fa-chevron-down"></i><span class="type">Testing Authority</span></h4></a>
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
                <!-- System Type -->
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <a data-toggle="collapse" href="#sType" aria-expanded="false"><h4><i class="fa fa-chevron-down"></i><span class="type">System Type</span></h4></a>
                  </div>
                  <div id="sType" class="panel-collapse collapse">
                    <div class="panel-body">
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="2" value="Joint">Joint
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="2" value="Penetration">Penetration
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
                    <a data-toggle="collapse" href="<?php echo "#".$panelID; ?>" aria-expanded="false"><h4><i class="fa fa-chevron-down"></i><span class="type"><?php echo $filter->category; ?></span></h4></a>
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


                <!-- Joint Type -->
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <a data-toggle="collapse" href="#jType" aria-expanded="false"><h4><i class="fa fa-chevron-down"></i><span class="type">Joint Type</span></h4></a>
                  </div>
                  <div id="jType" class="panel-collapse collapse">
                    <div class="panel-body">
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="3" value="bottom-of-wall">Bottom-of-Wall
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="3" value="floor-to-floor">Floor-to-Floor
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="3" value="Floor-To-Wall">Floor-to-Wall
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="3" value="Head-Of-Wall">Head-of-Wall
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="3" value="wall-to-wall">Wall-to-Wall
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Joint Conditions -->
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <a data-toggle="collapse" href="#jCond" aria-expanded="false"><h4><i class="fa fa-chevron-down"></i><span class="type">Joint Conditions</span></h4></a>
                  </div>
                  <div id="jCond" class="panel-collapse collapse">
                    <div class="panel-body">
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="4" value="Concrete Floor">Concrete Floor
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="4" value="Concrete Floor to Concrete Floor">Concrete Floor to Concrete Floor
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="4" value="Concrete Floor to Concrete/Block Wall">Concrete Floor to Concrete/Block Wall
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="4" value="Concrete Stair to Concrete/Block Wall">Concrete Stair to Concrete/Block Wall
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="4" value="Concrete/Block Wall to Concrete Metal Floor Deck-Parallel">Concrete/Block Wall to Concrete Metal Floor Deck-Parallel
                        </label>
                      </div>
                     <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="4" value="Concrete/Block Wall to Concrete Metal Roof Deck-Parallel">Concrete/Block Wall to Concrete Metal Roof Deck-Parallel
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="4" value="Concrete/Block Wall to Concrete Metal Floor Deck-Perpendicular">Concrete/Block Wall to Concrete Metal Floor Deck-Perpendicular
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Max Joint Width -->
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <a data-toggle="collapse" href="#jWidth" aria-expanded="false"><h4><i class="fa fa-chevron-down"></i><span class="type">Max Joint Width</span></h4></a>
                  </div>
                  <div id="jWidth" class="panel-collapse collapse">
                    <div class="panel-body">
                      <div class="radio">
                        <label>
                          <input type="radio" name="5" value="" checked>None</label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="5" value="25">25 mm
                        </label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="5" value="50">50 mm
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Penetration Types -->
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <a data-toggle="collapse" href="#pTypes" aria-expanded="false"><h4><i class="fa fa-chevron-down"></i><span class="type">Penetration Types</span></h4></a>
                  </div>
                  <div id="pTypes" class="panel-collapse collapse">
                    <div class="panel-body">
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Steel Pipe">Steel Pipe
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Copper Pipe">Copper Pipe
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Iron Pipe">Iron Pipe
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Copper Tubing">Copper Tubing
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Plastic Pipe">Plastic Pipe
                        </label>
                      </div>
                     <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="PVC">PVC
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="CPVC">CPVC
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="ABS">ABS
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="PEPEX">PEPEX
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="NMC">NMC
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Flexible Metal Piping">Flexible Metal Piping
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Flexible Metal Piping">Flexible Metal Piping
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Glass Pipe">Glass Pipe
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Insulated Pipe">Insulated Pipe
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Strut">Strut
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Ducts">Ducts
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Conduit EMT">Conduit EMT
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Plastic Conduit">Plastic Conduit
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Cable Tray">Cable Tray
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Cables">Cables
                        </label>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input id="filter-box" type="checkbox" name="6" value="Multiple Penetrations">Multiple Penetrations
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
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
<script type="text/javascript" src="scripts/filters-min.js"></script>
<?php include("footer.php"); ?>