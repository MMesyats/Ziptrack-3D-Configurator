<?php
header('Cache-Control : no-cache, no-store, must-revalidate');
header('Expires : -1');
header('Pragma : no-cache');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="expires" content="Fri,31 Dec 2010 11:59:59 GMT" />
    <meta http-equiv="cache-control" content="no-cache">
    <link rel="stylesheet" href="/template/css/main.css">
    <title>Document</title>
</head>

<body>
    <table>
        <thead>
            <th>ID</th>
            <th>Product Type</th>
            <th>Size(WxH)</th>
            <th>Pelmet</th>
            <th>Frame Color</th>
            <th>Spline Color</th>
            <th>Material</th>
            <th>Bottom weather strip</th>
            <th>Mechanic</th>
            <th>Mounting</th>
            <th>Quantity</th>
            <th>Notes</th>
        </thead>
        <tbody>
            <?php foreach ($products as &$product) : ?>
                <tr>
                    <td><a href="<?php echo FRONT_URL . '?data=' . $jsonProducts[$product['id']] ?>"><?php echo $product['id'] ?></a></td>
                    <td><?php echo $product['PRODUCT_TYPE'] ?></td>
                    <td><?php echo $product['WIDTH'] . 'x' . $product['HEIGHT'] ?></td>
                    <td><?php echo $product['PELMET'] ?></td>
                    <td><?php echo $product['FRAME_COLOR'] ? $product['FRAME_COLOR'] : 'Other' ?>
                    </td>
                    <td>
                        <?php echo $product['SPLINE_COLOR'] ?>
                    </td>
                    <td><?php echo $product['MATERIAL'] ?></td>
                    <td><?php echo $product['BOTTOM_WEATHER_STRIP'] ?> mm</td>
                    <td><?php echo $product['MECHANIC'] . ' ' . $product['MECHANIC_OPTION'] ?></td>
                    <td><?php echo $product['MOUNTING'] ?></td>
                    <td><?php echo $product['QUANTITY'] ?></td>
                    <td>
                        <div class="notes"><?php echo $product['NOTES'] ?></div>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>

</html>