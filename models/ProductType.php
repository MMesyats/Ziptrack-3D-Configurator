<?php

class ProductType
{
    public static function getProductTypes()
    {
        $db = Db::getConnection();
        $result = $db->query("SELECT * FROM PRODUCT_TYPE");
        $types = array();
        while($row = $result->fetch())
        {
            $types[] =array(
                'id' => $row['ID'],
                'name' => $row['NAME']
            );
        }
        return $types;
    }
}