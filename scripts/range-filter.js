jQuery.fn.dataTableExt.afnFiltering.push(
    function( oSettings, aData, iDataIndex ) {
        var iColumn = this.name;
        var iMin = 0;
        var iMax = $('input[id="range"]:selected').map(function() {
            return this.value;
        });

        var iVersion = aData[iColumn] == "-" ? 0 : aData[iColumn]*1;
        if ( iMin === "" && iMax === "" )
        {
            return true;
        }
        else if ( iMin === "" && iVersion < iMax )
        {
            return true;
        }
        else if ( iMin < iVersion && "" === iMax )
        {
            return true;
        }
        else if ( iMin < iVersion && iVersion < iMax )
        {
            return true;
        }
        return false;
    }
);