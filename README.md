# munch
eat time

## Interaction Specs

QR Code Contents: `<menu-id>`

### User ←—→ Server

`GET /menu/<menu-id>`: Gets the menu

Returns JSON for menu

```json
{ 
    "restaurant-id": 123456,
    "sections": [
        {
            "section-name": "bbq",
            "foods": [
                {
                    "item-id": 654321,
                    "name": "Burger",
                    "price": 6.99,
                    "ingredients": [
                        "the hopes and dreams of a billion young asian children trying to get into harvard", "wheat"
                    ],
                    "description": "borger",
                    "image": "..."
                },
            ]
        }
    ]
}

```

`POST /order`: Places an order

```json
{
    "customer-id": 69,
    "restaurant-id": 123456,
    "table-id": 2,
    "order": [
        {
        "item-id": 654321
        }
    ]
}
```

 * Send JSON for order
 * Format: TBD
 * Receive JSON for order confirmation
 * Format: TBD

### Restaurant ←—→ Server

#### Menu Format

#ML buzzword stuff
ML will have 2 customer preferences.
Customer 1 will be pretrained to buy cheap stuff.
Customer 2 will be pretrained to buy vegetarian stuff.
