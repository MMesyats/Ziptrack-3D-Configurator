<?php

require_once(ROOT . '/models/Product.php');


class ProductController
{
    public function indexAction()
    {
        $products = Product::getProducts();

        $productsCoded = Product::getProductsCoded();
        $jsonProducts = array();
        foreach ($productsCoded as &$product) {
            $jsonProducts[$product['id']] = urlencode(json_encode($product));
        }
        include_once(ROOT . '/views/product/index.php');
        return true;
    }
}
