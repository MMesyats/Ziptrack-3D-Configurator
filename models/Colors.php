<?php

class Colors
{
    public static function getColors()
    {
        $db = Db::getConnection();
        $result = $db->query("SELECT * FROM COLORS ORDER BY ID");
        $colors = array();
        while ($row = $result->fetch()) {
            $colors[] = array(
                'id' => $row['ID'],
                'name' => $row['NAME'],
                'hex' => '#' . $row['HEX_VALUE']
            );
        }
        return $colors;
    }
}
