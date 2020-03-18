<?php

class Mechanic
{
    public static function getMechanics()
    {
        $db = Db::getConnection();
        $result = $db->query("SELECT * FROM MECHANIC ORDER BY ID");
        $mechanics = array();
        while($row = $result->fetch())
        {
            $mechanics[] =array(
                'id' => $row['ID'],
                'name' => $row['NAME']
            );
        }

        return $mechanics;
    }
    public static function getMechanicsOptions()
    {
        $db = Db::getConnection();
        $result = $db->query("SELECT * FROM M_OPTIONS ORDER BY ID");
        $mechanic_options = array();
        while($row = $result->fetch())
        {
            $mechanic_options[] =array(
                'id' => $row['ID'],
                'name' => $row['NAME'],
                'mechanic_id' => $row['MECHANIC_ID']
            );
        }
        return $mechanic_options;
    }
}