package com.klef.dev.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "bakery_table")
public class Bakery {

    @Id
    @Column(name = "item_id")
    private int id;

    @Column(name = "item_name", nullable = false, length = 100)
    private String itemName;

    @Column(name = "category", nullable = false, length = 50)
    private String category;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "available_quantity", nullable = false)
    private int availableQuantity;

    @Column(name = "baked_date")
    private LocalDate bakedDate;

    @Column(name = "description", length = 255)
    private String description;

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getAvailableQuantity() { return availableQuantity; }
    public void setAvailableQuantity(int availableQuantity) { this.availableQuantity = availableQuantity; }

    public LocalDate getBakedDate() { return bakedDate; }
    public void setBakedDate(LocalDate bakedDate) { this.bakedDate = bakedDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    @Override
    public String toString() {
        return "BakeryItem [id=" + id + ", itemName=" + itemName + ", category=" + category +
               ", price=" + price + ", availableQuantity=" + availableQuantity +
               ", bakedDate=" + bakedDate + ", description=" + description + "]";
    }
}