<?php

require_once(ROOT . '/models/Colors.php');

class Product
{
    public static function getProducts(): array
    {
        $db = Db::getConnection();
        $result = $db->query(
            "
        SELECT p.id , pt.NAME as PRODUCT_TYPE , p.WIDTH , p.HEIGHT , pel.NAME as PELMET , c1.NAME as FRAME_COLOR ,c1.HEX_VALUE as FRAME_COLOR_HEX_1 , FRAME_COLOR_HEX , c2.NAME as SPLINE_COLOR ,c2.HEX_VALUE as SPLINE_COLOR_HEX , mat.MATERIAL_NAME as MATERIAL , bws.VALUE as BOTTOM_WEATHER_STRIP ,mec.NAME as MECHANIC, mo.NAME as MECHANIC_OPTION , mou.NAME as MOUNTING , p.QUANTITY , p.NOTES 
        FROM PRODUCTS p
        LEFT JOIN PRODUCT_TYPE pt ON p.PRODUCT_TYPE  =  pt.ID 
        LEFT JOIN PELMETS pel on p.PELMET  =  pel.ID 
        LEFT JOIN COLORS c1 on p.FRAME_COLOR = c1.ID
        LEFT JOIN COLORS c2 on p.SPLINE_COLOR  = c2.ID 
        LEFT JOIN MATERIALS mat on p.MATERIAL  = mat.ID 
        LEFT JOIN B_WEATHER_STRIP bws on p.BOTTOM_WEATHER_STRIP =  bws.ID 
        LEFT JOIN MECHANIC  mec on p.MECHANIC  = mec.ID 
        LEFT JOIN M_OPTIONS mo on p.M_OPTION = mo.ID 
        LEFT JOIN  MOUNTING mou on mou.ID = p.MOUNTING ORDER BY p.id ASC"
        );
        $products = $result->fetchAll();

        return $products;
    }

    public static function getProductsCoded(): array
    {
        $db = Db::getConnection();
        $result = $db->query("
        SELECT 
            p.ID , p.PRODUCT_TYPE , p.WIDTH ,p.HEIGHT ,p.PELMET , if(p.FRAME_COLOR_HEX is null, c1.HEX_VALUE, p.FRAME_COLOR_HEX ) as FRAME_COLOR , c2.HEX_VALUE as SPLINE_COLOR ,
            p.MATERIAL , p.BOTTOM_WEATHER_STRIP , p.MECHANIC ,p.MECHANIC , p.MOUNTING , p.QUANTITY , 
            p.NOTES 
        FROM 
            PRODUCTS p 
        LEFT JOIN 
            COLORS c1 on p.FRAME_COLOR = c1.id  
        LEFT JOIN 
            COLORS c2 on p.SPLINE_COLOR  = c2.id
        ");
        $products = array();
        while ($row = $result->fetch()) {
            $products[] = array_change_key_case($row, CASE_LOWER);
        }
        return $products;
    }

    public static function addProduct(
        int $product_type,
        float $width,
        float $height,
        int $pelmet,
        string $frame_color,
        string $spline_color,
        int $bws,
        int $material,
        int $mechanic,
        int $mechanic_option,
        int $mounting,
        int $quantity,
        string $notes = ""
    ): int {
        $colors = Colors::getColors();

        foreach ($colors as $color) {
            if ($frame_color == $color['hex']) $frame_value = $color['id'];
            if ($spline_color == $color['hex']) $spline_value = $color['id'];
        }
        $row = array(
            'product_type' => $product_type,
            'width' => $width,
            'height' => $height,
            'pelmet' => $pelmet,
            'frame_value' => $frame_value,
            'spline_value' => $spline_value,
            'material' => $material,
            'bws' => $bws,
            'mechanic' => $mechanic,
            'mounting' => $mounting,
            'quantity' => $quantity,
            'notes' => $notes,
            'mechanic_option' => $mechanic_option
        );
        $db = Db::getConnection();
        $stmt = $db->prepare('
        INSERT INTO 
            PRODUCTS 
            (PRODUCT_TYPE, WIDTH, HEIGHT, PELMET, FRAME_COLOR, SPLINE_COLOR, MATERIAL, BOTTOM_WEATHER_STRIP, MECHANIC, MOUNTING, QUANTITY, NOTES, M_OPTION)
        VALUES 
            (:product_type, :width, :height, :pelmet, :frame_value, :spline_value, :material, :bws, :mechanic, :mounting, :quantity, :notes, :mechanic_option)');
        try {
            if (!$stmt->execute($row))
                error_log(print_r($stmt->errorInfo(), true));
        } catch (Exception $e) {
            $db->rollback();
            throw $e;
            return false;
        }
        return true;
    }

    public static function updateProduct(
        int $product_type,
        float $width,
        float $height,
        int $pelmet,
        string $frame_color,
        string $spline_color,
        int $bws,
        int $material,
        int $mechanic,
        int $mechanic_option,
        int $mounting,
        int $quantity,
        string $notes = "",
        int $id
    ): int {
        $colors = Colors::getColors();

        foreach ($colors as $color) {
            if ($frame_color == $color['hex']) $frame_value = $color['id'];
            if ($spline_color == $color['hex']) $spline_value = $color['id'];
        }
        $row = array(
            'id' => $id,
            'product_type' => $product_type,
            'width' => $width,
            'height' => $height,
            'pelmet' => $pelmet,
            'frame_value' => $frame_value,
            'spline_value' => $spline_value,
            'material' => $material,
            'bws' => $bws,
            'mechanic' => $mechanic,
            'mounting' => $mounting,
            'quantity' => $quantity,
            'notes' => $notes,
            'mechanic_option' => $mechanic_option
        );
        $db = Db::getConnection();
        $stmt = $db->prepare('
        UPDATE 
            PRODUCTS 
        SET 
            PRODUCT_TYPE=:product_type,
            WIDTH=:width, 
            HEIGHT=:height, 
            PELMET=:pelmet, 
            FRAME_COLOR=:frame_value, 
            SPLINE_COLOR=:spline_value, 
            MATERIAL=:material, 
            BOTTOM_WEATHER_STRIP=:bws, 
            MECHANIC=:mechanic, 
            MOUNTING=:mounting, 
            QUANTITY=:quantity,
            NOTES=:notes, 
            M_OPTION=:mechanic_option
        WHERE 
            ID=:id');
        try {
            if (!$stmt->execute($row))
                error_log(print_r($stmt->errorInfo(), true));
        } catch (Exception $e) {
            $db->rollback();
            throw $e;
            return false;
        }
        return true;
    }
}
