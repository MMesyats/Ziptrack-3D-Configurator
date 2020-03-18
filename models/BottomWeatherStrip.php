<?php

class BottomWeatherStrip
{
    public static function getStrips(): array
    {
        $db = Db::getConnection();
        $result = $db->query("SELECT * FROM  B_WEATHER_STRIP ORDER BY ID");
        $bws = array();
        while ($row = $result->fetch()) {
            $bws[] = array(
                'id' => $row['ID'],
                'value' => $row['VALUE'] . " mm",
            );
        }
        return $bws;
    }
}
