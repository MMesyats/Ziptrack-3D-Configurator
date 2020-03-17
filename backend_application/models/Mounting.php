<?php

class Mounting
{
    public static function getMountings()
    {
        $db = Db::getConnection();
        $result = $db->query('SELECT * FROM MOUNTING order by ID');
        $mountings = array();
        while($row = $result->fetch())
        {
            $mountings[] =array(
                'id' => $row['ID'],
                'name' => $row['NAME']
            );
        }
        return $mountings;
    }
}