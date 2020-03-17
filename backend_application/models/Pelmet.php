<?php

class Pelmet 
{
    public static function getPelmets()
    {
        $db = Db::getConnection();
        $result = $db->query('SELECT * FROM PELMETS order by ID');
        $pelmets = array();
        while($row = $result->fetch())
        {
            $pelmets[] =array(
                'id' => $row['ID'],
                'name' => $row['NAME']
            );
        }
        return $pelmets;
    }

}