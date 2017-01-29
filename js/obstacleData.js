var obstacleData = [
    { type: 0, x: 1359.999999999999, y: 949.9999999999993 }, { type: 0, x: 1519.9999999999989, y: 689.9999999999994 }, { type: 0, x: 1709.9999999999986, y: 284.9999999999998 }, { type: 0, x: 1709.9999999999986, y: 1549.9999999999989 }, { type: 0, x: 1779.9999999999986, y: 1089.999999999999 }, { type: 0, x: 2019.9999999999986, y: 1704.9999999999986 }, { type: 0, x: 2109.9999999999986, y: 364.9999999999997 }, { type: 0, x: 2209.999999999998, y: 714.9999999999994 }, { type: 0, x: 2464.999999999998, y: 1369.9999999999989 }, { type: 0, x: 2639.999999999998, y: 1639.9999999999986 }, { type: 0, x: 2719.9999999999977, y: 1059.999999999999 }, { type: 100, x: 2739.9999999999973, y: 574.9999999999995 }, { type: 0, x: 3004.9999999999977, y: 1619.9999999999989 }, { type: 0, x: 3024.9999999999977, y: 349.9999999999997 }, { type: 100, x: 3044.9999999999977, y: 1204.999999999999 }, { type: 1, x: 3339.9999999999973, y: 1019.9999999999992 }, { type: 0, x: 3424.9999999999973, y: 1604.9999999999989 }, { type: 0, x: 3624.9999999999973, y: 629.9999999999995 }, { type: 0, x: 3934.9999999999973, y: 1219.999999999999 }, { type: 3, x: 4034.999999999997, y: 299.9999999999998 }, { type: 1, x: 4064.9999999999964, y: 1534.9999999999989 }, { type: 0, x: 4329.999999999996, y: 899.9999999999993 }, { type: 4, x: 4594.999999999996, y: 1124.999999999999 }, { type: 2, x: 4694.999999999996, y: 324.9999999999998 }, { type: 3, x: 4694.999999999996, y: 1709.9999999999986 }, { type: 4, x: 4874.999999999996, y: 649.9999999999995 }, { type: 100, x: 4949.999999999996, y: 1359.999999999999 }, { type: 5, x: 5244.999999999996, y: 369.9999999999997 }, { type: 100, x: 5344.999999999996, y: 1109.999999999999 }, { type: 0, x: 5559.999999999995, y: 1684.9999999999986 }, { type: 2, x: 5584.999999999995, y: 999.9999999999992 }, { type: 0, x: 5834.999999999995, y: 419.99999999999966 }, { type: 5, x: 6109.999999999995, y: 1324.999999999999 }, { type: 100, x: 6324.999999999995, y: 859.9999999999993 }, { type: 4, x: 6359.9999999999945, y: 309.9999999999998 }, { type: 3, x: 6524.9999999999945, y: 1649.9999999999989 }, { type: 0, x: 6559.9999999999945, y: 1039.9999999999993 }, { type: 100, x: 6804.9999999999945, y: 684.9999999999994 }, { type: 4, x: 7014.9999999999945, y: 484.99999999999966 }, { type: 100, x: 7184.9999999999945, y: 1229.999999999999 }, { type: 5, x: 7424.9999999999945, y: 1424.9999999999989 }, { type: 5, x: 7604.9999999999945, y: 484.99999999999966 }, { type: 100, x: 7789.9999999999945, y: 959.9999999999993 }, { type: 0, x: 8009.9999999999945, y: 344.9999999999997 }, { type: 0, x: 8044.999999999994, y: 1509.9999999999989 }, { type: 100, x: 8139.999999999994, y: 749.9999999999994 }, { type: 4, x: 8259.999999999993, y: 1589.9999999999989 }, { type: 4, x: 8364.999999999995, y: 1029.9999999999993 }, { type: 6, x: 8824.999999999993, y: 629.9999999999995 }, { type: 2, x: 8989.999999999993, y: 1529.9999999999989 }, { type: 5, x: 9139.999999999993, y: 989.9999999999992 }, { type: 5, x: 9214.999999999993, y: 359.9999999999997 }, { type: 3, x: 9474.999999999993, y: 1252.499999999999 }, { type: 0, x: 9499.999999999993, y: 1699.9999999999986 }, { type: 2, x: 9594.999999999993, y: 472.49999999999966 }, { type: 6, x: 9914.999999999993, y: 1609.9999999999989 }, { type: 6, x: 9929.999999999993, y: 979.9999999999993 }, { type: 0, x: 10139.999999999995, y: 1253.3333333333326 }, { type: 0, x: 10143.333333333328, y: 1313.3333333333326 }, { type: 6, x: 10219.999999999993, y: 562.4999999999995 }, { type: 0, x: 10399.999999999993, y: 979.9999999999993 }, { type: 4, x: 10519.99999999999, y: 1527.4999999999989 }, { type: 0, x: 10526.66666666666, y: 1253.3333333333326 }, { type: 0, x: 10804.99999999999, y: 359.9999999999997 }, { type: 6, x: 10809.999999999993, y: 929.9999999999993 }, { type: 0, x: 11024.999999999993, y: 659.9999999999995 }, { type: 0, x: 11059.999999999993, y: 1629.9999999999989 }, { type: 0, x: 11079.999999999993, y: 661.6666666666662 }, { type: 0, x: 11193.333333333327, y: 1283.3333333333326 }, { type: 3, x: 11219.999999999993, y: 1009.9999999999992 }, { type: 0, x: 11246.66666666666, y: 1333.3333333333328 }, { type: 0, x: 11296.666666666659, y: 1383.3333333333326 }, { type: 0, x: 11584.99999999999, y: 544.9999999999995 }, { type: 0, x: 11806.66666666666, y: 866.6666666666662 }, { type: 0, x: 11806.66666666666, y: 1083.3333333333328 }, { type: 2, x: 11914.99999999999, y: 1667.4999999999986 }, { type: 6, x: 11954.99999999999, y: 657.4999999999994 }, { type: 0, x: 12146.66666666666, y: 989.9999999999994 }, { type: 2, x: 12149.99999999999, y: 1089.999999999999 }, { type: 5, x: 12424.99999999999, y: 449.99999999999966 }, { type: 0, x: 12654.99999999999, y: 1344.999999999999 }, { type: 0, x: 12683.333333333327, y: 733.3333333333329 }, { type: 0, x: 12739.999999999995, y: 789.9999999999997 }, { type: 0, x: 12743.333333333328, y: 679.9999999999997 }, { type: 0, x: 12789.999999999993, y: 729.9999999999997 }, { type: 0, x: 12813.333333333327, y: 243.3333333333332 }, { type: 0, x: 12903.333333333327, y: 1136.666666666666 }, { type: 0, x: 12949.999999999993, y: 1186.666666666666 }, { type: 0, x: 13003.333333333325, y: 1129.9999999999993 }, { type: 0, x: 13063.333333333327, y: 1126.666666666666 }, { type: 2, x: 13189.999999999989, y: 384.9999999999997 }, { type: 4, x: 13399.999999999989, y: 1007.4999999999993 }, { type: 0, x: 13626.666666666659, y: 739.9999999999997 }, { type: 0, x: 13666.666666666659, y: 479.9999999999998 }, { type: 0, x: 13819.999999999989, y: 1564.9999999999989 }, { type: 0, x: 13839.999999999993, y: 699.9999999999997 }, { type: 0, x: 13846.666666666659, y: 506.6666666666664 }, { type: 0, x: 13863.333333333327, y: 1296.6666666666658 }, { type: 0, x: 13866.666666666659, y: 1246.666666666666 }, { type: 0, x: 13869.999999999993, y: 1346.666666666666 }, { type: 0, x: 13923.333333333325, y: 1253.3333333333328 }, { type: 0, x: 14254.999999999989, y: 499.9999999999996 }, { type: 6, x: 14299.999999999989, y: 1042.499999999999 }, { type: 3, x: 14434.999999999989, y: 1767.4999999999986 }, { type: 0, x: 14563.333333333327, y: 1333.3333333333326 }, { type: 0, x: 14586.666666666659, y: 219.9999999999999 }, { type: 0, x: 14639.999999999993, y: 269.9999999999999 }, { type: 0, x: 14696.66666666666, y: 323.33333333333314 }, { type: 4, x: 14884.999999999989, y: 662.4999999999994 }, { type: 2, x: 14909.999999999989, y: 1399.9999999999989 }, { type: 0, x: 15156.666666666659, y: 349.99999999999983 }, { type: 0, x: 15156.666666666659, y: 296.6666666666666 }, { type: 0, x: 15156.666666666659, y: 246.66666666666657 }, { type: 3, x: 15289.999999999993, y: 1016.6666666666665 }, { type: 0, x: 15396.666666666659, y: 1239.9999999999993 }, { type: 0, x: 15439.999999999989, y: 1519.9999999999989 }, { type: 5, x: 15554.999999999989, y: 709.9999999999994 }, { type: 0, x: 15789.999999999993, y: 266.6666666666665 }, { type: 0, x: 15899.999999999993, y: 1399.9999999999993 }, { type: 0, x: 16056.666666666659, y: 579.9999999999997 }, { type: 0, x: 16139.99999999999, y: 1159.9999999999993 }, { type: 4, x: 16464.99999999999, y: 1517.4999999999989 }, { type: 2, x: 16544.999999999985, y: 332.4999999999997 }, { type: 5, x: 16629.99999999999, y: 1029.9999999999993 }, { type: 0, x: 16916.666666666657, y: 646.6666666666663 }, { type: 0, x: 16916.666666666657, y: 713.3333333333329 }, { type: 0, x: 16963.333333333325, y: 713.3333333333329 }, { type: 0, x: 16969.999999999993, y: 646.6666666666663 }, { type: 0, x: 17026.666666666657, y: 1279.9999999999993 }, { type: 0, x: 17076.666666666657, y: 1336.666666666666 }, { type: 0, x: 17129.999999999993, y: 1233.3333333333328 }, { type: 0, x: 17324.999999999985, y: 1569.9999999999989 }, { type: 3, x: 17384.999999999985, y: 352.4999999999998 }, { type: 0, x: 17544.999999999985, y: 1039.9999999999993 }, { type: 0, x: 17546.666666666657, y: 1093.3333333333328 }, { type: 0, x: 17546.66666666666, y: 896.6666666666662 }, { type: 0, x: 17549.999999999993, y: 1149.9999999999993 }, { type: 6, x: 17829.999999999985, y: 1567.4999999999989 }, { type: 0, x: 18044.999999999985, y: 559.9999999999995 }, { type: 0, x: 18084.999999999985, y: 1547.4999999999989 }, { type: 6, x: 18249.999999999985, y: 912.4999999999993 }, { type: 0, x: 18329.99999999999, y: 253.3333333333332 }, { type: 0, x: 18329.999999999993, y: 189.99999999999991 }, { type: 0, x: 18369.999999999993, y: 426.66666666666646 }, { type: 0, x: 18459.999999999993, y: 426.66666666666646 }, { type: 5, x: 18829.999999999985, y: 1379.9999999999989 }, { type: 4, x: 18889.999999999985, y: 387.49999999999966 }, { type: 0, x: 19204.999999999985, y: 622.4999999999995 }, { type: 4, x: 19593.333333333318, y: 1299.9999999999993 }, { type: 4, x: 19593.33333333332, y: 756.6666666666663 }, { type: 4, x: 19593.33333333332, y: 539.9999999999998 }, { type: 4, x: 19593.33333333332, y: 326.6666666666665 }, { type: 4, x: 19596.666666666653, y: 1089.9999999999995 }, { type: 4, x: 19596.666666666653, y: 143.33333333333326 }, { type: 0, x: 19599.999999999985, y: 1519.9999999999989 }, { type: 0, x: 19599.999999999985, y: 1704.9999999999986 }
];
