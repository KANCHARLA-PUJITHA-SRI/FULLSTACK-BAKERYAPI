package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Bakery;

public interface BakerySevice {
    
    Bakery addItem(Bakery item);

    List<Bakery> getAllItems();

    Bakery getItemById(int id);

    List<Bakery> getItemsByCategory(String category);

    Bakery updateItem(Bakery item);

    void deleteItemById(int id);
}