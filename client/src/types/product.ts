export interface Product {
    product_id: number;
    supplier_id: number;
    category_id: number;
    quantity_per_unit: number;
    unit_price: number;
    units_in_stock: number;
    units_on_order: number;
    reorder_level: number;
    discontinued: number;
    product_title: string;
    product_description: string;
    amount?: number;
}
