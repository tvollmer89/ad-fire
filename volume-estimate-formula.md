#Get the following input values from user:

  * Minimum Mills(mileage)
  * Efficiency % (efficiency)
  * Diameter (d)
  * Diameter Units (dUnits)
  * Total Length (l)
  * Length Units (lUnits)

#Convert diameter and length if necessary


*If user selects 'cm' as the diameter units, convert to inces by multiplying by 0.39370*

```javascript
  d = dUnits == 'cm' ? (d * 0.39370) : d;
```

*Convert length to miles if necessary*
```javascript
  var length;
  if (lUnits == 'km') {
    length = l * 0.62140;
  } else if (lUnits == 'ft') {
    length = l * 0.00018939;
  } else if (lUnits == 'm') {
    length = l * 0.00062137;
  } else {
    length = l;
  }
  ```

#Form should return 5 values to the user, each is displayed in both US and metric units:

  * Theoretical Coverage
  * Actual Coverage
  * Surface Area
  * Total Surface Area
  * Volume Needs

##Theoretical Coverage
```javascript
  theory = 1604/(mileage + 5);
  theoryMetric = theory * 0.02454; // US to metric ratio
```

##Actual Coverage
```javascript
  actual = (efficiency * theory)/100;
  actualMetric = actual * 0.02454;
```

##Surface Area
```javascript
  surfaceArea = diameter/12*3.14;
  surfaceAreaMetric = surfaceArea * 0.09290;
```

##Total Surface Area
*Round results to the nearest 100*
```javascript
  totalSA = Math.round((length*5280*surfaceArea)/100)*100;
  totalSAMetric = Math.round((totalSA * 0.09290)/100)*100;
```

##Volume Needs
```javascript
    volume = totalSA/actual;
    volumeMetric = volume*3.785;
```

*Aside from Total Surface area, keep all results to 2 decimal places*