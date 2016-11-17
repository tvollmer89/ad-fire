$(document).ready(function() {
  var treeData = [
    {title: "item1 with key and tooltip", tooltip: "Look, a tool tip!" },
    {title: "item2: selected on init", selected: true },
    {title: "Folder", folder: true, key: "id3",
      children: [
        {title: "Sub-item 3.1",
          children: [
            {title: "Sub-item 3.1.1", key: "id3.1.1" },
            {title: "Sub-item 3.1.2", key: "id3.1.2" }
          ]
        },
        {title: "Sub-item 3.2",
          children: [
            {title: "Sub-item 3.2.1", key: "id3.2.1" },
            {title: "Sub-item 3.2.2", key: "id3.2.2" }
          ]
        }
      ]
    },
    {title: "Document with some children (expanded on init)", key: "id4", expanded: true,
      children: [
        {title: "Sub-item 4.1 (active on init)", active: true,
          children: [
            {title: "Sub-item 4.1.1", key: "id4.1.1" },
            {title: "Sub-item 4.1.2", key: "id4.1.2" }
          ]
        },
        {title: "Sub-item 4.2 (selected on init)", selected: true,
          children: [
            {title: "Sub-item 4.2.1", key: "id4.2.1" },
            {title: "Sub-item 4.2.2", key: "id4.2.2" }
          ]
        },
        {title: "Sub-item 4.3 (hideCheckbox)", hideCheckbox: true },
        {title: "Sub-item 4.4 (unselectable)", unselectable: true }
      ]
    },
    {title: "Lazy folder", folder: true, lazy: true }
  ];
    $("#tree").fancytree({
      checkbox: true,
      selectMode: 1,
      source: treeData,
      activate: function(event, data) {
        $("#echoActive1").text(data.node.title);
      },
      select: function(event, data) {
        // Display list of selected nodes
        var s = data.tree.getSelectedNodes().join(", ");
        $("#echoSelection1").text(s);
      },
      dblclick: function(event, data) {
        data.node.toggleSelected();
      },
      keydown: function(event, data) {
        if( event.which === 32 ) {
          data.node.toggleSelected();
          return false;
        }
      }

});