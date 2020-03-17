<?php

class Material
{
    public static function getMaterials()
    {
        $db = Db::getConnection();
        $result = $db->query("SELECT * FROM MATERIALS ORDER BY ID");
        $materials = array();
        while($row = $result->fetch())
        {
            $materials[] = array(
                'id' => $row['ID'],
                'name' => $row['MATERIAL_NAME']
            );
        }
        return $materials;
    }
}